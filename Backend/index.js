const express = require("express");
const { Createtodo } = require('./types');
const { Updatetodo } = require('./types');
const { Todo } = require("./db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// POST for creating a todo
app.post("/todo", async (req, res) => {
    try {
        const todo = req.body;

        // Validate the todo input
        const parsetodo = Createtodo.safeParse(todo);
        if (!parsetodo.success) {
            return res.status(400).json({ error: "Invalid data.", details: parsetodo.error });
        }

        // Use the parsed data
        const { title, description } = parsetodo.data;

        // Create a new Todo
        await Todo.create({ title, description });
        res.json({ msg: "Todo created successfully" });
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET all todos
app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.json({ todos });
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT for marking a todo as completed
app.put("/completed", async (req, res) => {
    try {
        const updatedtodo = req.body;

        // Validate the update input
        const parseupdatedtodo = Updatetodo.safeParse(updatedtodo);
        if (!parseupdatedtodo.success) {
            return res.status(400).json({ error: "Invalid data.", details: parseupdatedtodo.error });
        }

        // Extract validated data
        const { id } = parseupdatedtodo.data;

        // Update the todo
        const result = await Todo.updateOne({ _id: id }, { completed: true });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json({ msg: "Todo updated successfully" });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
