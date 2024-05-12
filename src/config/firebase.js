import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDP5ZEj7KEJxI-K49NGOtnGVg5dFzsHU1g",
  authDomain: "ratemyflicks.firebaseapp.com",
  projectId: "ratemyflicks",
  storageBucket: "ratemyflicks.appspot.com",
  messagingSenderId: "100716237298",
  appId: "1:100716237298:web:be07cf0325fc5ac7c35b6b",
  measurementId: "G-NFWDQK52H1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export initialized authentication and firestore
export const auth = getAuth(app);
export const db = getFirestore(app);