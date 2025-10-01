import React, { useState } from 'react'
import api from '../api/axios'
import { API_BASE } from '../App'
import { useNavigate } from 'react-router-dom'

export default function Register({ setUser }) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [msg, setMsg] = useState(null)

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const isValidPassword = (password) => /^(?=.*[0-9]).{6,}$/.test(password)

  const submit = async (e) => {
    e.preventDefault()

    if (!name.trim()) {
      setMsg('Name is required')
      return
    }
    if (!isValidEmail(email)) {
      setMsg('Invalid email address')
      return
    }
    if (!isValidPassword(password)) {
      setMsg('Password must be at least 6 characters and include a number')
      return
    }

    try {
      const { data } = await api.post("/auth/register",
        { name, email, password, role },
        { withCredentials: true }
      )
      setUser(data)

      if (data.role === 'admin') navigate('/admin')
      else navigate('/dashboard')
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error registering')
    }
  }

  return (
    <div className='max-w-md mx-auto bg-white p-6 rounded shadow'>
      <h2 className='text-xl font-bold mb-4'>Register</h2>
      {msg && <div className='mb-2 text-red-600'>{msg}</div>}
      <form onSubmit={submit} className='space-y-3'>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
          className='w-full p-2 border rounded'
        />
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className='w-full p-2 border rounded'
        />
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='Password'
          className='w-full p-2 border rounded'
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className='w-full p-2 border rounded'
        >
          <option value='user'>User</option>
          <option value='admin'>Admin</option>
        </select>
        <button className='w-full p-2 bg-blue-600 text-white rounded'>
          Register
        </button>
      </form>
    </div>
  )
}
