# Firebase Authentication Setup Guide

## Prerequisites
- A Google account
- Node.js and npm installed

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "RWA Platform")
4. Disable Google Analytics (optional for this project)
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the web icon (</>) to add a web app
2. Enter an app nickname (e.g., "RWA Web App")
3. Don't check "Firebase Hosting" for now
4. Click "Register app"
5. Copy the Firebase configuration object

## Step 3: Enable Google Authentication

1. In the Firebase Console, go to "Build" → "Authentication"
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Click on "Google" in the providers list
5. Toggle "Enable"
6. Enter a project support email
7. Click "Save"

## Step 4: Configure Your App

1. Open `frontend/src/firebase.js`
2. Replace the placeholder values with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 5: Add Authorized Domains

1. In Firebase Console, go to "Authentication" → "Settings" → "Authorized domains"
2. Add `localhost` (should already be there)
3. Add your production domain when deploying

## Step 6: Test Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:5173`
3. Click "Continue with Google"
4. Sign in with your Google account
5. You should be redirected to the landing page

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure you've replaced all placeholder values in `firebase.js`
- Verify your Firebase project has Google authentication enabled

### "Firebase: Error (auth/unauthorized-domain)"
- Add your domain to the authorized domains list in Firebase Console

### Popup Blocked
- Allow popups for localhost in your browser settings
- Or use redirect mode instead of popup (requires code modification)

## Security Notes

- Never commit your Firebase configuration to public repositories with real credentials
- Use environment variables for production deployments
- Set up Firebase Security Rules for production use

## Next Steps

- Set up Firebase Security Rules
- Add additional authentication providers if needed
- Configure user profiles and data storage
- Set up Firebase Analytics (optional)