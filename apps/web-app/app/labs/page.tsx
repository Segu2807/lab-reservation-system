"use client";
import { api } from "@/src/lib/api";
import { useEffect, useState } from "react";

export default function LabsPage() {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    api.get("/labs").then(r => setLabs(r.data));
  }, []);

  return (
    <main>
      <h1>🏗 Laboratorios</h1>
      <a href="/labs/create">➕ Crear laboratorio</a>

      <ul>
        {labs.map((l: any) => (
          <li key={l.id}>
            {l.name} – Capacidad {l.capacity}
          </li>
        ))}
      </ul>
    </main>
  );
}

