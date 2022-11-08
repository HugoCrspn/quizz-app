const QuestionModel = require('../models/question.model');
const { validationResult } = require('express-validator');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.addQuestion = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res
            .status(400)
            .json({errors: errors.array()});
    }

    const {question, category, type, difficulty, correctanswer, incorrectanswers} = req.body;

    // Build question object
    const questionFields = {};

    if(question) questionFields.question = question;
    if(category) questionFields.category = category;
    if(type) questionFields.type = type;
    if(difficulty) questionFields.difficulty = difficulty;
    if(correctanswer) questionFields.correctanswer = correctanswer;
    if(incorrectanswers) {
        questionFields.incorrectanswers = incorrectanswers.split(',').map(answer => answer.trim());
    }

    try {
        let question = new QuestionModel(questionFields);
        await question.save();
        res.json(question);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error'});
    }

}

// Get all questions
module.exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await QuestionModel.find();
        res.status(200).json(questions);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error'});
    }
}

// Get all questions with status : verify
module.exports.getQuestionsToGetVerify = async (req, res) => {
    try {
        const questions = await QuestionModel.find({ status: "verify"});
        res.status(200).json(questions);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error'});
    }
}

// Get all questions with status : accepted
module.exports.getQuestionsAccepted = async (req, res) => {
    try {
        const questions = await QuestionModel.find({ status: "accepted"});
        res.status(200).json(questions);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error'});
    }
}

// Get all questions by category
module.exports.getQuestionsByCategory = async (req, res) => {
    try {
        const questions = await QuestionModel.find({ category: req.params.category});
        res.status(200).json(questions);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error'});
    }
}

// Update question with id
module.exports.updateQuestion = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnue : ' + req.params.id);

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res
            .status(400)
            .json({errors: errors.array()});
    }

    try {
        const {question, category, type, difficulty, correctanswer, incorrectanswers} = req.body;
        
        // Build question object
        const questionFields = {};

        if(question) questionFields.question = question;
        if(category) questionFields.category = category;
        if(type) questionFields.type = type;
        if(difficulty) questionFields.difficulty = difficulty;
        if(correctanswer) questionFields.correctanswer = correctanswer;
        if(incorrectanswers) {
            questionFields.incorrectanswers = incorrectanswers.split(',').map(answer => answer.trim());
        }

        const questionUpdate = await QuestionModel.findOneAndUpdate({ id: req.params.id}, { $set: questionFields}, { new: true });
        return res.json(questionUpdate);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error'});
    }
}