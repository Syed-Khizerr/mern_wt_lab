const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// CREATE
router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

// READ
router.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// UPDATE
router.patch('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// DELETE
router.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
