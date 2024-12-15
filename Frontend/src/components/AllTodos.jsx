import React from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export function TodoList({ todos, onComplete, darkMode }) {
  const handleComplete = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/completed`, { id });
      alert("Todo marked as completed!");
      onComplete();
    } catch (error) {
      console.error("Error marking todo as completed:", error);
      alert("Failed to mark todo as completed.");
    }
  };

  const listStyle = {
    backgroundColor: darkMode ? "#222" : "#fefefe",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const todoItemStyle = {
    padding: "10px",
    borderBottom: darkMode ? "1px solid #555" : "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: darkMode ? "#f5f5f5" : "#333",
  };

  const completedStyle = {
    textDecoration: "line-through",
    color: darkMode ? "#888" : "#aaa",
  };

  const buttonStyle = {
    backgroundColor: darkMode ? "#28A745" : "#007BFF",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={listStyle}>
      <h2>Todo List</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo._id} style={todoItemStyle}>
            <span style={todo.completed ? completedStyle : {}}>
              {todo.title}: {todo.description}
            </span>
            {!todo.completed && (
              <button onClick={() => handleComplete(todo._id)} style={buttonStyle}>
                Mark as Completed
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
