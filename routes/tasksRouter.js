const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const authorizer = require("../middlewares/authorize.middleware");
app.use(cors());
app.use(express.json());
require("dotenv").config();

// Get all tasks for a user
router.get("/", authorizer, async (req, res) => {
  try {
    const userId = req.userObj.id;
    const tasks = await knex("tasks")
      .where({ user_id: userId })
      .select("id", "title", "description", "position");
    res.json(tasks);
  } catch (error) {
    res.status(500).send(`Error retrieving tasks: ${error}`);
  }
});

// post route to retrieve tasks, optionally filtered by date
router.post("/date", authorizer, async (req, res) => {
  try {
    const userId = req.userObj.id;
    const { date } = req.body;
    const tasksQuery = knex("tasks")
      .where({ user_id: userId, task_date: date })
      .select("id", "title", "description", "position", "task_date");
    const tasks = await tasksQuery;
    res.json(tasks);
  } catch (error) {
    res.status(500).send(`Error retrieving tasks: ${error}`);
  }
});

// Create a new task
router.post("/", authorizer, async (req, res) => {
  const userId = req.userObj.id;
  const { title, description, task_date } = req.body;
  try {
    const [newTaskId] = await knex("tasks").insert({
      user_id: userId,
      title,
      description,
      task_date,
      position: { x: 0, y: 0 },
    });
    const newTask = await knex("tasks").where({ id: newTaskId }).first();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).send(`Error creating task: ${error}`);
  }
});

// Update a task
router.put("/:id", authorizer, async (req, res) => {
  const taskId = req.params.id;
  const userId = req.userObj.id;
  // Include position in the destructuring assignment if it's part of the request body.
  const { title, description, position } = req.body;

  try {
    await knex("tasks")
      .where({ id: taskId, user_id: userId })
      .update({
        title,
        description,
        position: JSON.stringify(position),
      });

    const updatedTask = await knex("tasks").where({ id: taskId }).first();
    if (updatedTask && updatedTask.position) {
      updatedTask.position = JSON.parse(updatedTask.position);
    }
    res.json(updatedTask);
  } catch (error) {
    console.error("Detailed error: ", error);
    res.status(500).send(`Error updating task: ${error}`);
  }
});

// Delete a task
router.delete("/:id", authorizer, async (req, res) => {
  const taskId = req.params.id;
  const userId = req.userObj.id;

  try {
    const task = await knex("tasks")
      .where({ id: taskId, user_id: userId })
      .first();
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    await knex("tasks").where({ id: taskId, user_id: userId }).del();
    res.status(204).send();
  } catch (error) {
    res.status(500).send(`Error deleting task: ${error}`);
  }
});

module.exports = router;
