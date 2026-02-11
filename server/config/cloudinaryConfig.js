const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const projectStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio/projects',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 1000, height: 600, crop: 'limit' }]
    }
});

const resumeStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio/resume',
        resource_type: 'image',
        format: 'pdf'
    }
});

module.exports = {
    cloudinary,
    projectStorage,
    resumeStorage
};
