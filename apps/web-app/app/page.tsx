export default function HomePage() {
  return (
    <main>
      <h1>Sistema de Reservación de Laboratorios</h1>
      <p>Ingeniería Civil</p>

      <nav>
        <a href="/login">Login</a> |{" "}
        <a href="/dashboard">Dashboard</a> |{" "}
        <a href="/labs">Laboratorios</a> |{" "}
        <a href="/reservations">Reservas</a>
      </nav>
    </main>
  );
}


