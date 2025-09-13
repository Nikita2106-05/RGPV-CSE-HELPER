// backend/controllers/pyqController.js
const asyncHandler = require('express-async-handler');
const Pyq = require('../models/Pyq');

// @desc    Get PYQs by semester and subject
// @route   GET /api/pyq/:semester/:subject
// @access  Public
const getPyqsBySemesterAndSubject = asyncHandler(async (req, res) => {
  const { semester, subject } = req.params;

  const pyqs = await Pyq.find({ semester, subject });

  if (pyqs.length > 0) {
    res.json(pyqs);
  } else {
    res.status(404).json({ message: 'No PYQs found for this semester and subject.' });
  }
});

// @desc    Download a specific PYQ file
// @route   GET /api/pyq/download/:id
// @access  Public
const downloadPyq = asyncHandler(async (req, res) => {
  const pyq = await Pyq.findById(req.params.id);

  if (pyq) {
    const filePath = `${__dirname}/../${pyq.filePath}`; // Adjust 'uploads/' if needed
    const fs = require('fs');

    if (fs.existsSync(filePath)) {
      res.download(filePath, pyq.title + '.' + pyq.fileType); // Set the filename for download
    } else {
      res.status(404);
      throw new Error('File not found');
    }
  } else {
    res.status(404);
    throw new Error('PYQ not found');
  }
});

// @desc    Upload a new PYQ (Admin functionality - placeholder)
// @route   POST /api/pyq
// @access  Private/Admin
const createPyq = asyncHandler(async (req, res) => {
  // Similar to notes, this is a placeholder for file upload
  const { title, semester, subject, filePath, fileType, year } = req.body;

  if (!title || !semester || !subject || !filePath || !fileType || !year) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  const pyq = await Pyq.create({
    title,
    semester,
    subject,
    filePath,
    fileType,
    year,
    // uploadedBy: req.user._id, // If you implement user uploads
  });

  if (pyq) {
    res.status(201).json(pyq);
  } else {
    res.status(400);
    throw new Error('Invalid PYQ data');
  }
});

module.exports = {
  getPyqsBySemesterAndSubject,
  downloadPyq,
  createPyq, // For admin/upload purposes
};