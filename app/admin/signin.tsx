"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/src/lib/firebase";
import { useState } from "react";

export default function LoginBox() {
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr(null);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (e: any) {
      setErr(e?.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="pt-24 container-tbv">
      <div className="surface p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Acceso administradores</h1>
        <form onSubmit={login} className="space-y-3">
          <input className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2"
            placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2"
            placeholder="Contraseña" type="password" value={pass} onChange={e=>setPass(e.target.value)} />
          {err && <p className="text-red-400 text-sm">{err}</p>}
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </main>
  );
}
