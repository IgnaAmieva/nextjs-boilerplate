// app/partidos/page.tsx
"use client";

import { useEffect, useState } from "react";
import { listMatchesByDay, Match } from "@/src/services/matches";

export default function PartidosPage() {
  const [day, setDay] = useState(() => new Date().toISOString().slice(0, 10));
  const [items, setItems] = useState<Array<{id: string} & Match>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await listMatchesByDay(day);
      setItems(data);
      setLoading(false);
    })();
  }, [day]);

  return (
    <main className="pt-24 pb-16 container-tbv">
      <h1 className="text-3xl font-extrabold mb-6">Partidos</h1>

      <div className="mb-6">
        <label className="text-sm text-white/70 mr-3">Día</label>
        <input
          type="date"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="bg-white/10 rounded-md px-3 py-2"
        />
      </div>

      {loading ? (
        <p className="text-white/70">Cargando…</p>
      ) : items.length === 0 ? (
        <p className="text-white/70">No hay partidos para este día.</p>
      ) : (
        <ul className="grid gap-3">
          {items.map(m => (
            <li key={m.id} className="surface p-4 rounded-lg">
              <div className="text-sm text-white/60">
                {m.day} · {m.time} · {m.court} · {m.category}
              </div>
              <div className="font-bold mt-1">
                {m.teamA} vs {m.teamB}
              </div>
              <div className="text-white/70 text-sm">
                Estado: {m.status} {m.score?.A ? `· ${m.score.A} / ${m.score.B ?? ""}` : ""}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
