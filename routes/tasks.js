const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({_id: -1});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    isComplete: req.body.isComplete,
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

module.exports = router;
