"use client";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(jwtDecode(token));
  }, []);

  if (!user) return <p>Cargando...</p>;

  return (
    <main>
      <h1>👋 Bienvenido {user.email}</h1>

      <nav>
        <a href="/labs">Laboratorios</a> |{" "}
        <a href="/availability">Disponibilidad</a> |{" "}
        <a href="/reservations">Reservas</a>
      </nav>
    </main>
  );
}


