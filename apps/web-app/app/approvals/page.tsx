"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/api";
import Nav from "../components/Nav";

export default function ApprovalsPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    api.get("/approvals/pending").then(res => setItems(res.data));
  }, []);

  const approve = async (id: string) => {
    await api.post(`/approvals/${id}/approve`);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const reject = async (id: string) => {
    await api.post(`/approvals/${id}/reject`);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <main>
      <Nav />
      <h1>✔ Aprobaciones Pendientes</h1>

      {items.length === 0 && <p>No hay pendientes</p>}

      <ul>
        {items.map(a => (
          <li key={a.id}>
            Reserva {a.reservationId}
            <button onClick={() => approve(a.id)}>Aprobar</button>
            <button onClick={() => reject(a.id)}>Rechazar</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
