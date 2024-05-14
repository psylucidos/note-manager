import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteProps {
  id: string;
}

const NoteComponent: React.FC<NoteProps> = ({ id }) => {
  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      axios.get(`http://localhost:3001/notes/${id}`)
      .then((res) => {
        if (!res.data) {
          console.error('No data returned from API');
          setError('No data returned from API');
        } else if (typeof res.data !== 'object') {
          console.error('Invalid data type returned from API');
          setError('Invalid data type returned from API');
        } else if (!res.data.id || !res.data.title || !res.data.content) {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedNote = { id, title, content };
    axios.put(`http://localhost:3001/notes/${id}`, updatedNote)
    .then((res) => {
      setNote(updatedNote);
    })
    .catch((err) => {
      console.error(err);
      setError('Error updating note');
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NoteComponent;