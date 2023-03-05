import { CssBaseline,Container } from '@mui/material';
import { useEffect } from "react"
import { useState } from "react"
import Header from './components/Header'
import NoteList from './components/NoteList'

function App() {
  const [notes, setNotes] = useState([]);
  const [filterText, setFilterText] = useState('');
  const BASE_URL = 'http://localhost:8080';

  useEffect(() => {
    fetchNotes()
  }, []);

  const fetchNotes = () => {
    fetch(BASE_URL + '/notes')
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(err => console.log(err));
  }

  const addNote = (note) => {
    fetch(BASE_URL + '/notes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(note) })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          alert('Что-то пошло не так...');
        }
      })
      .then(noteData => setNotes([noteData, ...notes]))
      .catch(err => console.log(err))
  }

  const updateNote = (note, id) => {
    fetch(BASE_URL + '/notes/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
      })
      .then(response => {
        if (response.ok) {
          fetchNotes();
        }
        else {
          alert('Что-то пошло не так...');
        }
      })
      .catch(err => console.error(err))
  }

  const deleteNote = (id) => {
    fetch(BASE_URL + '/notes/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => {
        if (!response.ok) { return; }
          setNotes(notes.filter( n => {
            return n.id != id;
          }));
        })
      .catch(err => console.error(err))
  }

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="md">
        <Header onAddNote={addNote} filterText={filterText} setFilterText={setFilterText} />
        <NoteList  notes={notes} onUpdateNote={updateNote} onDeleteNote={deleteNote} filterText={filterText} />
      </Container>
    </div>
  );
}

export default App;
