const express = require('express');
const studentRoutes = require('./studentRoutes');

const router = express.Router();

// Student-related routes
router.use('/students', studentRoutes);

module.exports = router;
