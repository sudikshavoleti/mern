import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://mern-m28a.onrender.com/todos"; 
// ⬆️ Replace this with your real Render backend URL

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  const addTodo = async () => {
    if (!title.trim() ) {
      alert("Please enter  title ");
      return;
    }
    try {
      const res = await axios.post(API_URL, { title });
      setTodos([...todos, res.data]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Could not add todo, check console");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f3e5f5, #e1bee7, #ce93d8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(100, 0, 150, 0.2)",
          padding: "30px 25px",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#6a1b9a",
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "25px",
          }}
        >
          To-Do Planner
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="text"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: "12px",
              border: "2px solid #ba68c8",
              borderRadius: "8px",
              background: "#faf5ff",
              fontSize: "1rem",
              color: "#4a148c",
            }}
          />
          <button
            onClick={addTodo}
            style={{
              background:
                "linear-gradient(90deg, #ab47bc, #ce93d8, #ba68c8, #ab47bc)",
              color: "#fff",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ➕ Add Task
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          {todos.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "#777",
                fontStyle: "italic",
              }}
            >
              No tasks yet...
            </p>
          ) : (
            todos.map((todo, index) => (
              <li
                key={todo._id}
                style={{
                  background: "#ede7f6",
                  border: "1px solid #ce93d8",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <div>
                  <strong style={{ color: "#6a1b9a", display: "block" }}>
                    {index + 1}. {todo.title}
                  </strong>
                  <span style={{ color: "#8e24aa", fontSize: "0.9rem" }}>
                    {todo.description}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  style={{
                    background: "#f48fb1",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ✖
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}