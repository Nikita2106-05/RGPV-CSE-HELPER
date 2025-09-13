// backend/models/Notes.js
const mongoose = require('mongoose');

const notesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    subject: {
      type: String,
      required: true,
    },
    // For file path if storing locally, or GridFS file ID
    filePath: {
      type: String, // e.g., 'uploads/semester1/subject1/notes.pdf'
      required: true,
    },
    fileType: { // e.g., 'pdf', 'docx'
      type: String,
      required: true,
    },
    category: { // To differentiate between 'Notes', 'Important Questions', 'Must-Do PYQs'
      type: String,
      required: true,
      enum: ['Notes', 'Important Questions', 'Must-Do PYQs'],
    },
    // Reference to user who uploaded (optional, for admin features)
    // uploadedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;