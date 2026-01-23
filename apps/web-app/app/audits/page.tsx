export const dynamic = "force-dynamic";

import Nav from "../components/Nav";

export default async function AuditsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/audits`,
    { cache: "no-store" }
  );

  const audits = await res.json();

  return (
    <main>
      <Nav />
      <h1>🕵️ Auditoría del Sistema</h1>

      <ul>
        {audits.map((a: any) => (
          <li key={a._id}>
            <b>{a.event}</b> — {a.service}
          </li>
        ))}
      </ul>
    </main>
  );
}

