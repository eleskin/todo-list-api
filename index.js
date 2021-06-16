const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

app.use(express.json());
app.use(cors());

const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

app.listen(3000, () => console.log('Server started!'));
