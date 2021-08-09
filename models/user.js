const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
  email: String,
  password: String
});

module.exports = mongoose.model('User', userScheme);
