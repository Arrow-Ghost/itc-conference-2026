# Fixing "auth/invalid-api-key" Error

## 🔴 The Problem

You're seeing this error:

```
Error [FirebaseError]: Firebase: Error (auth/invalid-api-key).
code: 'auth/invalid-api-key'
```

**This means:** Your Firebase Web App credentials are not configured in `.env.local`

## ✅ Quick Fix (5 minutes)

### Option 1: Use the Setup Script (Easiest)

```bash
cd /home/krxsna/dev/itc-new
./setup-firebase.sh
```

Follow the prompts and enter your Firebase credentials.

### Option 2: Manual Setup

#### Step 1: Get Your Firebase Credentials

1. Open https://console.firebase.google.com/
2. Select your project: **itc--2026**
3. Click the **⚙️ gear icon** → **Project Settings**
4. Scroll to **"Your apps"** section
5. Look for a web app (icon: `</>`)
   - If you don't have one, click **"Add app"** → Select **Web**
   - Name it "ITC Website" and click **"Register app"**
6. You'll see code like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",
  authDomain: "itc--2026.firebaseapp.com",
  projectId: "itc--2026",
  storageBucket: "itc--2026.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123..."
};
```

#### Step 2: Create/Edit .env.local

```bash
cd /home/krxsna/dev/itc-new
nano .env.local
```

#### Step 3: Paste Your Credentials

Replace the placeholder values with YOUR actual values from Firebase:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAbc123def456...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=itc--2026.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=itc--2026
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=itc--2026.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123...

# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

**Important:**
- Remove all `your-xxx-here` placeholder text
- Don't add quotes around the values
- Make sure there are no spaces around the `=` sign
- The API key should start with `AIza`

#### Step 4: Save and Exit

- Press `Ctrl + X`
- Press `Y` to confirm
- Press `Enter`

#### Step 5: Restart Dev Server

```bash
# Stop the current server (Ctrl + C)
npm run dev
```

## 🎯 Verify It's Fixed

1. The dev server should start without errors
2. Open http://localhost:3000
3. You should NOT see the `auth/invalid-api-key` error
4. The page should load properly

## 📋 Additional Firebase Setup

After fixing the credentials, you also need to:

### 1. Enable Google Sign-In

1. Go to Firebase Console
2. Click **Authentication** → **Sign-in method**
3. Click on **Google**
4. Toggle **Enable**
5. Select a support email
6. Click **Save**

### 2. Add Authorized Domains

1. Go to Firebase Console
2. Click **Authentication** → **Settings** → **Authorized domains**
3. Make sure `localhost` is in the list
4. If not, click **Add domain** and add `localhost`

## 🐛 Still Having Issues?

### Check Your .env.local File

```bash
cat .env.local
```

Make sure:
- ✅ File exists
- ✅ No "your-xxx-here" placeholders
- ✅ API key starts with "AIza"
- ✅ Project ID is "itc--2026"
- ✅ No quotes around values
- ✅ No trailing spaces

### Check Firebase Console

1. Verify you're in the correct project (itc--2026)
2. Check that a Web app is registered
3. Verify Authentication is enabled
4. Verify Google provider is enabled

### Common Mistakes

❌ **Wrong:** 
```env
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy..."  # Don't use quotes
```

✅ **Correct:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
```

❌ **Wrong:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSy...  # No spaces around =
```

✅ **Correct:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
```

❌ **Wrong:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here  # Still has placeholder
```

✅ **Correct:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAbc123def456...
```

## 📞 Need More Help?

1. Read the detailed guide: `GET_FIREBASE_CREDENTIALS.md`
2. Run the setup script: `./setup-firebase.sh`
3. Check the QUICKSTART guide: `QUICKSTART.md`

## 🔍 Technical Details

**Why this happens:**

The frontend needs Firebase SDK credentials to initialize Firebase Authentication. These credentials are:
- Safe to expose in client-side code
- Different from the service account key (used by backend)
- Required for the web app to communicate with Firebase

**What the error means:**

Firebase couldn't initialize because either:
1. The `.env.local` file doesn't exist
2. The API key is missing or invalid
3. The credentials have placeholder values

**How we fixed it:**

1. Created `.env.local` with your Firebase web app credentials
2. Added validation to show helpful error messages
3. Created setup scripts to automate the process

---

**After fixing this, you should be able to:**
- ✅ Load the website without errors
- ✅ See the login page
- ✅ Click "Continue with Google" (after enabling it in Firebase)
- ✅ Sign in and use all features