
const express = require('express');
const router = express.Router();
const validationMiddleware = require('../middleware/validationMiddleware');
const Author = require('../models/Author');


router.post('/login', validationMiddleware, async (req, res) => {
  try {
    const { username, password } = req.body;
    const author = await Author.findOne({ username, password });
    
    if (!author) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.send('Login successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/register', validationMiddleware, async (req, res) => {
  try {
    const { username, password } = req.body;
    const newAuthor = new Author({ username, password });
    await newAuthor.save();

    res.send('Registration successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
