import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = history => {
  const { id } = useParams()
  let [note, setNote] = useState(null)

  useEffect(() => {
    getNote()
  }, [id])

  let getNote = async () => {
    if (id == 'new') return
    let response = await fetch(`/api/notes/${id}/`)
    let data = await response.json()
    setNote(data)
  }

  let createNote = async () => {
    fetch(`/api/notes/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
  }

  let updateNote = async () => {
    fetch(`/api/notes/${id}/update/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
  }

  let deleteNote = async () => {
    fetch(`/api/notes/${id}/delete/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    usehistory('/')
  }

  const usehistory = useNavigate()

  let handleSubmit = () => {
    if (id !== 'new' && note.body === '') {
      deleteNote()
    } else if (id !== 'new') {
      updateNote()
    } else if (id === 'new' && note.body !== null) {
      createNote()
    }
    usehistory('/')
  }

  let handleChange = value => {
    setNote(note => ({ ...note, body: value }))
  }

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={e => {
          handleChange(e.target.value)
        }}
        value={note?.body}
      ></textarea>
    </div>
  )
}

export default NotePage
