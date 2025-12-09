import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
// NOTE: Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyAAs-n6L9Ev090jJdwvT0kHYRtmhhEgK7E",
  authDomain: "rwa--scoring.firebaseapp.com",
  projectId: "rwa--scoring",
  storageBucket: "rwa--scoring.firebasestorage.app",
  messagingSenderId: "822311199170",
  appId: "1:822311199170:web:069e6f3a57db2fd72f765b",
  measurementId: "G-CBLZ59QK53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;