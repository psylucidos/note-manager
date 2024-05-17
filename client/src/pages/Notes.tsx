import React, { useState, useEffect } from 'react';
import type { RootState } from '../store/store';
import { useSelector } from 'react-redux'
import axios from 'axios';
import Note from '../components/Note';
import '../css/notes.css';

interface Note {
  id: string;
  title: string;
  content: string;
}

const Notes = () => {
  const userToken = useSelector((state: RootState) => state.auth.token);
  const userID = useSelector((state: RootState) => state.auth.id);

  const [selectedNoteId, setSelectedNoteId] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);

  const config = {
    headers: { Authorization: `Bearer ${userToken}` }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      console.log(config);
      axios.get(`http://localhost:3001/notes/list`, config)
        .then((res) => {
          if (!res.data) {
            console.error('No data returned from API');
            setError('No data returned from API');
          } else if (!Array.isArray(res.data)) {
            console.error('Invalid data type returned from API');
            setError('Invalid data type returned from API');
          } else {
            console.log(res.data)
            setNotes(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
          setError('Error fetching notes from API');
        });
    };
    fetchNotes();
  }, []);

  const handleNoteClick = (noteId: string) => {
    setSelectedNoteId(noteId);
  };

  const handleDeleteNote = (noteId: string) => {
    const newNotes = notes.filter((note) => note.id !== noteId);
    setNotes(newNotes);
  
    if (newNotes.length > 0) {
      setSelectedNoteId(newNotes[0].id);
    } else {
      setSelectedNoteId('');
    }
  };

  const handleAddNote = () => {
    const newNote = {
      title: 'New Note',
      content: '',
      user: userID
    };
  
    axios.post(`http://localhost:3001/notes/`, newNote, config)
      .then((res) => {
        if (!res.data) {
          console.error('No data returned from API');
          setError('No data returned from API');
        } else {
          console.log('added note:');
          console.log(res.data);
          setNotes([...notes, res.data]);
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Error creating note');
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <header>
        <h1>Note App</h1>
      </header>
      <div className="notes-container">
        <div className="notes-list">
          <h2>Notes</h2>
          {notes.length === 0 ? (
            <p>No notes available. Click the "Add Note" button to create a new note.</p>
          ) : (
            <ul>
              {notes.map((note) => (
                <li key={note.id}>
                  <a onClick={() => handleNoteClick(note.id)}>{note.title}</a>
                  <p>{note.content}...</p>
                </li>
              ))}
            </ul>
          )}
          <button onClick={handleAddNote}>Add Note</button>
        </div>
        <div className="note-detail">
          {selectedNoteId && <Note id={selectedNoteId} onDelete={() => handleDeleteNote(selectedNoteId)}/>}
        </div>
      </div>
    </div>
  );
};

export default Notes;