import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Put your backend URL here (use localhost while testing)
  const API_BASE = "https://mern-m28a.onrender.com"; // ← change to your Render URL when deployed

  // fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/todos`);
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json();
      setTodos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchTodos error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, []);

  // add todo
  const handleAdd = async () => {
    if (!newTitle.trim() && !newDescription.trim()) {
      alert("Please enter a title and description");
      return;
    }

    try {
      const payload = { title: newTitle.trim(), description: newDescription.trim() };
      const res = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error("Add failed: " + text);
      }

      const created = await res.json();
      // Add new todo to state (keep order)
      setTodos((prev) => [...prev, created]);
      setNewTitle("");
      setNewDescription("");
    } catch (err) {
      console.error("handleAdd error:", err);
      alert("Could not add todo. Check console.");
    }
  };

  // delete ONE todo by id (defensive about id field naming)
  const handleDelete = async (id) => {
    if (!id) {
      console.warn("No id passed to handleDelete");
      return;
    }

    // Confirm (optional)
    // if (!window.confirm("Delete this todo?")) return;

    try {
      setDeletingId(id);
      const res = await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });

      if (!res.ok) {
        const text = await res.text();
        throw new Error("Delete failed: " + text);
      }

      // If backend returns the deleted doc or message, we ignore it — just update state.
      setTodos((prev) => prev.filter((t) => {
        const todoId = t._id ?? t.id ?? null;
        return todoId !== id;
      }));

    } catch (err) {
      console.error("handleDelete error:", err);
      alert("Could not delete todo. Check console.");
    } finally {
      setDeletingId(null);
    }
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

        {loading ? (
          <div style={{ textAlign: "center", color: "#6a1b9a" }}>Loading...</div>
        ) : todos.length === 0 ? (
          <div style={{ textAlign: "center", color: "#6a1b9a" }}>No tasks yet.</div>
        ) : (
          <ul style={styles.list}>
            {todos.map((todo) => {
              const todoId = todo._id ?? todo.id ?? null;
              return (
                <li key={todoId || Math.random()} style={styles.todoItem}>
                  <div>
                    <strong>{todo.title}</strong>
                    <div style={styles.desc}>{todo.description}</div>
                  </div>

                  <button
                    onClick={() => handleDelete(todoId)}
                    style={{
                      ...styles.deleteButton,
                      opacity: deletingId === todoId ? 0.6 : 1,
                      pointerEvents: deletingId === todoId ? "none" : "auto",
                    }}
                    title="Delete"
                  >
                    {deletingId === todoId ? "Deleting..." : "✖"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

/* Styles (keeps your purple/pink theme) */
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
    maxWidth: "560px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    border: "2px solid #b39ddb",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(100, 0, 150, 0.2)",
    padding: "22px",
  },
  title: {
    textAlign: "center",
    color: "#6a1b9a",
    marginBottom: "16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "18px",
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
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  todoItem: {
    background: "#ede7f6",
    border: "1px solid #ce93d8",
    padding: "10px 14px",
    borderRadius: "10px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  desc: {
    fontSize: "0.9rem",
    color: "#6a1b9a",
    marginTop: 4,
  },
  deleteButton: {
    background: "#f48fb1",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default App;