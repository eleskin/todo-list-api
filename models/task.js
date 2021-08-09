const mongoose = require('mongoose');

const taskScheme = new mongoose.Schema({
  title: String,
  isComplete: Boolean,
  user_id: String
});

module.exports = mongoose.model('Task', taskScheme);
