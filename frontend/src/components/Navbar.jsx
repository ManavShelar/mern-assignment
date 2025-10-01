import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="font-bold">
          MERN-Task
        </Link>
        <div className="space-x-3">
          {user ? (
            <>
              <span className="mr-2">Hi, {user.name}</span>
              <button onClick={logout} className="px-3 py-1 border rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 border rounded">
                Login
              </Link>
              <Link to="/register" className="px-3 py-1 border rounded">
                Register
              </Link>
              {user && user.role === "admin" && (
                <Link to="/admin" className="px-3 py-1 border rounded">
                  Admin
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
