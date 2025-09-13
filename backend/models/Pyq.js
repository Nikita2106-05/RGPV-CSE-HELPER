// backend/models/Pyq.js
const mongoose = require('mongoose');

const pyqSchema = mongoose.Schema(
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
      type: String, // e.g., 'uploads/semester1/subject1/pyq_2022.pdf'
      required: true,
    },
    fileType: { // e.g., 'pdf', 'docx'
      type: String,
      required: true,
    },
    year: { // e.g., 2022, 2021
      type: Number,
      required: true,
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

const Pyq = mongoose.model('Pyq', pyqSchema);

module.exports = Pyq;