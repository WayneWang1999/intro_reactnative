// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// 🔹 Replace with your Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyBno8bdaiMCgkklL06TTVUHSF0NThj0BD0",
    authDomain: "uberbiketoronto.firebaseapp.com",
    projectId: "uberbiketoronto",
    storageBucket: "uberbiketoronto.firebasestorage.app",
    messagingSenderId: "109932802218",
    appId: "1:109932802218:web:f87eee61a8ff9a066120d3",
    measurementId: "G-E5RDN2BHLK"
  };

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
const db = getFirestore(app);

export { auth,app,db };






