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

const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');

// @desc    Upload resume
// @route   POST /api/resume/upload
// @access  Private (Admin)
router.post('/upload', protect, upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a file' });
        }

        // Save or update in DB
        let resume = await Resume.findOne();
        if (resume) {
            resume.url = req.file.path;
            await resume.save();
        } else {
            resume = await Resume.create({ url: req.file.path });
        }

        res.status(200).json({
            success: true,
            message: 'Resume uploaded successfully',
            filePath: req.file.path
        });
    } catch (error) {
        console.error('❌ Error in resume upload:', error);
        res.status(500).json({ success: false, message: error.message || 'Error uploading resume' });
    }
});

// @desc    Get resume path
// @route   GET /api/resume
// @access  Public
router.get('/', async (req, res) => {
    try {
        const resume = await Resume.findOne();
        if (!resume) {
            return res.status(404).json({ success: false, message: 'Resume not found' });
        }
        res.status(200).json({
            success: true,
            filePath: resume.url
        });
    } catch (error) {
        console.error('❌ Error getting resume:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
