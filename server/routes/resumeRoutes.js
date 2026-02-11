const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { resumeStorage } = require('../config/cloudinaryConfig');

const upload = multer({
    storage: resumeStorage,
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: PDFs Only!');
        }
    }
});

const { protect } = require('../middleware/authMiddleware');

// @desc    Upload resume
// @route   POST /api/resume/upload
// @access  Private (Admin)
router.post('/upload', protect, upload.single('resume'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Please upload a file' });
    }
    res.status(200).json({
        success: true,
        message: 'Resume uploaded successfully',
        filePath: req.file.path // Cloudinary returns full URL in path
    });
});

// @desc    Get resume path
// @route   GET /api/resume
// @access  Public
router.get('/', (req, res) => {
    // For Cloudinary, we can either store the URL in DB or reconstruct it
    // But since we use a fixed public id 'resume', we can return it directly if we want
    // Better practice: User will upload it once, and we return the known stable URL
    // Or just return the last uploaded one if it exists.
    // For now, let's assume if they upload, they want that URL.
    // Since we don't have a Resume model yet, we'll just return a placeholder or 404 until first upload
    res.status(404).json({ success: false, message: 'Resume not found' });
});

module.exports = router;
