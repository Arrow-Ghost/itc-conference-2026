# ITC India 2026 - Conference Website

Official website for the 10th IEEE International Test Conference INDIA - An initiative towards India's semiconductor ecosystem.

## 🚀 Features

- **Next.js 16** with App Router and React 19
- **Firebase Authentication** with Google OAuth
- **Backend Integration** with Go API
- **Registration System** for Fellowship, Hackathon, CFP, CFT
- **User Dashboard** for managing registrations
- **Responsive Design** with Tailwind CSS
- **TypeScript** for type safety

## 📋 Prerequisites

- Node.js 18+ and npm
- Firebase project with Authentication and Firestore
- Backend server running (see `/home/krxsna/dev/backend-ITC`)

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
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Step-by-step setup guide
- **[INTEGRATION.md](./INTEGRATION.md)** - Complete integration documentation
- **[INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md)** - Overview of what was built

## 🏗️ Project Structure

```
itc-new/
├── app/                    # Next.js App Router pages
│   ├── login/             # Login page with Google OAuth
│   ├── dashboard/         # User dashboard
│   ├── fellowship/        # Fellowship pages
│   │   └── register/      # Fellowship registration
│   ├── hackathon/         # Hackathon pages
│   └── ...
├── components/            # Reusable components
│   ├── RegistrationForm.tsx
│   └── ui/               # UI components
├── lib/                  # Core utilities and services
│   ├── firebase.ts       # Firebase configuration
│   ├── auth.ts           # Authentication service
│   ├── api.ts            # Backend API service
│   ├── AuthContext.tsx   # Global auth state
│   └── useProtectedRoute.ts
└── public/               # Static assets
```

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

## 🌐 API Integration

The frontend communicates with the Go backend at `http://localhost:8080`:

### Available API Methods

```typescript
import { 
  createRegistration, 
  getMyRegistration, 
  updateMyRegistration,
  deleteMyRegistration 
} from '@/lib/api';

// Create a registration
const result = await createRegistration({
  name: 'John Doe',
  email: 'john@university.edu',
  phone: '+91-9876543210',
  institution: 'MIT',
  department: 'Computer Science',
  year: '3',
  registrationType: 'fellowship',
});

// Get my registration
const myReg = await getMyRegistration();
```

## 🧪 Testing

### 1. Start Backend

```bash
cd /home/krxsna/dev/backend-ITC
./server
```

### 2. Test Authentication

- Go to http://localhost:3000/login
- Click "Continue with Google"
- Sign in with your Google account
- You should be redirected to the homepage

### 3. Test Registration

- Go to http://localhost:3000/fellowship/register
- Fill in the registration form
- Submit
- Check your dashboard at http://localhost:3000/dashboard

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
- **Backend:** Go REST API
- **Database:** Firebase Firestore

## 🚨 Common Issues

### "Firebase: Error (auth/unauthorized-domain)"
Add `localhost` to Firebase Console → Authentication → Settings → Authorized domains

### "CORS error"
Check backend `.env` has `FRONTEND_URL=http://localhost:3000` and restart backend

### "Not authenticated" errors
Sign out and sign in again. Check Firebase credentials in `.env.local`

## 📄 License

This project is for the ITC India 2026 conference.

## 🤝 Contributing

This is a conference website project. For contributions, please contact the organizing committee.

## 📧 Support

For questions or issues, please contact the ITC India 2026 organizing committee.

---

**Backend Location:** `/home/krxsna/dev/backend-ITC`  
**Frontend Location:** `/home/krxsna/dev/itc-new`  
**Integration Status:** ✅ Complete
