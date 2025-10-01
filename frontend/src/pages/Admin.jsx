import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { API_BASE } from "../App";

export default function Admin({ user }) {
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState(null);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get(`${API_BASE}/auth/users`, {
        withCredentials: true, 
      });
      setUsers(data.filter((u) => u._id !== user._id));
    } catch (err) {
      setMsg(err.response?.data?.message || "Error fetching users");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`${API_BASE}/auth/users/${id}`, {
        withCredentials: true,
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      setMsg(err.response?.data?.message || "Error deleting user");
    }
  };

  useEffect(() => {
    if (user && user.role === "admin") fetchUsers();
  }, [user]);

  if (!user || user.role !== "admin") {
    return <div className="text-red-600">Access denied. Admins only.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {msg && <div className="mb-3 text-red-600">{msg}</div>}

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2 capitalize">{u.role}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => deleteUser(u._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
