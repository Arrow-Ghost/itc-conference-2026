# ITC India 2026 - Conference Website

Official website for the 10th IEEE International Test Conference INDIA - An initiative towards India's semiconductor ecosystem.

## 🚀 Features

- **Next.js 16** with App Router and React 19
- **Firebase Authentication** with Google OAuth
- **Cloud Firestore Database** for data storage
- **Paper Submission System** with PDF upload to Firebase Storage
- **Registration System** for Fellowship, Hackathon, CFP, CFT, ART
- **User Dashboard** for managing registrations and papers
- **Unique Paper ID Tracking** for submitted papers
- **Responsive Design** with Tailwind CSS
- **TypeScript** for type safety

## 📋 Prerequisites

- Node.js 18+ and npm
- Firebase project with Authentication, Firestore, and Storage enabled
- Firebase Admin SDK credentials

## 🔧 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Firebase credentials:

```env
# Firebase Client (Frontend)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Firebase Admin (Backend)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# API Configuration

```

### 3. Enable Firestore in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Firestore Database** in the left menu
4. Click **Create Database**
5. Choose **Start in production mode** (or test mode for development)
6. Select your region

### 4. Enable Firebase Storage

1. In Firebase Console, go to **Storage**
2. Click **Get Started**
3. Accept the default security rules (or customize)
4. Choose your storage location

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Documentation

All data is stored in Cloud Firestore with the following collections:
- `users` - User profiles and authentication data
- `registrations` - Conference registrations
- `papers` - Paper submissions with metadata

## 🏗️ Project Structure

```
itc-new/
├── app/                    # Next.js App Router pages
│   ├── login/             # Login page with Google OAuth
│   ├── api/               # API routes
│   │   ├── papers/        # Paper submission endpoints
│   │   └── registrations/ # Registration endpoints
│   ├── dashboard/         # User dashboard
│   │   ├── submit-paper/  # Paper submission form
│   │   └── papers/        # View submitted papers
│   ├── fellowship/        # Fellowship pages
│   │   └── register/      # Fellowship registration
│   ├── hackathon/         # Hackathon pages
│   └── ...
├── components/            # Reusable components
│   ├── RegistrationForm.tsx
│   └── ui/               # UI components
├── lib/                  # Core utilities and services
│   ├── firebase.ts       # Firebase configuration (Auth + Storage)
│   ├── firestore.ts      # Firestore database operations
│   ├── auth.ts           # Authentication service
│   ├── api.ts            # API client (papers, registrations)
│   ├── AuthContext.tsx   # Global auth state
│   └── useProtectedRoute.ts
└── public/               # Static assets
```

## 📄 Paper Submission System

The platform includes a comprehensive paper submission system:

### Features
- **PDF Upload**: Upload papers up to 10MB directly to Firebase Storage
- **Unique Paper IDs**: Automatically generated tracking IDs (e.g., `CFP-1K2M3N4-ABC123`)
- **Author Management**: Capture complete author and co-author details
- **Track Selection**: Submit to CFP, ART, or CFT tracks
- **Status Tracking**: Monitor submission status (Pending, Under Review, Approved, Rejected)
- **Paper Types**: Full papers, posters, extended abstracts
- **Dashboard Integration**: View all submitted papers with download links

### Usage

#### Submit a Paper
```typescript
import { submitPaper } from '@/lib/api';

const result = await submitPaper({
  authorName: "Dr. John Doe",
  authorEmail: "john@university.edu",
  authorPhone: "+91-9876543210",
  authorInstitution: "MIT",
  authorDepartment: "Computer Science",
  paperTitle: "Advanced VLSI Testing Techniques",
  paperAbstract: "This paper presents...",
  keywords: "VLSI, Testing, AI",
  trackType: "cfp",
  paperType: "full",
  coAuthors: [
    { name: "Jane Doe", email: "jane@uni.edu", institution: "MIT" }
  ]
}, pdfFile);

if (result.success) {
  console.log("Paper ID:", result.data?.paperId);
}
```

