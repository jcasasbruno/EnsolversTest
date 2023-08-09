import React, { useState } from 'react';
import ReactModal from 'react-modal';
import './createWindow.css';

const CreateWindow = ({ display, setDisplay, onSaveNote, editNote }) => {
  const [titleContent, setTitleContent] = useState(editNote ? editNote.title : '');
  const [content, setContent] = useState(editNote ? editNote.content : '');


  const handleSave = () => {
    // Get the current date and time
    const currentDate = new Date();
    const lastUpdated = currentDate.toLocaleString();

    // Prepare the note data to be sent to the parent component
    const note = {
      id: editNote ? editNote.id : null, // If editNote has a value, use its id for update; otherwise, set to null for new note
      title: titleContent,
      content: content,
      lastUpdated: lastUpdated,
    };

    // Pass the note data back to the parent component
    onSaveNote(note);

    setDisplay(false);
  };

  const handleCancel = () => {
    setDisplay(false);
  };

  return (
    <div>
      <ReactModal
        isOpen={display}
        contentLabel={editNote ? 'Edit Note' : 'Create Note'}
        onRequestClose={() => setDisplay(false)}
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
      >
        <h2>{editNote ? 'Edit Note' : 'Create Note'}</h2>
        <div className="text-panel">
          <label htmlFor="title">Title:</label>
          <textarea
            id="title"
            value={titleContent}
            onChange={(e) => setTitleContent(e.target.value)}
            placeholder="Enter Title"
          />
        </div>
        <div className="text-panel">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter Note Content"
          />
        </div>
        <div className="button-container">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSave}>{editNote ? 'Save Changes' : 'Save'}</button>
        </div>
      </ReactModal>
    </div>
  );
};

export default CreateWindow;
