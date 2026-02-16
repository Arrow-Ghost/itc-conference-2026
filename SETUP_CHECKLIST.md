# Setup Checklist - ITC Conference Integration

Use this checklist to ensure your frontend-backend integration is properly configured and working.

## 📋 Pre-Setup Checklist

### Firebase Project
- [ ] Firebase project created at [console.firebase.google.com](https://console.firebase.google.com)
- [ ] Project name: `itc--2026` (or your project name)
- [ ] Authentication enabled
- [ ] Google sign-in provider enabled
- [ ] Firestore database created
- [ ] Service account key downloaded

### Backend
- [ ] Backend code at `/home/krxsna/dev/backend-ITC`
- [ ] Backend `.env` file configured
- [ ] Firebase service account JSON file in backend directory
- [ ] Backend can start without errors

### Frontend
- [ ] Frontend code at `/home/krxsna/dev/itc-new`
- [ ] Node.js 18+ installed
- [ ] npm installed and working

## 🔧 Configuration Checklist

### 1. Firebase Console Configuration
- [ ] Go to Firebase Console → Project Settings
- [ ] Copy the following values:
  - [ ] API Key
  - [ ] Auth Domain
  - [ ] Project ID
  - [ ] Storage Bucket
  - [ ] Messaging Sender ID
  - [ ] App ID

### 2. Frontend Environment Variables
- [ ] Create `.env.local` file in frontend root
- [ ] Add `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] Add `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] Add `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] Add `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] Add `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] Add `NEXT_PUBLIC_FIREBASE_APP_ID`
- [ ] Add `NEXT_PUBLIC_API_BASE_URL=http://localhost:8080`
- [ ] Verify all values are correct (no typos)

### 3. Firebase Authentication Settings
- [ ] Go to Authentication → Sign-in method
- [ ] Google provider is enabled
- [ ] Support email is selected
- [ ] Go to Authentication → Settings → Authorized domains
- [ ] `localhost` is in the list
- [ ] Add your production domain when deploying

### 4. Backend Configuration
- [ ] Open backend `.env` file
- [ ] Verify `FIREBASE_PROJECT_ID` matches your project
- [ ] Verify `FIREBASE_CREDENTIALS_FILE` path is correct
- [ ] Verify `FRONTEND_URL=http://localhost:3000`
- [ ] Verify `SERVER_PORT=8080`

## 🚀 Installation Checklist

### Frontend Dependencies
- [ ] Run `npm install` in frontend directory
- [ ] Check for errors in installation
- [ ] Verify `firebase` package is installed
- [ ] Run `npm list firebase` to confirm version

### Backend Dependencies
- [ ] Backend dependencies already installed (Go modules)
- [ ] Backend compiles without errors
- [ ] Backend binary exists: `./server`

## ▶️ Startup Checklist

