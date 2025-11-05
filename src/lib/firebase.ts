// src/lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy0xCPc2oqle3CHQ91PyshqDmm1OALQIk",
  authDomain: "tunuyan-beach-voley.firebaseapp.com",
  projectId: "tunuyan-beach-voley",
  storageBucket: "tunuyan-beach-voley.appspot.com", // <- corregido
  messagingSenderId: "828159658327",
  appId: "1:828159658327:web:333092d4ce0e3f44e09612",
  measurementId: "G-7GWGZW8Y0M",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
