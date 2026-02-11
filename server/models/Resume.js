const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
