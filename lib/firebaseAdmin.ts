// lib/firebaseAdmin.ts
import "server-only";
import { getApps, initializeApp, cert, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

const app =
  getApps().length
    ? getApps()[0]
    : initializeApp(
        clientEmail && privateKey
          ? { credential: cert({ projectId, clientEmail, privateKey }) }
          : { credential: applicationDefault() }
      );

export const adminDb = getFirestore(app);
