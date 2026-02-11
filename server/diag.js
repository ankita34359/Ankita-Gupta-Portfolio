const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');

async function run() {
    try {
        console.log('Connecting to:', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected');

        const UserSchema = new mongoose.Schema({
            username: { type: String, required: true },
            password: { type: String, required: true }
        });

        UserSchema.pre('save', async function (next) {
            console.log('Hashing password...');
            this.password = await bcrypt.hash(this.password, 10);
            next();
        });

        const User = mongoose.models.UserTest || mongoose.model('UserTest', UserSchema);

        console.log('Creating user object...');
        const admin = new User({ username: 'admin', password: 'password123' });

        console.log('Saving user...');
        await admin.save();

        console.log('Successfully created admin user');
        process.exit(0);
    } catch (err) {
        console.error('FULL ERROR:', err);
        process.exit(1);
    }
}

run();
