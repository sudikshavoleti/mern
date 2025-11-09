import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const API_URL = "https://mern-m28a.onrender.com";

  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  const handleAdd = () => {
    if (!newTitle || !newDescription) {
      alert("Please fill in all fields");
      return;
    }

    fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, description: newDescription }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]);
        setNewTitle("");
        setNewDescription("");
      })
      .catch((err) => console.error("Error adding todo:", err));
  };

  const handleDelete = (id) => {
  fetch(`${API_URL}/todos/${id}`, { method: "DELETE" })
    .then(() => setTodos(todos.filter((todo) => todo._id !== id)))
    .catch((err) => console.error("Error deleting todo:", err));
};

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}> To-Do Planner</h1>

        <div style={styles.form}>
          <input
            type="text"
            placeholder="Enter Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Enter Description"
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
                <strong>{todo.title}</strong>
                <div style={styles.desc}>{todo.description}</div>
              </div>
              <button
                onClick={() => handleDelete(todo._id)}
                style={styles.deleteButton}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "linear-gradient(135deg, #f3e5f5, #e1bee7, #ce93d8)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "50px",
  },
  container: {
    width: "90%",
    maxWidth: "500px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    border: "2px solid #b39ddb",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(100, 0, 150, 0.2)",
    padding: "25px",
  },
  title: {
    textAlign: "center",
    color: "#6a1b9a",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    border: "2px solid #ba68c8",
    borderRadius: "8px",
    outline: "none",
    fontSize: "1rem",
    color: "#4a148c",
  },
  addButton: {
    background: "#ab47bc",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  todoItem: {
    background: "#ede7f6",
    border: "1px solid #ce93d8",
    padding: "10px 15px",
    borderRadius: "10px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "all 0.2s ease",
  },
  desc: {
    fontSize: "0.9rem",
    color: "#6a1b9a",
  },
  deleteButton: {
    background: "#f48fb1",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default App;