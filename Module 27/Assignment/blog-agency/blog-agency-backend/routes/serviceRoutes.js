const express = require('express');
const { getAllServices, createService, updateService, deleteService } = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllServices);
router.post('/', authMiddleware, createService);
router.put('/:id', authMiddleware, updateService);
router.delete('/:id', authMiddleware, deleteService);

module.exports = router;
