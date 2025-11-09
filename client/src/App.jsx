import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error loading todos:", err));
  }, []);

  const handleAdd = () => {
    if (!title || !description) {
      alert("Please fill in both fields");
      return;
    }

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    })
      .then(res => res.json())
      .then(newTodo => {
        setTodos([...todos, newTodo]);
        setTitle("");
        setDescription("");
      })
      .catch(err => console.error("Error adding todo:", err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, { method: "DELETE" })
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(err => console.error("Error deleting todo:", err));
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "2rem",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#333",
            fontWeight: "600",
          }}
        >
          ✨ My Todo App
        </h1>

        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            padding: "10px 14px",
            marginBottom: "10px",
            border: "2px solid #ddd",
            borderRadius: "10px",
            fontSize: "15px",
          }}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            padding: "10px 14px",
            marginBottom: "10px",
            border: "2px solid #ddd",
            borderRadius: "10px",
            fontSize: "15px",
          }}
        />

        <button
          onClick={handleAdd}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "12px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={e => (e.target.style.opacity = "0.9")}
          onMouseOut={e => (e.target.style.opacity = "1")}
        >
          ➕ Add Task
        </button>

        <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
          {todos.map(todo => (
            <li
              key={todo.id}
              style={{
                background: "#f9f9f9",
                borderRadius: "10px",
                padding: "12px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div>
                <strong style={{ color: "#333" }}>{todo.title}</strong>
                <p style={{ margin: "4px 0", color: "#555" }}>{todo.description}</p>
              </div>
              <button
                onClick={() => handleDelete(todo.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ff5252",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;