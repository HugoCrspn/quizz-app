const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    correctanswer: {
        type: String,
        required: true
    },
    incorrectanswers: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        default: 'verify'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const QuestionModel = mongoose.model('question', QuestionSchema);
module.exports = QuestionModel;