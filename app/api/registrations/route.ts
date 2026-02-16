// API Route for creating registrations
import { NextRequest, NextResponse } from "next/server";
import { UserDB, RegistrationDB } from "@/lib/db";
import { auth } from "firebase-admin";
import { initializeApp, getApps, cert } from "firebase-admin/app";

// Type for database registration record
interface DBRegistration {
  id: number;
  user_id: number;
  uid: string;
  name: string;
  email: string;
  phone: string;
  institution: string;
  department: string;
  year: string;
  registration_type: string;
  additional_info: string | null;
  status: string;
  created_at: Date;
  updated_at: Date;
}

// Initialize Firebase Admin SDK
if (!getApps().length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    console.warn("⚠️  Firebase Admin SDK credentials not configured");
    console.warn(
      "API routes will return 503 until credentials are added to .env.local",
    );
  } else {
    try {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      console.log("✓ Firebase Admin SDK initialized");
    } catch (error) {
      console.error("❌ Failed to initialize Firebase Admin SDK:", error);
    }
  }
}

// Verify Firebase ID token
async function verifyToken(request: NextRequest) {
  // Check if Firebase Admin is initialized
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

// POST /api/registrations - Create a new registration
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
    const email = decodedToken.email || "";
    const displayName = decodedToken.name || "";

    // Parse request body
    const body = await request.json();
    const {
      name,
      email: registrationEmail,
      phone,
      institution,
      department,
      year,
      registrationType,
      additionalInfo,
    } = body;

    // Validate required fields
    if (
      !name ||
      !registrationEmail ||
      !phone ||
      !institution ||
      !department ||
      !year ||
      !registrationType
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate registration type
    const validTypes = ["fellowship", "hackathon", "cfp", "cft", "art"];
    if (!validTypes.includes(registrationType)) {
      return NextResponse.json(
        { success: false, error: "Invalid registration type" },
        { status: 400 },
      );
    }

    // Upsert user in database
    await UserDB.upsert({
      uid,
      email,
      displayName,
      photoURL: decodedToken.picture,
    });

    // Check if user already has a registration of this type
    const existingRegistration = await RegistrationDB.findByUidAndType(
      uid,
      registrationType,
    );
    if (existingRegistration) {
      return NextResponse.json(
        {
          success: false,
          error: `You already have a ${registrationType} registration`,
        },
        { status: 409 },
      );
    }

    // Create registration
    const registration = await RegistrationDB.create({
      uid,
      name,
      email: registrationEmail,
      phone,
      institution,
      department,
      year,
      registrationType,
      additionalInfo,
    });

    console.log(
      `✓ Registration created: ${registration.id} for user ${uid} (${registrationType})`,
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          id: registration.id,
          userId: registration.user_id,
          uid: registration.uid,
          name: registration.name,
          email: registration.email,
          phone: registration.phone,
          institution: registration.institution,
          department: registration.department,
          year: registration.year,
          registrationType: registration.registration_type,
          additionalInfo: registration.additional_info,
          status: registration.status,
          createdAt: registration.created_at,
          updatedAt: registration.updated_at,
        },
        message: "Registration created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating registration:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}

// GET /api/registrations - Get all registrations for current user
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

    // Get all registrations for this user
    const registrations = await RegistrationDB.findByUidAndType(uid);

    return NextResponse.json({
      success: true,
      data: registrations.map((reg: DBRegistration) => ({
        id: reg.id,
        userId: reg.user_id,
        uid: reg.uid,
        name: reg.name,
        email: reg.email,
        phone: reg.phone,
        institution: reg.institution,
        department: reg.department,
        year: reg.year,
        registrationType: reg.registration_type,
        additionalInfo: reg.additional_info,
        status: reg.status,
        createdAt: reg.created_at,
        updatedAt: reg.updated_at,
      })),
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
