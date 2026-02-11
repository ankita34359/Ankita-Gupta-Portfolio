const Certificate = require('../models/Certificate');

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
const getCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: certificates.length,
            data: certificates
        });
    } catch (error) {
        console.error('Error in getCertificates:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create a certificate
// @route   POST /api/certificates
// @access  Private (Admin)
const createCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.create(req.body);
        res.status(201).json({
            success: true,
            data: certificate
        });
    } catch (error) {
        console.error('Error in createCertificate:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update a certificate
// @route   PUT /api/certificates/:id
// @access  Private (Admin)
const updateCertificate = async (req, res) => {
    try {
        let certificate = await Certificate.findById(req.params.id);

        if (!certificate) {
            return res.status(404).json({ success: false, message: 'Certificate not found' });
        }

        certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: certificate
        });
    } catch (error) {
        console.error('Error in updateCertificate:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete a certificate
// @route   DELETE /api/certificates/:id
// @access  Private (Admin)
const deleteCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);

        if (!certificate) {
            return res.status(404).json({ success: false, message: 'Certificate not found' });
        }

        await certificate.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        console.error('Error in deleteCertificate:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    getCertificates,
    createCertificate,
    updateCertificate,
    deleteCertificate
};
