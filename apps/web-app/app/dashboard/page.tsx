"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken, JwtUser } from "@/src/lib/auth";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<JwtUser | null>(null);

  useEffect(() => {
    const u = getUserFromToken();

    if (!u) {
      router.push("/login");
      return;
    }

    setUser(u);
  }, [router]);

  if (!user) return <p>Cargando...</p>;

  return (
    <main>
      <h1>👋 Bienvenido {user.email}</h1>

      <nav>
        <a href="/labs">Laboratorios</a> |{" "}
        <a href="/availability">Disponibilidad</a> |{" "}
        <a href="/reservations">Reservas</a>

        {user.role === "ADMIN" && (
          <>
            {" | "}
            <a href="/admin">Panel Admin</a>
          </>
        )}
      </nav>
    </main>
  );
}



