import React, { useState } from 'react';
import Note from '../components/Note';

const NoteList = () => {
  const [selectedNoteId, setSelectedNoteId] = useState<string>('');

  const notes = [
    { id: '1', title: 'Note 1' },
    { id: '2', title: 'Note 2' },
    { id: '3', title: 'Note 3' },
  ];

  const handleNoteClick = (noteId: string) => {
    setSelectedNoteId(noteId);
  };

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