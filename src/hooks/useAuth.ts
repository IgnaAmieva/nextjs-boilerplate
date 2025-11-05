// src/hooks/useAuth.ts
"use client";
import { useEffect, useState } from "react";
import { auth } from "@/src/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u); setLoading(false);
    });
    return () => unsub();
  }, []);

  return { user, loading };
}
