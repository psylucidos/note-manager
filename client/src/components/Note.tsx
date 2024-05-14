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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
};

export default NoteComponent;