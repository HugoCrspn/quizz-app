const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        default: 'Newbie 1'
    },
    score: {
        html: {
            type: Number,
            default: 0
        },
        css: {
            type: Number,
            default: 0
        },
        javascript: {
            type: Number,
            default: 0
        }
    },
    bio: {
        type: String
    },
    social: {
        twitter: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        },
        github: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const ProfileModel = mongoose.model('profile', ProfileSchema);
module.exports = ProfileModel;