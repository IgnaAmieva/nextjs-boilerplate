// src/components/admin/MatchForm.tsx
"use client";
import { useEffect, useState } from "react";
import { Match, createMatch, updateMatch } from "@/src/services/matches";

const CATS = ["PRO Masculino", "PRO Femenino", "Mixto", "Sub-18"];
const COURTS = ["Cancha 1", "Cancha 2", "Cancha 3"];

type Initial = Partial<Match> & { id?: string };

export default function MatchForm({
  editing,
  onSaved,
  initial,
}: {
  editing?: boolean;
  initial?: Initial;
  onSaved?: () => void;
}) {
  const [day, setDay] = useState(initial?.day ?? "");
  const [time, setTime] = useState(initial?.time ?? "");
  const [court, setCourt] = useState(initial?.court ?? COURTS[0]);
  const [category, setCategory] = useState(initial?.category ?? CATS[0]);
  const [teamA, setTeamA] = useState(initial?.teamA ?? "");
  const [teamB, setTeamB] = useState(initial?.teamB ?? "");
  const [status, setStatus] = useState<Match["status"]>(initial?.status ?? "scheduled");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setDay(initial.day ?? "");
      setTime(initial.time ?? "");
      setCourt(initial.court ?? COURTS[0]);
      setCategory(initial.category ?? CATS[0]);
      setTeamA(initial.teamA ?? "");
      setTeamB(initial.teamB ?? "");
      setStatus((initial.status as Match["status"]) ?? "scheduled");
    }
  }, [initial]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!day || !time || !teamA || !teamB) return;

    setSaving(true);
    const payload: Match = {
      day, time, court, category, teamA, teamB, status,
      // podés iniciar score vacío o dejarlo omitido
    };

    try {
      if (editing && initial?.id) {
        await updateMatch(initial.id, payload);
      } else {
        await createMatch(payload);
      }
      onSaved?.();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="text-sm text-white/70">Día</label>
        <input type="date" value={day} onChange={e=>setDay(e.target.value)}
          className="w-full mt-1 rounded-md bg-white/5 border border-white/10 px-3 py-2"/>
      </div>
      <div>
        <label className="text-sm text-white/70">Hora</label>
        <input type="time" value={time} onChange={e=>setTime(e.target.value)}
          className="w-full mt-1 rounded-md bg-white/5 border border-white/10 px-3 py-2"/>
      </div>
      <div>
        <label className="text-sm text-white/70">Cancha</label>
        <select value={court} onChange={e=>setCourt(e.target.value)}
          className="w-full mt-1 rounded-md bg-white/5 border border-white/10 px-3 py-2">
          {COURTS.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="text-sm text-white/70">Categoría</label>
        <select value={category} onChange={e=>setCategory(e.target.value)}
          className="w-full mt-1 rounded-md bg-white/5 border border-white/10 px-3 py-2">
          {CATS.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="text-sm text-white/70">Equipo A</label>
        <input value={teamA} onChange={e=>setTeamA(e.target.value)}
          className="w-full mt-1 rounded-md bg-white/5 border border-white/10 px-3 py-2" />
      </div>
      <div>
        <label className="text-sm text-white/70">Equipo B</label>
        <input value={teamB} onChange={e=>setTeamB(e.target.value)}
          className="w-full mt-1 rounded-md bg-white/5 border border-white/10 px-3 py-2" />
      </div>
      <div>
        <label className="text-sm text-white/70">Estado</label>
        <select value={status} onChange={e=>setStatus(e.target.value as Match["status"])}
          className="w-full mt-1 rounded-md bg-white/5 border border-white/10 px-3 py-2">
          <option value="scheduled">Programado</option>
          <option value="playing">Jugando</option>
          <option value="finished">Finalizado</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <button type="submit" className="btn btn-primary w-full md:w-auto">
          {saving ? "Guardando..." : (editing ? "Guardar cambios" : "Crear partido")}
        </button>
      </div>
    </form>
  );
}
