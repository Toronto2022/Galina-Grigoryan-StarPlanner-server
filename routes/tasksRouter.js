const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const authorizer = require("./middlewares/authorize.middleware");
app.use(cors());
require("dotenv").config();

// Get all tasks for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await knex("tasks").where({ user_id: req.userObj.id });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Error fetching tasks");
  }
});

// Get a single task by id for the authenticated user
router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await knex("tasks")
      .where({ id, user_id: req.userObj.id })
      .first();
    if (!task) {
      return res.status(404).send("Task not found or not accessible");
    }
    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).send("Error fetching task");
  }
});

// POST route to create a new task for the authenticated user
router.post("/", authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newTaskId = await knex("tasks").insert({
      title,
      description,
      user_id: req.userObj.id, // Use authenticated user's id
    });
    const newTask = await knex("tasks").where({ id: newTaskId[0] }).first();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating new task:", error);
    res.status(400).json({ error: "Failed to create a new task." });
  }
});

// PUT route to update an existing task for the authenticated user
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updated = await knex("tasks")
      .where({ id, user_id: req.userObj.id })
      .update({ title, description });

    if (!updated) {
      return res
        .status(404)
        .json({ error: "Task not found or not accessible." });
    }
    const updatedTask = await knex("tasks").where({ id }).first();
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(400).json({ error: "Failed to update task." });
  }
});

// DELETE route to delete an existing task for the authenticated user
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await knex("tasks")
      .where({ id, user_id: req.userObj.id })
      .del();

    if (!deleted) {
      return res
        .status(404)
        .json({ error: "Task not found or not accessible." });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(400).json({ error: "Failed to delete task." });
  }
});

module.exports = router;
