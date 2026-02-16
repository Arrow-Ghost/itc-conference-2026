# Frontend-Backend Integration Guide

This guide explains how to integrate the ITC Conference Next.js frontend with the Go backend API.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Architecture Overview](#architecture-overview)
- [Authentication Flow](#authentication-flow)
- [API Usage Examples](#api-usage-examples)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ and npm installed
- Go 1.21+ installed
- A Firebase project with:
  - Authentication enabled (Google provider)
  - Firestore database created
  - Service account credentials downloaded
- Backend server at `/home/krxsna/dev/backend-ITC`

## Setup Instructions

### 1. Frontend Setup

```bash
cd /home/krxsna/dev/itc-new

# Install dependencies (already done)
npm install

# Copy environment example
cp .env.local.example .env.local

# Edit .env.local with your Firebase credentials
nano .env.local
```

### 2. Configure Environment Variables

Edit `.env.local` with your Firebase project credentials:

```env
# Firebase Configuration (from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=itc-2026.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=itc-2026
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=itc-2026.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Backend API
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### 3. Backend Setup

```bash
cd /home/krxsna/dev/backend-ITC

# Ensure .env is configured
cat .env

# Start the backend server
./server
# OR
go run cmd/server/main.go
```

The backend should start on `http://localhost:8080`

### 4. Start the Frontend

```bash
cd /home/krxsna/dev/itc-new
npm run dev
```

The frontend will start on `http://localhost:3000`

## Architecture Overview

### Project Structure

```
itc-new/
├── app/
│   ├── login/
│   │   └── page.tsx           # Login page with Google OAuth
│   ├── fellowship/            # Fellowship registration pages
│   ├── hackathon/             # Hackathon registration pages
│   └── ...
├── lib/
│   ├── firebase.ts            # Firebase initialization
│   ├── auth.ts                # Authentication service
│   ├── api.ts                 # API service for backend calls
│   ├── AuthContext.tsx        # Auth state management
│   └── useProtectedRoute.ts   # Protected route hook
└── .env.local                 # Environment variables
```

### Authentication Flow

```
User clicks "Sign in with Google"
        ↓
Firebase Auth popup opens
        ↓
User selects Google account
        ↓
Firebase returns ID token
        ↓
Frontend sends token to backend /api/v1/auth/google
        ↓
Backend verifies token with Firebase Admin SDK
        ↓
Backend creates/updates user in Firestore
        ↓
Backend returns success response
        ↓
User is authenticated and redirected
```

## API Usage Examples

### Using the Auth Hook

```typescript
'use client';

import { useAuth } from '@/lib/AuthContext';

export default function MyComponent() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <button onClick={signInWithGoogle}>
        Sign In
      </button>
    );
  }

  return (
    <div>
      <p>Welcome, {user.displayName}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Protected Routes

```typescript
'use client';

import { useProtectedRoute } from '@/lib/useProtectedRoute';

export default function ProtectedPage() {
  const { user, loading } = useProtectedRoute();

  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not authenticated, they will be redirected to /login
  return <div>Welcome to protected page, {user?.displayName}!</div>;
}
```

### Creating a Registration

```typescript
import { createRegistration } from '@/lib/api';

async function handleRegistration() {
  const result = await createRegistration({
    name: 'John Doe',
    email: 'john@university.edu',
    phone: '+91-9876543210',
    institution: 'MIT',
    department: 'Computer Science',
    year: '3',
    registrationType: 'fellowship',
    additionalInfo: 'Interested in VLSI testing',
  });

  if (result.success) {
    console.log('Registration created:', result.data);
  } else {
    console.error('Error:', result.error);
  }
}
```

### Getting Current User's Registration

```typescript
import { getMyRegistration } from '@/lib/api';

async function fetchMyRegistration() {
  const result = await getMyRegistration();

  if (result.success) {
    console.log('My registration:', result.data);
  } else {
    console.error('Error:', result.error);
  }
}
```

### Updating Registration

```typescript
import { updateMyRegistration } from '@/lib/api';

async function updateRegistration() {
  const result = await updateMyRegistration({
    phone: '+91-9999999999',
    additionalInfo: 'Updated information',
  });

  if (result.success) {
    console.log('Updated:', result.data);
  } else {
    console.error('Error:', result.error);
  }
}
```

### Deleting Registration

```typescript
import { deleteMyRegistration } from '@/lib/api';

async function deleteRegistration() {
  const result = await deleteMyRegistration();

  if (result.success) {
    console.log('Registration deleted');
  } else {
    console.error('Error:', result.error);
  }
}
```

## Environment Configuration

### Frontend Environment Variables

All environment variables must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser.

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | `AIzaSyAbc...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `project.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | `itc-2026` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | `project.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID | `123456789` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | `1:123:web:abc` |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | `http://localhost:8080` |

### Backend Environment Variables

Ensure your backend `.env` file has:

```env
SERVER_PORT=8080
SERVER_HOST=0.0.0.0
FIREBASE_CREDENTIALS_FILE=itc--2026-firebase-adminsdk-fbsvc-674f7d072e.json
FIREBASE_PROJECT_ID=itc--2026
ENVIRONMENT=development
FRONTEND_URL=http://localhost:3000
```

## Running the Application

### Development Mode

1. **Start Backend:**
   ```bash
   cd /home/krxsna/dev/backend-ITC
   ./server
   ```

2. **Start Frontend:**
   ```bash
   cd /home/krxsna/dev/itc-new
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Health Check: http://localhost:8080/health

### Production Build

```bash
# Build frontend
npm run build

# Start production server
npm start
```

## API Endpoints Reference

### Authentication

- `POST /api/v1/auth/google` - Authenticate with Google ID token
- `POST /api/v1/auth/verify` - Verify token
- `POST /api/v1/auth/logout` - Logout

### User

- `GET /api/v1/me` - Get current user profile

### Registrations

- `POST /api/v1/registrations` - Create registration
- `GET /api/v1/registrations/me` - Get my registration
- `PUT /api/v1/registrations/me` - Update my registration
- `DELETE /api/v1/registrations/me` - Delete my registration

### Admin

- `GET /api/v1/admin/registrations` - Get all registrations (admin only)

All protected endpoints require the `Authorization: Bearer <idToken>` header.

## Troubleshooting

### CORS Errors

If you see CORS errors in the browser console:

1. Check that `FRONTEND_URL` in backend `.env` matches your frontend URL
2. Ensure the backend is running and accessible
3. Check browser console for specific CORS error messages

### Authentication Fails

If Google sign-in doesn't work:

1. Verify Firebase configuration in `.env.local`
2. Check Firebase Console that Google provider is enabled
3. Ensure your domain is authorized in Firebase Console
4. Check browser console for detailed error messages
5. Verify backend is receiving and processing the token

### API Calls Fail

If API calls return 401 Unauthorized:

1. Check that the user is signed in (`useAuth()` returns a user)
2. Verify the ID token is being sent in the Authorization header
3. Check backend logs for token verification errors
4. Ensure Firebase service account JSON is correctly configured on backend

### Backend Connection Failed

If frontend cannot connect to backend:

1. Verify backend is running: `curl http://localhost:8080/health`
2. Check `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
3. Ensure no firewall is blocking port 8080
4. Check backend logs for errors

### Firebase Initialization Errors

If you see Firebase initialization errors:

1. Verify all `NEXT_PUBLIC_FIREBASE_*` variables are set in `.env.local`
2. Check that values match your Firebase Console > Project Settings
3. Restart the dev server after changing `.env.local`
4. Clear browser cache and cookies

## Security Best Practices

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use institutional emails** - Validate email domains on backend if needed
3. **Implement rate limiting** - Protect API endpoints from abuse
4. **Validate all inputs** - On both frontend and backend
5. **Use HTTPS in production** - Never use HTTP for authentication
6. **Rotate secrets regularly** - Update Firebase credentials periodically

## Next Steps

1. **Create registration forms** for Fellowship, Hackathon, CFP, CFT
2. **Add user dashboard** to view and edit registrations
3. **Implement admin panel** to manage all registrations
4. **Add email notifications** for registration confirmations
5. **Set up production deployment** on Vercel/Netlify (frontend) and your server (backend)

## Support

For issues or questions:
- Check backend logs: `tail -f /home/krxsna/dev/backend-ITC/logs/app.log`
- Check frontend console in browser DevTools
- Review Firebase Console for authentication issues
- Verify Firestore rules allow authenticated users to read/write their data

## Additional Resources

- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Next.js Documentation](https://nextjs.org/docs)
- [Backend API README](../backend-ITC/README.md)