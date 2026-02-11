const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Certificate name is required'],
        trim: true
    },
    issuer: {
        type: String,
        required: [true, 'Issuer name is required'],
        trim: true
    },
    date: {
        type: String,
        required: [true, 'Date is required']
    },
    description: {
        type: String,
        trim: true
    },
    link: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
