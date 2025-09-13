// backend/routes/notesRoutes.js
const express = require('express');
const router = express.Router();
const {
  getNotesBySemesterAndSubject,
  getProtectedNotes,
  downloadNote,
  createNote, // For admin
} = require('../controllers/notesController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:semester/:subject', getNotesBySemesterAndSubject);
router.get('/protected/:semester/:subject', protect, getProtectedNotes);
router.get('/download/:id', downloadNote); // Could be protected depending on content
router.post('/', protect, createNote); // Protected for admin/authorized users

module.exports = router;