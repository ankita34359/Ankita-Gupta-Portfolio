const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, 'resume.pdf'); // Always overwrite the old resume
    }
});

const upload = multer({
    storage: storage,
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
        filePath: `/uploads/${req.file.filename}`
    });
});

// @desc    Get resume path
// @route   GET /api/resume
// @access  Public
router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../uploads/resume.pdf');
    if (fs.existsSync(filePath)) {
        res.status(200).json({
            success: true,
            filePath: '/uploads/resume.pdf'
        });
    } else {
        res.status(404).json({ success: false, message: 'Resume not found' });
    }
});

module.exports = router;
