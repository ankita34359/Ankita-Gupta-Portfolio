const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const count = await User.countDocuments();
        console.log(`Total users in database: ${count}`);

        if (count > 0) {
            const users = await User.find({}, 'username');
            console.log('Current users:', users);
        } else {
            console.log('No users found.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error checking users:', error);
        process.exit(1);
    }
};

checkUsers();
