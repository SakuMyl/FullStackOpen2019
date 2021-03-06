import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Note from './components/Note'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}
const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'uusi muistiinpano...'
  ) 
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState('virhe...')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }
  
  useEffect(hook, [])
  console.log('render', notes.length, 'notes')
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)
  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
    />
  )
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }
  
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  return (
    <div>
      <h1>Muistiinpanot</h1>

      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          näytä {showAll ? 'vain tärkeät' : 'kaikki' }
        </button>
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}/>
        <button type="submit">tallenna</button>
      </form>
    </div>
  )
}

export default App