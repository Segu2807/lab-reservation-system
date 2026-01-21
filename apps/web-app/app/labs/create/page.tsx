"use client";
import { api } from "@/src/lib/api";
import { useState } from "react";

export default function CreateLab() {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(0);

  const submit = async () => {
    await api.post("/labs", { name, capacity });
    location.href = "/labs";
  };

  return (
    <main>
      <h2>Nuevo laboratorio</h2>
      <input placeholder="Nombre" onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Capacidad" onChange={e => setCapacity(+e.target.value)} />
      <button onClick={submit}>Crear</button>
    </main>
  );
}
