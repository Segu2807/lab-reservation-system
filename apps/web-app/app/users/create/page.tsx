"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function CreateUser() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("STUDENT");
const router = useRouter();


const submit = async () => {
await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
method: 'POST', headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, password, role })
});
router.push('/users');
};


return (
<div style={{ padding: '2rem' }}>
<h1>Nuevo Usuario</h1>
<input placeholder="Email" onChange={e => setEmail(e.target.value)} />
<input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
<select onChange={e => setRole(e.target.value)}>
<option>STUDENT</option><option>GRADUATE</option><option>EXTERNAL</option><option>ADMIN</option>
</select>
<button onClick={submit}>Crear</button>
</div>
);
}
