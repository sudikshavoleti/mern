import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // ✅ Replace localhost with your Render backend URL
  const API_URL = "https://mern-m28a.onrender.com";

  // Fetch all todos from backend
  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error fetching todos:", err));
  }, []);

  // Add new todo
  const handleAdd = () => {
    if (!newTitle || !newDescription) {
      alert("Please fill in all fields");
      return;
    }

    fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, description: newDescription })
    })
      .then(res => res.json())
      .then(data => {
        setTodos([...todos, data]);
        setNewTitle("");
        setNewDescription("");
      })
      .catch(err => console.error("Error adding todo:", err));
  };

  // Delete a todo
  const handleDelete = (id) => {
    fetch(`${API_URL}/todos/${id}`, { method: "DELETE" })
      .then(() => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(err => console.error("Error deleting todo:", err));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 To-Do App</h1>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.addButton}>
          ➕ Add Task
        </button>
      </div>

      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo._id} style={styles.todoItem}>
            <div>
              <strong>{todo.title}</strong> - {todo.description}
            </div>
            <button onClick={() => handleDelete(todo._id)} style={styles.deleteButton}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    background: "#fdfdfd",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  addButton: {
    background: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  todoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    marginBottom: "8px",
    background: "#f9f9f9",
    borderRadius: "6px"
  },
  deleteButton: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default App;