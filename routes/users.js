const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../utils');

const generateAccessToken = (id) => {
  return jwt.sign(id, process.env.TOKEN_SECRET, {expiresIn: '1800s'});
};

router.get('/', authenticateToken, async (req, res) => {
  try {
    res.status(200).json({message: 'Authorized'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email}).exec();

    if (user) {
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      const token = generateAccessToken({id: user._id});

      if (validPassword) {
        res.status(200).json({_id: user._id, token: token});
      } else {
        res.status(400).json({error: 'Invalid Password'});
      }
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });
      const salt = await bcrypt.genSalt(10);
      const token = generateAccessToken({id: newUser._id});

      newUser.password = await bcrypt.hash(newUser.password, salt);

      const savedUser = await newUser.save();

      res.status(201).json({
        id: savedUser._id,
        token: token
      });
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
