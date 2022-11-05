const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        minLength: 3,
        maxLenght: 55,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    score: {
        type: [String]
    },
    picture: {
        type: String,
        default: "./uploads/profil/random-user.png"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;