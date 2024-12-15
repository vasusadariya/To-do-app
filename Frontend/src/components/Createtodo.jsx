import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export function TodoForm({ onAdd, darkMode }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("Title is required!");
      return;
    }

    const newTodo = { title, description };

    try {
      await axios.post(`${API_BASE_URL}/todo`, newTodo);
      alert("Todo added successfully!");
      setTitle("");
      setDescription("");
      onAdd();
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to add todo.");
    }
  };

  const formStyle = {
    backgroundColor: darkMode ? "#333" : "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: darkMode ? "1px solid #555" : "1px solid #ddd",
    backgroundColor: darkMode ? "#444" : "#fff",
    color: darkMode ? "#f5f5f5" : "#333",
  };

  const buttonStyle = {
    backgroundColor: darkMode ? "#444" : "#007BFF",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const labelStyle = {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
    color: darkMode ? "#f5f5f5" : "#333",
  };

  return (
    <div style={formStyle}>
      <h2>Create Todo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Add Todo
        </button>
      </form>
    </div>
  );
}
