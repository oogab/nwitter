import firebase from "firebase/compat/app"

import {
  getAuth
} from "firebase/auth";

import {
  getFirestore
} from "firebase/firestore";

import {
  getStorage
} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authService = getAuth()
export const dbService = getFirestore()
export const storageService = getStorage()
// export const currentUser = getAuth().currentUser
// export const authStateChanged = onAuthStateChanged()
// export const createUserWithEmail = createUserWithEmailAndPassword()
// export const signInWithEmail = signInWithEmailAndPassword()