"use client";
import { useEffect, useState } from "react";
import { api } from "@/src/lib/api";
import Nav from "../components/Nav";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    api.get("/users").then(res => setUsers(res.data));
  }, []);

  return (
    <main>
      <Nav />
      <h1>👥 Usuarios</h1>
      <a href="/users/create">➕ Crear usuario</a>

      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.email} — <b>{u.role}</b>
          </li>
        ))}
      </ul>
    </main>
  );
}
