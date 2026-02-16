# Quick Start Guide - ITC Conference Frontend with Backend Integration

This guide will help you get the frontend and backend running together in just a few minutes.

## Prerequisites Checklist

- [ ] Node.js 18+ installed (`node --version`)
- [ ] Go 1.21+ installed (`go version`)
- [ ] Firebase project created
- [ ] Backend at `/home/krxsna/dev/backend-ITC`

## Step 1: Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `itc--2026` (or your project name)
3. Click the gear icon ⚙️ → **Project Settings**
4. Scroll down to **Your apps** section
5. If you don't have a web app, click **Add app** → **Web** (</> icon)
6. Copy all the config values from the Firebase SDK snippet

## Step 2: Configure Frontend

```bash
cd /home/krxsna/dev/itc-new

# Create environment file
cp .env.local.example .env.local

# Edit with your Firebase credentials
nano .env.local
```

Paste your Firebase config into `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAbc123...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=itc--2026.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=itc--2026
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=itc--2026.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

**Save and exit** (Ctrl+X, then Y, then Enter in nano)

## Step 3: Enable Google Sign-In in Firebase

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Google**
3. Toggle **Enable**
4. Select your support email
5. Click **Save**

## Step 4: Start the Backend

Open a **new terminal window**:

```bash
cd /home/krxsna/dev/backend-ITC

# Check if backend is configured
cat .env | grep FIREBASE_PROJECT_ID

# Start the server
./server
```

You should see:
```
Server starting on :8080
```

✅ **Backend is running!** Leave this terminal open.

## Step 5: Start the Frontend

Open **another terminal window**:

```bash
cd /home/krxsna/dev/itc-new

# Install dependencies (if not done already)
npm install

# Start development server
npm run dev
```

You should see:
```
✓ Ready in 2.5s
○ Local:        http://localhost:3000
```

✅ **Frontend is running!** Leave this terminal open.

## Step 6: Test the Integration

1. **Open your browser**: http://localhost:3000

2. **Go to Login Page**: http://localhost:3000/login

3. **Click "Continue with Google"**

4. **Select your Google account**

5. **You should be redirected to the homepage**

6. **Check Dashboard**: http://localhost:3000/dashboard
   - You should see your profile information
   - You can register for events from here

## Verify Backend Connection

Open a third terminal and test the backend:

```bash
# Health check
curl http://localhost:8080/health

# Should return: {"status":"ok"}
```

## Testing Registration Flow

1. Go to http://localhost:3000/login
2. Sign in with Google
3. Navigate to http://localhost:3000/fellowship
4. Click "REGISTER NOW" (you'll need to update the fellowship page to use the registration form)
5. Fill in the registration form
6. Submit
7. Check your dashboard to see the registration

## Common Issues & Fixes

### Issue: "Firebase: Error (auth/unauthorized-domain)"

**Fix:**
1. Go to Firebase Console → Authentication → Settings → Authorized domains
2. Add `localhost` to the list
3. Try signing in again

### Issue: "CORS error" in browser console

**Fix:**
1. Check backend `.env` file has correct `FRONTEND_URL=http://localhost:3000`
2. Restart the backend server
3. Refresh your browser

### Issue: "Failed to connect to backend"

**Fix:**
1. Verify backend is running: `curl http://localhost:8080/health`
2. Check `NEXT_PUBLIC_API_BASE_URL` in frontend `.env.local`
3. Make sure there are no firewalls blocking port 8080

### Issue: "Not authenticated" errors

**Fix:**
1. Sign out and sign in again
2. Check browser console for Firebase errors
3. Verify Firebase credentials in `.env.local` are correct

### Issue: Backend crashes on startup

**Fix:**
1. Check backend `.env` file exists and is configured
2. Verify Firebase service account JSON file exists at the path specified in `.env`
3. Check backend logs for specific error messages

## Next Steps

### 1. Update Fellowship Page to Include Registration Form

