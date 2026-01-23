export const dynamic = "force-dynamic";

import Nav from "../components/Nav";

export default async function ReportsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reports/reservations`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return (
    <main>
      <Nav />
      <h1>📊 Reporte de Reservas</h1>

      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Reserva</th>
            <th>Laboratorio</th>
            <th>Usuario</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r: any) => (
            <tr key={r.id}>
              <td>{r.reservationId}</td>
              <td>{r.labId}</td>
              <td>{r.userId}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

