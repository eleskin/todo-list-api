const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const authenticateToken = require('../utils');

const getTask = async (req, res, next) => {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({message: 'Cannot find task'});
    }
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
  res.task = task;
  next();
};

router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({
      user_id: req.user.id,
    }).sort({_id: -1});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const task = new Task({
    title: req.body.title,
    isComplete: req.body.isComplete,
    user_id: req.user.id
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

router.patch('/:id', authenticateToken, getTask, async (req, res) => {
  if (req.body.title !== null) {
    res.task.title = req.body.title;
  }
  if (req.body.isComplete !== null) {
    res.task.isComplete = req.body.isComplete;
  }
  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

router.delete('/:id', authenticateToken, getTask, async (req, res) => {
  try {
    await res.task.remove();
    res.json({message: 'Deleted task'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
