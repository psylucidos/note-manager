import React, { useState, useEffect } from 'react';
import type { RootState } from '../store/store';
import { useSelector } from 'react-redux'
import axios from 'axios';
import Note from '../components/Note';

interface Note {
  id: string;
  title: string;
  summary: string;
}

const NoteList = () => {
  const userToken = useSelector((state: RootState) => state.auth.token);

  const [selectedNoteId, setSelectedNoteId] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);

  const config = {
    headers: { Authorization: `Bearer ${userToken}` }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      axios.get(`http://localhost:3001/notes/list/user/`, config)
      .then((res) => {
        if (!res.data) {
          console.error('No data returned from API');
          setError('No data returned from API');
        } else if (!Array.isArray(res.data)) {
          console.error('Invalid data type returned from API');
          setError('Invalid data type returned from API');
        } else {
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <a onClick={() => handleNoteClick(note.id)}>{note.title}</a>
          </li>
        ))}
      </ul>
      {selectedNoteId && <Note id={selectedNoteId} />}
    </div>
  );
};

export default NoteList;