### Start Backend
- [ ] Open terminal 1
- [ ] `cd /home/krxsna/dev/backend-ITC`
- [ ] Run `./server`
- [ ] See "Server starting on :8080" message
- [ ] No errors in terminal
- [ ] Backend stays running (doesn't exit)

### Start Frontend
- [ ] Open terminal 2
- [ ] `cd /home/krxsna/dev/itc-new`
- [ ] Run `npm run dev`
- [ ] See "Ready in X.Xs" message
- [ ] See "Local: http://localhost:3000"
- [ ] No compilation errors
- [ ] Frontend stays running

### Verify Backend Health
- [ ] Open terminal 3
- [ ] Run `curl http://localhost:8080/health`
- [ ] Response: `{"status":"ok"}` or similar
- [ ] Status code: 200

## 🧪 Testing Checklist

### Basic Frontend Access
- [ ] Open browser to http://localhost:3000
- [ ] Homepage loads without errors
- [ ] No console errors in browser DevTools (F12)
- [ ] Styling looks correct

### Navigation
- [ ] Can navigate to http://localhost:3000/login
- [ ] Login page loads correctly
- [ ] Both buttons visible (Email and Google)
- [ ] No JavaScript errors in console

### Google Authentication
- [ ] Click "Continue with Google" button
- [ ] Google popup opens
- [ ] Can select Google account
- [ ] Popup closes after selection
- [ ] Redirected to homepage or dashboard
- [ ] No errors in console
- [ ] User stays logged in (refresh page to test)

### Dashboard Access
- [ ] Navigate to http://localhost:3000/dashboard
- [ ] Dashboard loads (should show user info)
- [ ] User name displayed correctly
- [ ] User email displayed correctly
- [ ] No errors in console

### Registration Flow
- [ ] Go to http://localhost:3000/fellowship/register
- [ ] Registration form loads
- [ ] Name and email pre-filled from Google account
- [ ] Can fill in all fields
- [ ] Can select year from dropdown
- [ ] Submit button works
- [ ] Loading state shows during submission
- [ ] Success message appears
- [ ] Redirected to dashboard after success

### Dashboard Features
- [ ] Registration appears in dashboard
- [ ] All registration details visible
- [ ] "Edit Registration" button visible
- [ ] "Delete Registration" button visible
- [ ] "Sign Out" button works
- [ ] Can delete registration (with confirmation)

### Backend Integration
- [ ] Check backend terminal for API requests
- [ ] Should see POST /api/v1/auth/google
- [ ] Should see GET /api/v1/registrations/me
- [ ] Should see POST /api/v1/registrations
- [ ] All requests return 200 or 201
- [ ] No 401 or 500 errors

## 🔍 Verification Checklist

### Firebase Console
- [ ] Go to Authentication → Users
- [ ] Your Google account appears in list
- [ ] UID is generated
- [ ] Last sign-in time is recent

### Firestore Database
- [ ] Go to Firestore Database
- [ ] Collection `users` exists
- [ ] Your user document exists
- [ ] Collection `registrations` exists (after creating registration)
- [ ] Your registration document exists

### Browser Storage
- [ ] Open DevTools → Application → Local Storage
- [ ] Firebase auth tokens present
- [ ] Cookies set correctly
- [ ] Session persists across refreshes

## 🐛 Troubleshooting Checklist

### If Login Doesn't Work
- [ ] Check Firebase credentials in `.env.local`
- [ ] Verify `localhost` in Firebase authorized domains
- [ ] Check browser console for specific error
- [ ] Try clearing browser cache and cookies
- [ ] Try incognito/private browsing mode

### If Backend Connection Fails
- [ ] Verify backend is running (check terminal 1)
- [ ] Verify `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
- [ ] Test backend health: `curl http://localhost:8080/health`
- [ ] Check CORS settings in backend `.env`
- [ ] Look for firewall blocking port 8080

### If Registration Fails
- [ ] Verify user is logged in
- [ ] Check browser console for errors
- [ ] Check backend terminal for errors
- [ ] Verify Firestore rules allow authenticated writes
- [ ] Try logging out and logging in again

## 📝 Documentation Checklist

### Files to Read
- [ ] Read `README.md` - Project overview
- [ ] Read `QUICKSTART.md` - Step-by-step setup
- [ ] Read `INTEGRATION.md` - Complete integration guide
- [ ] Read `INTEGRATION_SUMMARY.md` - What was built
- [ ] Read `.env.local.example` - Environment variables

### Code to Review
- [ ] Review `lib/firebase.ts` - Firebase config
- [ ] Review `lib/auth.ts` - Auth functions
- [ ] Review `lib/api.ts` - API functions
- [ ] Review `lib/AuthContext.tsx` - Global auth state
- [ ] Review `components/RegistrationForm.tsx` - Form component

## ✅ Final Verification

### Everything Working
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can sign in with Google
- [ ] Can access dashboard
- [ ] Can create registration
- [ ] Can view registration
- [ ] Can delete registration
- [ ] Can sign out
- [ ] Session persists across refreshes
- [ ] No errors in any console

### Production Ready
- [ ] All tests passing
- [ ] No console errors
- [ ] No TypeScript errors: `npm run build`
- [ ] Ready to add more features
- [ ] Ready to deploy

## 🎉 Success Criteria

If you can check all boxes in these sections, your integration is complete:

### Must Work
- ✅ Google sign-in
- ✅ Dashboard access
- ✅ Create registration
- ✅ View registration
- ✅ Sign out

### Backend Communication
- ✅ All API calls succeed
- ✅ JWT tokens sent correctly
- ✅ Backend verifies tokens
- ✅ Data saved to Firestore

### User Experience
- ✅ Smooth authentication flow
- ✅ No loading delays
- ✅ Error messages displayed
- ✅ Success feedback shown
- ✅ Professional UI/UX

## 📞 Getting Help

If you're stuck after going through this checklist:

1. Check the specific error message
2. Review the relevant documentation file
3. Check Firebase Console for issues
4. Check backend logs for errors
5. Try the troubleshooting section
6. Check browser DevTools console

## 🔄 Next Steps After Setup

Once everything is working:

1. [ ] Create more registration pages (Hackathon, CFP, CFT)
2. [ ] Update Navbar to show login status
3. [ ] Add user avatar/profile menu
4. [ ] Create admin panel
5. [ ] Add email notifications
6. [ ] Deploy to production

---

**Integration Status:** ⬜ Not Started → ⬜ In Progress → ✅ Complete

**Last Updated:** February 15, 2024