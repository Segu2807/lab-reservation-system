"use client";

export default function Nav() {
  return (
    <nav style={{ marginBottom: "1rem" }}>
      <a href="/dashboard">Dashboard</a> |{" "}
      <a href="/labs">Labs</a> |{" "}
      <a href="/reservations">Reservas</a> |{" "}
      <a href="/approvals">Aprobaciones</a> |{" "}
      <a href="/users">Usuarios</a> |{" "}
      <a href="/reports">Reportes</a> |{" "}
      <a href="/audits">Auditoría</a>
    </nav>
  );
}