Edit `app/fellowship/page.tsx` and replace the "REGISTER NOW" button with a link to a registration page, or integrate the `RegistrationForm` component directly.

### 2. Create More Registration Pages

Copy the pattern from the fellowship page for:
- Hackathon (`app/hackathon/register/page.tsx`)
- Call for Papers (`app/cfp/register/page.tsx`)
- Call for Tutorials (`app/cft/register/page.tsx`)

### 3. Add User Navigation

Update `components/ui/Navbar.tsx` to show:
- "Dashboard" link when user is logged in
- "Sign In" link when user is logged out
- User avatar/name when logged in

### 4. Test All Features

- [ ] Login with Google
- [ ] Create a registration
- [ ] View registration in dashboard
- [ ] Edit registration
- [ ] Delete registration
- [ ] Sign out

## Development Workflow

### Making Changes to Frontend

```bash
# Changes are hot-reloaded automatically
# Just save the file and refresh browser
```

### Making Changes to Backend

```bash
cd /home/krxsna/dev/backend-ITC

# Rebuild and restart
go build -o server cmd/server/main.go
./server
```

### Viewing Logs

**Frontend logs**: Check the terminal where `npm run dev` is running

**Backend logs**: Check the terminal where `./server` is running

**Browser logs**: Open DevTools (F12) → Console tab

## Useful Commands

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Check for code issues

# Backend
./server             # Start backend
go run cmd/server/main.go  # Start backend (alternative)
go build -o server cmd/server/main.go  # Rebuild backend

# Check if ports are in use
lsof -i :3000        # Frontend
lsof -i :8080        # Backend

# Kill processes on ports (if needed)
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:8080)
```

## Project Structure Overview

```
itc-new/                          # Frontend project root
├── app/
│   ├── login/page.tsx           # ✅ Login page (updated with Google OAuth)
│   ├── dashboard/page.tsx       # ✅ User dashboard (new)
│   ├── fellowship/page.tsx      # Fellowship info page
│   ├── hackathon/page.tsx       # Hackathon info page
│   └── ...
├── lib/
│   ├── firebase.ts              # ✅ Firebase initialization (new)
│   ├── auth.ts                  # ✅ Authentication service (new)
│   ├── api.ts                   # ✅ Backend API service (new)
│   ├── AuthContext.tsx          # ✅ Auth state provider (new)
│   └── useProtectedRoute.ts     # ✅ Protected route hook (new)
├── components/
│   └── RegistrationForm.tsx     # ✅ Reusable registration form (new)
└── .env.local                   # ✅ Environment variables (you create this)

backend-ITC/                      # Backend project root
├── cmd/server/main.go           # Backend entry point
├── internal/
│   ├── handlers/                # API request handlers
│   ├── middleware/              # Auth middleware
│   └── ...
├── .env                         # Backend environment variables
└── server                       # Compiled binary
```

## Support Resources

- **Frontend Documentation**: [INTEGRATION.md](./INTEGRATION.md)
- **Backend Documentation**: `/home/krxsna/dev/backend-ITC/README.md`
- **Firebase Auth Docs**: https://firebase.google.com/docs/auth
- **Next.js Docs**: https://nextjs.org/docs

## Success Checklist

Before considering the integration complete, verify:

- [x] Firebase dependencies installed (`npm list firebase`)
- [x] Environment variables configured (`.env.local` exists)
- [x] Backend running on port 8080
- [x] Frontend running on port 3000
- [ ] Can sign in with Google
- [ ] Dashboard loads after login
- [ ] Can create a registration
- [ ] Registration appears in dashboard
- [ ] Can sign out successfully
- [ ] Backend logs show API requests

## Getting Help

If you're stuck:

1. **Check browser console** (F12 → Console) for frontend errors
2. **Check backend terminal** for backend errors
3. **Check Firebase Console** → Authentication → Users to see if user was created
4. **Review the logs** in both terminals
5. **Read INTEGRATION.md** for detailed documentation

---

🎉 **Congratulations!** Your frontend and backend are now integrated with Firebase authentication!