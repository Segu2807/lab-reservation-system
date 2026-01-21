"use client";
import { api } from "@/src/lib/api";
import { useState } from "react";

export default function CreateReservation() {
  const [labId, setLabId] = useState("");
  const [date, setDate] = useState("");

  const submit = async () => {
    await api.post("/reservations", { labId, date });
    location.href = "/reservations";
  };

  return (
    <main>
      <h1>Nueva Reserva</h1>
      <input placeholder="Lab ID" onChange={e => setLabId(e.target.value)} />
      <input type="date" onChange={e => setDate(e.target.value)} />
      <button onClick={submit}>Reservar</button>
    </main>
  );
}

