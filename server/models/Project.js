const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Project description is required'],
        trim: true
    },
    tech: {
        type: [String],
        default: []
    },
    image: {
        type: String,
        required: [true, 'Project image is required']
    },
    achievements: {
        type: [String],
        default: []
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        required: [true, 'Project category is required'],
        trim: true
    },
    githubLink: {
        type: String,
        trim: true
    },
    liveLink: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
