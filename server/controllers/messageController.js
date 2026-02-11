const nodemailer = require('nodemailer');
const Message = require('../models/Message');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : ''
    }
});

// Verify connection configuration and log status
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ NODEMAILER CONNECTION ERROR:', error.message);
        console.log('DEBUG: Email user:', process.env.EMAIL_USER || 'NOT SET');
        const passLength = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '').length : 0;
        console.log('DEBUG: Password length:', passLength, '(should be 16)');
        console.log('DEBUG: Receiver Email:', process.env.RECEIVER_EMAIL || 'NOT SET');
    } else {
        console.log('✅ EMAIL SERVER IS READY');
    }
});

// @desc    Send a new message
// @route   POST /api/messages
// @access  Public
const sendMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: 'Please provide all fields' });
        }

        const newMessage = await Message.create({
            name,
            email,
            subject,
            message
        });

        // Send Email Notification
        console.log('Attempting to send email from:', process.env.EMAIL_USER);
        console.log('Sending to:', process.env.RECEIVER_EMAIL);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL,
            subject: `New Portfolio Message: ${subject}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #10b981;">New Inquiry from ${name}</h2>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
                        ${message}
                    </div>
                </div>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('❌ NODEMAILER SEND ERROR:', error.message);
                console.log('Ensure EMAIL_USER and EMAIL_PASS are correct in Render settings.');
            } else {
                console.log('✅ EMAIL SENT SUCCESSFULLY:', info.response);
            }
        });

        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: newMessage
        });
    } catch (error) {
        console.error('Error in sendMessage:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error. Please try again later.'
        });
    }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private (Admin)
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private (Admin)
const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }
        await message.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    sendMessage,
    getMessages,
    deleteMessage
};
