import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Admin from "./pages/Admin";
import PrivateRoute from './components/PrivateRoute'

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api/v1'

function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  return (
    <BrowserRouter>
      <div className='min-h-screen bg-gray-100'>
        <Navbar user={user} setUser={setUser} />
        <div className='container mx-auto p-4'>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/dashboard" element={<PrivateRoute user={user} role="user"><Dashboard user={user} /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute user={user} role="admin"><Admin user={user} /></PrivateRoute>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
