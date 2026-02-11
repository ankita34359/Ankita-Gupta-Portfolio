const mongoose = require('mongoose');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const bcrypt = require('bcryptjs');
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
const User = mongoose.model('UserTemp', UserSchema, 'users');

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected');
        await User.deleteMany({ username: 'admin' });
        const admin = new User({ username: 'admin', password: 'password123' });
        await admin.save();
        console.log('SUCCESS: admin / password123');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};
run();
