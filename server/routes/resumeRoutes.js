const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { cloudinary } = require('../config/cloudinaryConfig');
const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');

// Use memory storage for direct Cloudinary upload
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only PDFs are allowed!'));
    }
});

// @desc    Upload resume
// @route   POST /api/resume/upload
// @access  Private (Admin)
router.post('/upload', protect, upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a file' });
        }

        console.log('DEBUG: Uploading resume buffer size:', req.file.buffer.length);

        // Convert buffer to base64
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'portfolio/resume',
            resource_type: 'auto', // Cloudinary will detect PDF
            public_id: `resume_${Date.now()}`
        });

        console.log('DEBUG: Cloudinary Resume Upload Result:', {
            public_id: result.public_id,
            resource_type: result.resource_type,
            format: result.format,
            secure_url: result.secure_url
        });

        // Save or update in DB
        let resume = await Resume.findOne();
        if (resume) {
            resume.url = result.secure_url;
            await resume.save();
        } else {
            resume = await Resume.create({ url: result.secure_url });
        }

        res.status(200).json({
            success: true,
            message: 'Resume uploaded successfully',
            filePath: result.secure_url
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
