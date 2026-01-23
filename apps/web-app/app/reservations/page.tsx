"use client";
import { api } from "@/src/lib/api";
import { useEffect, useState } from "react";

export default function Reservations() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/reservations/me").then(r => setData(r.data));
  }, []);

  return (
    <main>
      <h1>Mis Reservas</h1>
      <a href="/reservations/create">➕ Nueva</a>
      <ul>
        {data.map((r: any) => (
          <li key={r.id}>{r.date} ({r.status})</li>
        ))}
      </ul>
    </main>
  );
}

