// backend/routes/pyqRoutes.js
const express = require('express');
const router = express.Router();
const {
  getPyqsBySemesterAndSubject,
  downloadPyq,
  createPyq, // For admin
} = require('../controllers/pyqController');
const { protect } = require('../middleware/authMiddleware'); // If you want to protect PYQ uploads

router.get('/:semester/:subject', getPyqsBySemesterAndSubject);
router.get('/download/:id', downloadPyq);
router.post('/', protect, createPyq); // Protected for admin/authorized users

module.exports = router;