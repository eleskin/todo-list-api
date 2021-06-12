const mongoose = require('mongoose');

const taskScheme = new mongoose.Schema({
  title: String,
  isComplete: Boolean
});

module.exports = mongoose.model('Task', taskScheme);
