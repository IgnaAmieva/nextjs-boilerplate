// app/admin/panel.tsx
"use client";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/src/lib/firebase";
import { listMatches, removeMatch, MatchWithId } from "@/src/services/matches";
import MatchForm from "@/src/components/admin/MatchForm";

export default function AdminPanel() {
  const [items, setItems] = useState<MatchWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<MatchWithId | null>(null);

  const refresh = async () => {
    setLoading(true);
    const data = await listMatches();
    setItems(data);
    setLoading(false);
  };
  useEffect(() => { refresh(); }, []);

  return (
    <main className="pt-24 pb-24 container-tbv">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold">Administrador · Partidos</h1>
        <button className="btn btn-outline" onClick={()=>signOut(auth)}>Cerrar sesión</button>
      </div>

      <div className="surface p-5 mb-8">
        <h2 className="font-bold mb-3">{editing ? "Editar partido" : "Nuevo partido"}</h2>
        <MatchForm
          editing={!!editing}
          initial={editing || undefined}
          onSaved={() => { setEditing(null); refresh(); }}
        />
      </div>

      <div className="surface p-5">
        <h2 className="font-bold mb-4">Listado</h2>
        {loading ? "Cargando..." : (
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="text-white/70">
                <tr>
                  <th className="text-left p-2">Fecha</th>
                  <th className="text-left p-2">Hora</th>
                  <th className="text-left p-2">Cancha</th>
                  <th className="text-left p-2">Cat.</th>
                  <th className="text-left p-2">Equipo A</th>
                  <th className="text-left p-2">Equipo B</th>
                  <th className="text-left p-2">Estado</th>
                  <th className="text-right p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map(m => (
                  <tr key={m.id} className="border-t border-white/10">
                    <td className="p-2">{m.day}</td>
                    <td className="p-2">{m.time}</td>
                    <td className="p-2">{m.court}</td>
                    <td className="p-2">{m.category}</td>
                    <td className="p-2">{m.teamA}</td>
                    <td className="p-2">{m.teamB}</td>
                    <td className="p-2">{m.status}</td>
                    <td className="p-2 text-right">
                      <button className="text-[var(--tbv-500)] mr-3"
                        onClick={()=>setEditing(m)}>Editar</button>
                      <button className="text-red-400"
                        onClick={async()=>{ if(confirm("¿Eliminar partido?")) { await removeMatch(m.id); refresh(); } }}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td className="p-3 text-white/60" colSpan={8}>Sin partidos aún.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
