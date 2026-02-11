const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await User.deleteMany({ username: 'admin' }); // Clean start

        const admin = new User({
            username: 'admin',
            password: 'password123'
        });

        await admin.save();
        console.log('Admin user created successfully: admin / password123');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
