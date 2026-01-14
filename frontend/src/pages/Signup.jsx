import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/api/auth/signup", { name, email, password });
    nav("/login");
  };

  return (
    <div className="card">
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <input placeholder="Name" onChange={e => setName(e.target.value)} />
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button>Signup</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
}
