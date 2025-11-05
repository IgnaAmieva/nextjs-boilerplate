// src/services/matches.ts
import { db } from "@/src/lib/firebase";
import {
  collection, addDoc, updateDoc, doc, deleteDoc,
  query, where, orderBy, getDocs, getDoc, Timestamp
} from "firebase/firestore";

/** Estructura de un partido almacenado en Firestore (sin id) */
export interface Match {
  day: string;             // "2025-11-08"
  time: string;            // "18:30" (HH:mm)
  court: string;           // "Cancha 1"
  category: string;        // "PRO Masculino"
  teamA: string;
  teamB: string;
  status: "scheduled" | "playing" | "finished";
  score?: { A?: string; B?: string };
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

/** Cuando traemos de Firestore, adjuntamos el id del doc */
export type MatchWithId = Match & { id: string };

const COL = collection(db, "matches");

/** Crear */
export async function createMatch(data: Match) {
  return addDoc(COL, {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
}

/** Actualizar parcial por id */
export async function updateMatch(id: string, patch: Partial<Match>) {
  return updateDoc(doc(db, "matches", id), {
    ...patch,
    updatedAt: Timestamp.now(),
  });
}

/** Eliminar */
export async function removeMatch(id: string) {
  return deleteDoc(doc(db, "matches", id));
}

/** Listado global ordenado por día y hora */
export async function listMatches(): Promise<MatchWithId[]> {
  const q = query(COL, orderBy("day"), orderBy("time"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as Match) }));
}

/** Obtener uno por id */
export async function getMatch(id: string): Promise<MatchWithId | null> {
  const ref = doc(db, "matches", id);
  const s = await getDoc(ref);
  if (!s.exists()) return null;
  return { id: s.id, ...(s.data() as Match) };
}

/** Listado por día */
export async function listMatchesByDay(day: string): Promise<MatchWithId[]> {
  const q = query(COL, where("day", "==", day), orderBy("time"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as Match) }));
}

/** Listado por día y cancha */
export async function listMatchesByDayAndCourt(day: string, court: string): Promise<MatchWithId[]> {
  const q = query(
    COL,
    where("day", "==", day),
    where("court", "==", court),
    orderBy("time")
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as Match) }));
}
