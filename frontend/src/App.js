import React, { useEffect, useState } from "react";
import API from "./services/api";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async () => {
    if (!title || !content) return;

    try {
      await API.post("/notes", {
        title,
        content,
      });

      setTitle("");
      setContent("");

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>🚀 NoteFlow</h1>
        <p>Advanced MERN Notes Application</p>

        <div className="note-card">
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button onClick={createNote}>
            Create Note
          </button>
        </div>

        <div className="notes-grid">
          {notes.map((note) => (
            <div className="note-card" key={note._id}>
              <h2>{note.title}</h2>

              <p>{note.content}</p>

              <button
                onClick={() => deleteNote(note._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;