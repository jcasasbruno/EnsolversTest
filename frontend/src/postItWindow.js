import React, { useState } from 'react';
import CreateWindow from './createWindow';
import './postItWindow.css';
import { FaArchive, FaEdit, FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const PostItWindow = () => {
  const [postItMessages, setPostItMessages] = useState([]);
  const [display, setDisplay] = useState(false);
  const [savedNote, setSavedNote] = useState(null);
  const [editNote, setEditNote] = useState(null);

  const handleSaveNote = (note) => {
  if (editNote) {
    // If editNote has a value, update the postItMessages state with the edited note
    setPostItMessages((prevMessages) =>
      prevMessages.map((msg) => (msg.id === editNote.id ? note : msg))
    );
    setEditNote(null); // Reset the editNote state
  } else {
    // If editNote is null, add the new note to the postItMessages state
    setPostItMessages((prevMessages) => [...prevMessages, note]);
    setSavedNote(note); // Set the savedNote state for display
  }

  setDisplay(false);
};

  const handleArchive = (id) => {
    console.log('Archiving Note:', id);
  };

const handleEdit = (id) => {
  // Find the note with the given id in the postItMessages state
  const noteToEdit = postItMessages.find((note) => note.id === id);

  // If a matching note is found, set the editNote state with the note data
  if (noteToEdit) {
    setDisplay(true); // Open the CreateWindow modal
    setEditNote({
      id: noteToEdit.id,
      title: noteToEdit.title,
      content: noteToEdit.content,
      lastUpdated: noteToEdit.lastUpdated,
    });
  }
};
  const handleDelete = (id) => {
    setPostItMessages((prevMessages) => prevMessages.filter((note) => note.id !== id));
  };

  return (
    <div className="post-it-window">
      <div className="header">
        <h2>My Notes</h2>
        <div className="header-buttons">
          <button onClick={() => setDisplay(!display)}>Create Note</button>
          <a href="#">Archived Notes</a>
        </div>
      </div>
      {display && (
        <CreateWindow
          display={display}
          setDisplay={setDisplay}
          onSaveNote={handleSaveNote}
          editNote={editNote} // Pass the editNote state
        />
      )}
      {savedNote && (
        <div className="note-tile">
          <h3>{savedNote.title}</h3>
          <p>Last Updated: {savedNote.lastUpdated}</p>
          <div className="button-container">
            <button className="icon-button" onClick={() => handleArchive(savedNote.id)}>
              <FaArchive />
            </button>
            <button className="icon-button" onClick={() => handleEdit(savedNote.id)}>
              <FaEdit />
            </button>
            <button className="icon-button" onClick={() => handleDelete(savedNote.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      )}
      <div className="post-it-container">
        {postItMessages.map((note) => (
          <div key={note.id} className="note-tile">
            <h3>{note.title}</h3>
            <p>Last Updated: {note.lastUpdated}</p>
            <div className="button-container">
              <button className="icon-button" onClick={() => handleArchive(note.id)}>
                <FaArchive />
              </button>
              <button className="icon-button" onClick={() => handleEdit(note.id)}>
                <FaEdit />
              </button>
              <button className="icon-button" onClick={() => handleDelete(note.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostItWindow;
