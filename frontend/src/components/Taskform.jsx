import React, { useState } from 'react'

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!title) return
    onCreate(title, description)
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={submit} className='bg-white p-4 rounded shadow'>
      <div className='flex gap-2'>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' className='flex-1 p-2 border rounded' />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder='Description' className='flex-1 p-2 border rounded' />
        <button className='px-4 py-2 bg-indigo-600 text-white rounded'>Add</button>
      </div>
    </form>
  )
}
