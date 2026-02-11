const User = require('../models/User');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET || 'your_fallback_secret_key',
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
};

// Tool to create initial admin if none exists
const createInitialAdmin = async () => {
    try {
        const count = await User.countDocuments();
        if (count === 0) {
            const admin = new User({
                username: 'admin',
                password: 'password123' // User should change this after first login
            });
            await admin.save();
            console.log('Default admin user created: admin / password123');
        }
    } catch (error) {
        console.error('Error creating default admin:', error);
    }
};

module.exports = { login, createInitialAdmin };
