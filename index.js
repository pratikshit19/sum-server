const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// 🎲 Random generators
const titles = [
  "Go to gym",
  "Study React",
  "Build project",
  "Read book",
  "Fix bugs",
  "Deploy app",
  "Write code",
  "Watch tutorial",
];

const descriptions = [
  "Important task",
  "Do it ASAP",
  "Before deadline",
  "High priority",
  "Low priority",
  "Optional task",
];

// 🔥 Generate random todos every time
function generateRandomTodos() {
  const count = Math.floor(Math.random() * 6) + 3; // 3–8 todos

  return Array.from({ length: count }).map((_, i) => ({
    _id: Math.random().toString(36).substring(2, 9),
    title: titles[Math.floor(Math.random() * titles.length)],
    description:
      descriptions[Math.floor(Math.random() * descriptions.length)],
    completed: Math.random() > 0.5,
  }));
}

// 🧠 In-memory todos (changes on refresh)
let todos = generateRandomTodos();

// ========================
// ROUTES
// ========================

// GET todos
app.get("/todos", (req, res) => {
  todos = generateRandomTodos(); // 🔥 regenerate on every request
  res.json({ todos });
});

// ADD todo
app.post("/todo", (req, res) => {
  const { title, description } = req.body;

  const newTodo = {
    _id: Math.random().toString(36).substring(2, 9),
    title,
    description,
    completed: false,
  };

  todos.push(newTodo);

  res.json({ message: "Todo added", todo: newTodo });
});

// TOGGLE complete
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;

  todos = todos.map((t) =>
    t._id === id ? { ...t, completed: !t.completed } : t
  );

  res.json({ message: "Updated" });
});

// DELETE
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  todos = todos.filter((t) => t._id !== id);

  res.json({ message: "Deleted" });
});

// ========================

app.listen(PORT, () => {
  console.log(`🚀 Dummy server running on http://localhost:${PORT}`);
});