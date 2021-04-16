const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    entries: {
        type: Number,
        default: 0,
        required: true,
    }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)