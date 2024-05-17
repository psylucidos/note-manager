import React, { useState } from 'react';
import axios from 'axios';
import '../css/note.css';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteProps {
  id: string;
  onDelete: () => void;
}

const NoteComponent: React.FC<NoteProps> = ({ id, onDelete }) => {
  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const userToken = useSelector((state: RootState) => state.auth.token);

  const config = {
    headers: { Authorization: `Bearer ${userToken}` }
  };

  React.useEffect(() => {
    const fetchNote = async () => {
      console.log('in note component, getting node id', id);
      axios.get(`http://localhost:3001/notes/id/${id}`, config)
        .then((res) => {
          console.log(res.data);
          if (!res.data) {
            console.error('No data returned from API');
            setError('No data returned from API');
          } else if (typeof res.data !== 'object') {
            console.error('Invalid data type returned from API');
            setError('Invalid data type returned from API');
          } else if (!res.data.id) {
            console.error('Missing required fields in API response');
            setError('Missing required fields in API response');
          } else {
            setNote(res.data);
            setTitle(res.data.title);
            setContent(res.data.content);
          }
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
          setError('Error fetching note from API');
        });
    };
    fetchNote();
  }, [id]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedNote = { id, title, content };
    console.log('updating note')
    axios.put(`http://localhost:3001/notes/${id}`, updatedNote, config)
      .then((res) => {
        setNote(updatedNote);
        setEditing(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error updating note');
      });
  };

  const handleDelete = async () => {
    axios.delete(`http://localhost:3001/notes/${id}`, config)
      .then((res) => {
        console.log(res);
        onDelete(); // This will call the handleDeleteNote function in the Notes component
      })
      .catch((err) => {
        console.error(err);
        setError('Error deleting note');
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!note) {
    return <div>Loading...</div>;
  }

  if (editing) {
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="note-title" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="note-content" />
        <button type="submit">Save</button>
      </form>
    );
  } else {
    return (
      <div>
        <h2 onClick={handleEditClick}>{note.title}
          <button onClick={(e) => { e.stopPropagation(); handleDelete(); }} className="delete-button">X</button>
        </h2>
        <p onClick={handleEditClick}>{note.content}</p>
      </div>
    );
  }
};

export default NoteComponent;