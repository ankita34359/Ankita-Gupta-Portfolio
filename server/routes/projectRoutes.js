const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { projectStorage } = require('../config/cloudinaryConfig');

const upload = multer({
    storage: projectStorage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) return cb(null, true);
        cb('Error: Only images (jpeg, jpg, png, webp) are allowed!');
    }
});

const { protect } = require('../middleware/authMiddleware');

router.get('/', projectController.getProjects);
router.post('/', protect, upload.single('image'), projectController.createProject);
router.put('/:id', protect, upload.single('image'), projectController.updateProject);
router.delete('/:id', protect, projectController.deleteProject);

module.exports = router;
