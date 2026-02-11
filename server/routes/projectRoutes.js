const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure storage for project images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads/projects/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `project-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
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
