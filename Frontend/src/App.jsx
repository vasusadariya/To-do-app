import React, { useState, useEffect } from "react";
import axios from "axios";
import { TodoForm } from "./components/Createtodo";
import { TodoList } from "./components/AllTodos";

const API_BASE_URL = "http://localhost:3000";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos`);
      setTodos(response.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const appStyle = {
    maxWidth: "600px",
    margin: "50px auto",
    fontFamily: "'Arial', sans-serif",
    color: darkMode ? "#f5f5f5" : "#333",
    background: darkMode
      ? "linear-gradient(to right, #1e1e1e, #2a2a2a)"
      : "linear-gradient(to right, #ffecd2, #fcb69f)",
    minHeight: "100vh",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
  };

  const headerStyle = {
    textAlign: "center",
  };

  const toggleButtonStyle = {
    marginBottom: "20px",
    padding: "10px 15px",
    backgroundColor: darkMode ? "#444" : "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    alignSelf: "center",
  };

  return (
    <div style={appStyle}>
      <h1 style={headerStyle}>Todo App</h1>
      <button onClick={toggleDarkMode} style={toggleButtonStyle}>
        Toggle to {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <TodoForm onAdd={fetchTodos} darkMode={darkMode} />
      <TodoList todos={todos} onComplete={fetchTodos} darkMode={darkMode} />
    </div>
  );
}
