import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import app from "./firebase";

export const db = getFirestore(app);

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  provider?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
  lastLogin?: unknown;
}

export interface Registration {
  id?: string;
  uid: string;
  name: string;
  email: string;
  phone: string;
  institution: string;
  department: string;
  year: string;
  registrationType: "fellowship" | "hackathon" | "cfp" | "cft" | "art";
  additionalInfo?: string;
  city?: string;
  state?: string;
  status?: "pending" | "approved" | "rejected";
  paperId?: string;
  paperStatus?: "pending" | "approved" | "rejected";
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface CoAuthor {
  name: string;
  email: string;
  institution: string;
}

export interface PaperSubmission {
  id?: string;
  paperId: string;
  uid: string;
  registrationId?: string;

  authorName: string;
  authorEmail: string;
  authorPhone: string;
  authorInstitution: string;
  authorDepartment: string;
  coAuthors?: CoAuthor[];

  paperTitle: string;
  paperAbstract: string;
  keywords?: string;
  paperType?: "full" | "poster" | "extended_abstract";
  trackType: "cfp" | "art" | "cft";

  // File info
  fileUrl: string;
  firebasePath: string;
  fileName: string;
  fileSize?: number;
  mimeType?: string;

  // Status
  status?:
    | "pending"
    | "under_review"
    | "approved"
    | "rejected"
    | "revision_required";
  reviewerComments?: string;
  adminNotes?: string;

  // Timestamps
  submittedAt?: unknown;
  reviewedAt?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export const UserDB = {
  async upsert(userData: Omit<User, "createdAt" | "updatedAt" | "lastLogin">) {
    const userRef = doc(db, "users", userData.uid);
    const userDoc = await getDoc(userRef);

    const data: Record<string, unknown> = {
      ...userData,
      lastLogin: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    if (!userDoc.exists()) {
      data.createdAt = serverTimestamp();
    }

    await setDoc(userRef, data, { merge: true });
    return { ...data, id: userData.uid };
  },

  async findByUid(uid: string) {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) return null;
    return { id: userDoc.id, ...userDoc.data() } as unknown as User;
  },

  async findByEmail(email: string) {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as unknown as User;
  },
};

export const RegistrationDB = {
  async create(
    registrationData: Omit<
      Registration,
      "id" | "createdAt" | "updatedAt" | "status"
    >,
  ) {
    const registrationRef = doc(collection(db, "registrations"));

    const data = {
      ...registrationData,
      status: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(registrationRef, data);
    return { id: registrationRef.id, ...data };
  },

  async findByUidAndType(uid: string, registrationType?: string) {
    let q;

    if (registrationType) {
      q = query(
        collection(db, "registrations"),
        where("uid", "==", uid),
        where("registrationType", "==", registrationType),
      );
    } else {
      q = query(collection(db, "registrations"), where("uid", "==", uid));
    }

    const querySnapshot = await getDocs(q);

    if (registrationType) {
      if (querySnapshot.empty) return null;
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Registration;
    }

    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Registration,
    );
  },

  async findById(id: string) {
    const registrationRef = doc(db, "registrations", id);
    const registrationDoc = await getDoc(registrationRef);

    if (!registrationDoc.exists()) return null;
    return {
      id: registrationDoc.id,
      ...registrationDoc.data(),
    } as Registration;
  },

  async update(id: string, uid: string, updateData: Partial<Registration>) {
    const registrationRef = doc(db, "registrations", id);
    const registrationDoc = await getDoc(registrationRef);

    if (!registrationDoc.exists()) return null;

    const existing = registrationDoc.data() as Registration;
    if (existing.uid !== uid) return null;

    const data = {
      ...updateData,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(registrationRef, data);
    return { id, ...existing, ...data };
  },

  async delete(id: string, uid: string) {
    const registrationRef = doc(db, "registrations", id);
    const registrationDoc = await getDoc(registrationRef);

    if (!registrationDoc.exists()) return null;

    const existing = registrationDoc.data() as Registration;
    if (existing.uid !== uid) return null;

    await deleteDoc(registrationRef);
    return { id, ...existing };
  },

  async getAll(filters?: { registrationType?: string; status?: string }) {
    let q = query(collection(db, "registrations"));

    if (filters?.registrationType) {
      q = query(q, where("registrationType", "==", filters.registrationType));
    }

    if (filters?.status) {
      q = query(q, where("status", "==", filters.status));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Registration,
    );
  },
};

export const PaperSubmissionDB = {
  async create(
    submissionData: Omit<
      PaperSubmission,
      "id" | "createdAt" | "updatedAt" | "status" | "submittedAt"
    >,
  ) {
    const paperRef = doc(collection(db, "papers"));

    const data = {
      ...submissionData,
      status: "pending",
      submittedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(paperRef, data);
    return { id: paperRef.id, ...data };
  },

  async findByPaperId(paperId: string) {
    const q = query(collection(db, "papers"), where("paperId", "==", paperId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as PaperSubmission;
  },

  async findByUid(uid: string) {
    const q = query(collection(db, "papers"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as PaperSubmission,
    );
  },

  async findByRegistrationId(registrationId: string) {
    const q = query(
      collection(db, "papers"),
      where("registrationId", "==", registrationId),
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as PaperSubmission;
  },

  async updateStatus(
    paperId: string,
    status: string,
    reviewerComments?: string,
    adminNotes?: string,
  ) {
    const q = query(collection(db, "papers"), where("paperId", "==", paperId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const paperDoc = querySnapshot.docs[0];
    const paperRef = doc(db, "papers", paperDoc.id);

    const data: Record<string, unknown> = {
      status,
      reviewedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    if (reviewerComments) data.reviewerComments = reviewerComments;
    if (adminNotes) data.adminNotes = adminNotes;

    await updateDoc(paperRef, data);
    return { id: paperDoc.id, ...paperDoc.data(), ...data };
  },

  async linkPaperToRegistration(
    registrationId: string,
    paperId: string,
    paperStatus: string = "pending",
  ) {
    const registrationRef = doc(db, "registrations", registrationId);
    const registrationDoc = await getDoc(registrationRef);

    if (!registrationDoc.exists()) return null;

    await updateDoc(registrationRef, {
      paperId,
      paperStatus,
      updatedAt: serverTimestamp(),
    });

    return {
      id: registrationId,
      ...registrationDoc.data(),
      paperId,
      paperStatus,
    };
  },

  async getAll(filters?: { status?: string; trackType?: string }) {
    let q = query(collection(db, "papers"));

    if (filters?.status) {
      q = query(q, where("status", "==", filters.status));
    }

    if (filters?.trackType) {
      q = query(q, where("trackType", "==", filters.trackType));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as PaperSubmission,
    );
  },

  async delete(paperId: string, uid: string) {
    const q = query(
      collection(db, "papers"),
      where("paperId", "==", paperId),
      where("uid", "==", uid),
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const paperDoc = querySnapshot.docs[0];
    const paperRef = doc(db, "papers", paperDoc.id);

    await deleteDoc(paperRef);
    return { id: paperDoc.id, ...paperDoc.data() };
  },
};
