const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    timezone: {
        type: String,
        default: 'UTC'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Optional: Ensure email is indexed
UserSchema.index({ email: 1 });

module.exports = mongoose.model('User', UserSchema);
