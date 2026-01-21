import Nav from "../components/Nav";

export default function NotificationsPage() {
  return (
    <main>
      <Nav />
      <h1>🔔 Notificaciones</h1>

      <p>
        Este sistema envía notificaciones automáticamente cuando:
      </p>

      <ul>
        <li>Se crea una reserva</li>
        <li>Se aprueba o rechaza</li>
        <li>Se cancela una reserva</li>
      </ul>

      <p>
        Integrado con <b>Kafka + n8n</b>.
      </p>
    </main>
  );
}
