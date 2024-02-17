// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const validationMiddleware = require('../middleware/validationMiddleware');
const Blog = require('../models/Blog');

// Get all blogs
router.get('/', validationMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Create a new blog
router.post('/create', validationMiddleware, async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newBlog = new Blog({ title, content, author });
    await newBlog.save();

    res.send('Blog created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get a specific blog by author ID
router.get('/:authorId', validationMiddleware, async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const blogs = await Blog.find({ author: authorId });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
