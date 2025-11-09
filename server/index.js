import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Schema & Model
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
});

const Todo = mongoose.model("Todo", todoSchema);

// Routes
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching todos", error: err });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({ title, description });
    await newTodo.save();
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "Error creating todo", error: err });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting todo", error: err });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});