const express = require('express');
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlogById); // Route for fetching a blog by ID
router.post('/', authMiddleware, createBlog);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router;
