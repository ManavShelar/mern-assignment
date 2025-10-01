import React, { useEffect, useState } from 'react'
import api from "../api/axios";
import { API_BASE } from '../App'
import TaskForm from '../components/Taskform.jsx'

export default function Dashboard({ user }) {
  const [tasks, setTasks] = useState([])
  const [msg, setMsg] = useState(null)

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const { data } = await api.get(`${API_BASE}/tasks`, {
        withCredentials: true,
      })
      setTasks(data)
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error fetching tasks')
    }
  }

  useEffect(() => { if (user) fetchTasks() }, [user])

  // Create task
  const create = async (title, description) => {
    try {
      const { data } = await api.post(`${API_BASE}/tasks`, { title, description }, {
        withCredentials: true,
      })
      setTasks(prev => [data, ...prev])
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error creating task')
    }
  }

  // Update task
  const update = async (id, title, description) => {
    try {
      const { data } = await api.put(`${API_BASE}/tasks/${id}`, { title, description }, {
        withCredentials: true,
      })
      setTasks(prev => prev.map(t => (t._id === id ? data : t)))
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error updating task')
    }
  }

  // Delete task
  const remove = async (id) => {
    try {
      await api.delete(`${API_BASE}/tasks/${id}`, {
        withCredentials: true,
      })
      setTasks(prev => prev.filter(t => t._id !== id))
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error deleting task')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>

      {msg && (
        <div className="bg-red-100 text-red-700 p-3 rounded shadow">
          {msg}
        </div>
      )}

      <TaskForm onCreate={create} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(t => (
          <div key={t._id} className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800">{t.title}</h3>
            <p className="mt-2 text-gray-600">{t.description || "No description"}</p>
            
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  const newTitle = prompt("Edit Title", t.title)
                  const newDesc = prompt("Edit Description", t.description)
                  if (newTitle !== null) update(t._id, newTitle, newDesc)
                }}
                className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => remove(t._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
