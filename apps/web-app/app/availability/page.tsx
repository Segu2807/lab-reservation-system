"use client";
import { api } from "@/src/lib/api";
import { useState } from "react";

export default function AvailabilityPage() {
  const [result, setResult] = useState<any>(null);

  const check = async () => {
    const res = await api.get("/availability/check", {
      params: { labId: "1", date: "2026-01-20", timeSlot: "08:00-10:00" },
    });
    setResult(res.data);
  };

  return (
    <main>
      <h1>Disponibilidad</h1>
      <button onClick={check}>Verificar</button>
      {result && <p>{result.available ? "Disponible" : "No disponible"}</p>}
    </main>
  );
}