#### Get Submitted Papers
```typescript
import { getMyPapers } from '@/lib/api';

const result = await getMyPapers();
if (result.success) {
  result.data?.forEach(paper => {
    console.log(`${paper.paperId}: ${paper.status}`);
  });
}
```

### Firestore Collections

The system uses Cloud Firestore with the following collections:
- `users` - User authentication and profile data
- `registrations` - Conference registrations with paper linking
- `papers` - Complete paper submission data with file tracking

## 🔐 Authentication

The app uses Firebase Authentication with Google OAuth:

1. Users sign in with their Google account
2. Firebase returns an ID token
3. Token is sent to backend for verification
4. Backend creates/updates user in Firestore
5. User can access protected routes and features

### Using Auth in Components

```typescript
'use client';
import { useAuth } from '@/lib/AuthContext';

export default function MyComponent() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <button onClick={signInWithGoogle}>Sign In</button>;
  
  return <div>Welcome, {user.displayName}!</div>;
}
```

## 🛡️ Protected Routes

Use the `useProtectedRoute` hook to protect pages:

```typescript
'use client';
import { useProtectedRoute } from '@/lib/useProtectedRoute';

export default function ProtectedPage() {
  const { user, loading } = useProtectedRoute();
  
  if (loading) return <div>Loading...</div>;
  
  // User is authenticated here
  return <div>Protected content</div>;
}
```

## 🌐 API Routes

The application uses Next.js API routes with Firestore:

### Paper Submission API
- `POST /api/papers` - Submit a new paper with PDF file
- `GET /api/papers` - Get all papers for authenticated user

### Registration API
- `POST /api/registrations` - Create a new registration
- `GET /api/registrations` - Get user's registrations

All data is stored and retrieved from Cloud Firestore in real-time.

## 🧪 Testing

### 1. Test Authentication

- Go to http://localhost:3000/login
- Click "Continue with Google"
- Sign in with your Google account
- You should be redirected to the homepage

### 2. Test Registration

- Go to http://localhost:3000/fellowship/register
- Fill in the registration form
- Submit
- Check your dashboard at http://localhost:3000/dashboard

### 3. Test Paper Submission

- Go to http://localhost:3000/dashboard
- Click "Submit Paper"
- Fill in the form and upload a PDF
- Submit and verify Paper ID is generated
- Go to "View My Papers" to see your submission

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎨 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Check for code issues

## 🔧 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4
- **Language:** TypeScript 5
- **Authentication:** Firebase Auth
- **Storage:** Firebase Storage (for PDF files)
- **Database:** Cloud Firestore
- **Admin SDK:** Firebase Admin for server-side operations

## 🚨 Common Issues

### "Firebase: Error (auth/unauthorized-domain)"
Add `localhost` to Firebase Console → Authentication → Settings → Authorized domains

### "Service not configured"
Ensure all Firebase Admin SDK credentials are set in `.env.local`:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

### "Only PDF files are allowed"
Make sure you're uploading a valid PDF file with MIME type `application/pdf`

### "File size must be less than 10MB"
Compress your PDF file or reduce its size before uploading

### "Not authenticated" errors
Sign out and sign in again. Check Firebase credentials in `.env.local`

## 📄 License

This project is for the ITC India 2026 conference.

## 🤝 Contributing

This is a conference website project. For contributions, please contact the organizing committee.

## 📧 Support

For questions or issues, please contact the ITC India 2026 organizing committee.

## 🎯 Key Features Summary

- ✅ User authentication with Firebase
- ✅ Conference registration (Fellowship, Hackathon, CFP, CFT, ART)
- ✅ Paper submission with PDF upload (max 10MB)
- ✅ Unique Paper ID generation and tracking
- ✅ Real-time submission status monitoring
- ✅ Author and co-author management
- ✅ Firebase Storage integration for files
- ✅ Cloud Firestore (NoSQL database, serverless)
- ✅ User dashboard for managing submissions
- ✅ Mobile-responsive design
- ✅ No database server setup required

---

**Project Location:** `/home/krxsna/dev/itc-new`  
**Database:** Cloud Firestore with Firebase Storage  
**Status:** ✅ Production Ready
