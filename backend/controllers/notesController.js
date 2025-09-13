// backend/controllers/notesController.js
const asyncHandler = require('express-async-handler');
const Notes = require('../models/Notes');

// @desc    Get notes by semester and subject (for all categories)
// @route   GET /api/notes/:semester/:subject
// @access  Public (for general notes, not protected content yet)
const getNotesBySemesterAndSubject = asyncHandler(async (req, res) => {
  const { semester, subject } = req.params;

  const notes = await Notes.find({ semester, subject });

  if (notes.length > 0) {
    res.json(notes);
  } else {
    res.status(404).json({ message: 'No notes found for this semester and subject.' });
  }
});


// @desc    Get Important Questions and Must-Do PYQs for a semester and subject
// @route   GET /api/notes/protected/:semester/:subject
// @access  Private (requires authentication)
const getProtectedNotes = asyncHandler(async (req, res) => {
  const { semester, subject } = req.params;

  const protectedContent = await Notes.find({
    semester,
    subject,
    category: { $in: ['Important Questions', 'Must-Do PYQs'] },
  });

  if (protectedContent.length > 0) {
    res.json(protectedContent);
  } else {
    res.status(404).json({ message: 'No important questions or must-do PYQs found for this semester and subject.' });
  }
});

// @desc    Download a specific note/file
// @route   GET /api/notes/download/:id
// @access  Public (or Private depending on content)
const downloadNote = asyncHandler(async (req, res) => {
  const note = await Notes.findById(req.params.id);

  if (note) {
    // Construct the full file path. Adjust based on your upload setup.
    // Ensure `uploads` directory is created and populated with files.
    const filePath = `${__dirname}/../${note.filePath}`; // Adjust 'uploads/' if needed

    // Check if the file exists
    // fs.existsSync is synchronous, consider async for large scale apps
    const fs = require('fs');
    if (fs.existsSync(filePath)) {
      res.download(filePath, note.title + '.' + note.fileType); // Set the filename for download
    } else {
      res.status(404);
      throw new Error('File not found');
    }
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
});


// @desc    Upload a new note (Admin functionality - placeholder)
// @route   POST /api/notes
// @access  Private/Admin
const createNote = asyncHandler(async (req, res) => {
  // This is a placeholder. You'll need to implement file upload logic
  // using 'multer' or a similar library to handle file storage in `uploads/`
  // or GridFS. For now, it assumes filePath is provided.
  const { title, semester, subject, filePath, fileType, category } = req.body;

  if (!title || !semester || !subject || !filePath || !fileType || !category) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  const note = await Notes.create({
    title,
    semester,
    subject,
    filePath,
    fileType,
    category,
    // uploadedBy: req.user._id, // If you implement user uploads
  });

  if (note) {
    res.status(201).json(note);
  } else {
    res.status(400);
    throw new Error('Invalid note data');
  }
});

module.exports = {
  getNotesBySemesterAndSubject,
  getProtectedNotes,
  downloadNote,
  createNote, // For admin/upload purposes
};