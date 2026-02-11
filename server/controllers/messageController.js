const { Resend } = require('resend');
const Message = require('../models/Message');

// Configure Resend
const resend = new Resend(process.env.RESEND_API_KEY);

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

        // Send Email Notification via Resend API
        console.log('Attempting to send email via Resend API...');

        const { data, error } = await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>', // Resend's default sender for unverified domains
            to: process.env.RECEIVER_EMAIL,
            reply_to: email,
            subject: `New Portfolio Message: ${subject}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #10b981; border-radius: 10px;">
                    <h2 style="color: #10b981;">New Inquiry from ${name}</h2>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #10b981;">
                        ${message}
                    </div>
                </div>
            `
        });

        if (error) {
            console.error('❌ RESEND API ERROR:', error.message);
        } else {
            console.log('✅ EMAIL SENT SUCCESSFULLY VIA RESEND:', data.id);
        }

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
