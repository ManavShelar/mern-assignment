import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../App";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (password) => password.length >= 6;

  const submit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setMsg("Invalid email address");
      return;
    }
    if (!isValidPassword(password)) {
      setMsg("Password must be at least 6 characters");
      return;
    }

    try {
      const { data } = await axios.post(
        `${API_BASE}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(data);

      if (data.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {msg && <div className="mb-2 text-red-600">{msg}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <button className="w-full p-2 bg-green-600 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
}
