// API Route for paper submissions
import { NextRequest, NextResponse } from "next/server";
import { PaperSubmissionDB, UserDB } from "@/lib/db";
import { auth } from "firebase-admin";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

// Initialize Firebase Admin SDK
if (!getApps().length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

  if (!projectId || !clientEmail || !privateKey) {
    console.warn("⚠️  Firebase Admin SDK credentials not configured");
  } else {
    try {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        storageBucket,
      });
      console.log("✓ Firebase Admin SDK initialized for paper submissions");
    } catch (error) {
      console.error("❌ Failed to initialize Firebase Admin SDK:", error);
    }
  }
}

// Verify Firebase ID token
async function verifyToken(request: NextRequest) {
  if (!getApps().length) {
    console.error("Firebase Admin SDK not initialized");
    return null;
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}

// Generate unique paper ID
function generatePaperId(trackType: string): string {
  const prefix = trackType.toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// POST /api/papers - Submit a new paper
export async function POST(request: NextRequest) {
  try {
    // Check if Firebase Admin is configured
    if (!getApps().length || !process.env.FIREBASE_PROJECT_ID) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Service not configured. Please add Firebase Admin SDK credentials to .env.local",
        },
        { status: 503 },
      );
    }

    // Verify authentication
    const decodedToken = await verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const uid = decodedToken.uid;

    // Parse multipart form data
    const formData = await request.formData();

    // Extract form fields
    const authorName = formData.get("authorName") as string;
    const authorEmail = formData.get("authorEmail") as string;
    const authorPhone = formData.get("authorPhone") as string;
    const authorInstitution = formData.get("authorInstitution") as string;
    const authorDepartment = formData.get("authorDepartment") as string;
    const coAuthorsJson = formData.get("coAuthors") as string;
    const paperTitle = formData.get("paperTitle") as string;
    const paperAbstract = formData.get("paperAbstract") as string;
    const keywords = formData.get("keywords") as string;
    const paperType = formData.get("paperType") as string;
    const trackType = formData.get("trackType") as string;
    const registrationId = formData.get("registrationId") as string;
    const file = formData.get("file") as File;

    // Validate required fields
    if (
      !authorName ||
      !authorEmail ||
      !authorPhone ||
      !authorInstitution ||
      !authorDepartment ||
      !paperTitle ||
      !paperAbstract ||
      !trackType ||
      !file
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate file type (PDF only)
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, error: "Only PDF files are allowed" },
        { status: 400 },
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: "File size must be less than 10MB" },
        { status: 400 },
      );
    }

    // Validate track type
    const validTracks = ["cfp", "art", "cft"];
    if (!validTracks.includes(trackType)) {
      return NextResponse.json(
        { success: false, error: "Invalid track type" },
        { status: 400 },
      );
    }

    // Parse co-authors if provided
    let coAuthors = null;
    if (coAuthorsJson) {
      try {
        coAuthors = JSON.parse(coAuthorsJson);
      } catch {
        return NextResponse.json(
          { success: false, error: "Invalid co-authors format" },
          { status: 400 },
        );
      }
    }

    // Generate unique paper ID
    const paperId = generatePaperId(trackType);

    // Upload file to Firebase Storage
    const bucket = getStorage().bucket();
    const fileName = `${paperId}_${file.name}`;
    const firebasePath = `papers/${trackType}/${uid}/${fileName}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const fileRef = bucket.file(firebasePath);
    await fileRef.save(fileBuffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          paperId,
          uid,
          trackType,
          uploadedBy: authorEmail,
          uploadedAt: new Date().toISOString(),
        },
      },
    });

    // Make file publicly accessible (or use signed URLs)
    await fileRef.makePublic();
    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${firebasePath}`;

    // Upsert user in database
    await UserDB.upsert({
      uid,
      email: decodedToken.email || authorEmail,
      displayName: decodedToken.name || authorName,
      photoURL: decodedToken.picture,
    });

    // Create paper submission record
    const submission = await PaperSubmissionDB.create({
      paperId,
      registrationId: registrationId ? parseInt(registrationId) : undefined,
      uid,
      authorName,
      authorEmail,
      authorPhone,
      authorInstitution,
      authorDepartment,
      coAuthors,
      paperTitle,
      paperAbstract,
      keywords,
      paperType,
      trackType,
      fileUrl,
      firebasePath,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
    });

    // If registration ID is provided, link the paper to the registration
    if (registrationId) {
      await PaperSubmissionDB.linkPaperToRegistration(
        parseInt(registrationId),
        paperId,
        "pending",
      );
    }

    console.log(`✓ Paper submitted: ${paperId} by user ${uid}`);

    return NextResponse.json(
      {
        success: true,
        data: {
          id: submission.id,
          paperId: submission.paper_id,
          authorName: submission.author_name,
          authorEmail: submission.author_email,
          paperTitle: submission.paper_title,
          trackType: submission.track_type,
          status: submission.status,
          fileUrl: submission.file_url,
          submittedAt: submission.submitted_at,
        },
        message: "Paper submitted successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error submitting paper:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}

// GET /api/papers - Get all paper submissions for current user
export async function GET(request: NextRequest) {
  try {
    // Check if Firebase Admin is configured
    if (!getApps().length || !process.env.FIREBASE_PROJECT_ID) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Service not configured. Please add Firebase Admin SDK credentials to .env.local",
        },
        { status: 503 },
      );
    }

    // Verify authentication
    const decodedToken = await verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const uid = decodedToken.uid;

    // Get all paper submissions for this user
    const submissions = await PaperSubmissionDB.findByUid(uid);

    return NextResponse.json({
      success: true,
      data: submissions.map((sub: Record<string, unknown>) => ({
        id: sub.id,
        paperId: sub.paper_id,
        authorName: sub.author_name,
        authorEmail: sub.author_email,
        authorPhone: sub.author_phone,
        authorInstitution: sub.author_institution,
        authorDepartment: sub.author_department,
        coAuthors: sub.co_authors,
        paperTitle: sub.paper_title,
        paperAbstract: sub.paper_abstract,
        keywords: sub.keywords,
        paperType: sub.paper_type,
        trackType: sub.track_type,
        fileUrl: sub.file_url,
        fileName: sub.file_name,
        fileSize: sub.file_size,
        status: sub.status,
        reviewerComments: sub.reviewer_comments,
        submittedAt: sub.submitted_at,
        reviewedAt: sub.reviewed_at,
      })),
    });
  } catch (error) {
    console.error("Error fetching paper submissions:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
