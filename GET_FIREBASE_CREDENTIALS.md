# How to Get Your Firebase Credentials

Your frontend needs Firebase Web App credentials. Follow these steps:

## Step 1: Go to Firebase Console

1. Open your browser and go to: https://console.firebase.google.com/
2. Select your project: **itc--2026**

## Step 2: Get Web App Credentials

### Option A: If you already have a Web App registered

1. Click the **gear icon** (⚙️) next to "Project Overview"
2. Click **Project Settings**
3. Scroll down to **Your apps** section
4. You should see a web app (icon: `</>`)
5. Under "SDK setup and configuration", select **Config**
6. Copy the `firebaseConfig` object values

### Option B: If you need to create a Web App

1. Click the **gear icon** (⚙️) next to "Project Overview"
2. Click **Project Settings**
3. Scroll down to **Your apps** section
4. Click **Add app** button
5. Select **Web** (the `</>` icon)
6. Give it a name like "ITC Website"
7. Click **Register app**
8. Copy the `firebaseConfig` values shown

## Step 3: Your Config Will Look Like This

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123def456ghi789jkl012mno345pqr",
  authDomain: "itc--2026.firebaseapp.com",
  projectId: "itc--2026",
  storageBucket: "itc--2026.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789"
};
```

## Step 4: Create .env.local File

1. In your terminal, run:
   ```bash
   cd /home/krxsna/dev/itc-new
   cp .env.local.example .env.local
   nano .env.local
   ```

2. Replace the values with YOUR credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAbc123def456ghi789jkl012mno345pqr
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=itc--2026.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=itc--2026
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=itc--2026.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456ghi789

# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

3. Save the file:
   - Press `Ctrl + X`
   - Press `Y` to confirm
   - Press `Enter` to save

## Step 5: Restart the Dev Server

```bash
# Stop the current dev server (Ctrl + C)
npm run dev
```

## Common Issues

### Error: "Firebase: Error (auth/invalid-api-key)"
- Your API key is wrong or missing
- Make sure you copied it correctly from Firebase Console
- Make sure there are no spaces or quotes around the key
- The key should start with `AIza`

### Error: "Firebase: Error (auth/unauthorized-domain)"
1. Go to Firebase Console
2. Click **Authentication** → **Settings** → **Authorized domains**
3. Make sure `localhost` is in the list
4. If not, click **Add domain** and add `localhost`

## Verify Your Setup

After creating `.env.local`, check it exists:

```bash
ls -la .env.local
cat .env.local
```

You should see all your Firebase credentials (without the `your-` placeholders).

## Security Note

⚠️ **NEVER commit `.env.local` to Git!**

It's already in `.gitignore`, but double-check:
```bash
git status
```

`.env.local` should NOT appear in the list of files to commit.

## Need Help?

If you're still having issues:
1. Double-check you're in the correct Firebase project (`itc--2026`)
2. Make sure the web app is registered (not just iOS/Android)
3. Verify all values are copied correctly (no extra spaces)
4. Restart your dev server after making changes