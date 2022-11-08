const express = require('express');
const router = express.Router();
const questionController = require('../../controllers/question.controller');
const { check } = require('express-validator');

// Crud
router.post(
    '/add', 
    [
        check('question', 'Veuillez ajoutez une question').not().isEmpty(),
        check('category', 'Veuillez sélectionnez une catégorie').not().isEmpty(),
        check('difficulty', 'Veuillez choisir une difficulté').not().isEmpty(),
        check('type', 'Veuillez séléctionnez le type de la question').not().isEmpty(),
        check('correctanswer', 'Veuillez renseignez la bonne réponse').not().isEmpty(),
        check('incorrectanswers', 'Veuillez renseignez les mauvaises réponses').not().isEmpty()
    ],
    questionController.addQuestion
);

// R -> Get Questions
router.get('/', questionController.getAllQuestions);

// R -> Get Question by status
router.get('/verify', questionController.getQuestionsToGetVerify);
router.get('/accepted', questionController.getQuestionsAccepted);

// R - Get questions by Category
router.get('/:category', questionController.getQuestionsByCategory);

// U - Update question with id
router.put(
    '/update/:id',
    [
        check('question', 'Veuillez ajoutez une question').not().isEmpty(),
        check('category', 'Veuillez sélectionnez une catégorie').not().isEmpty(),
        check('difficulty', 'Veuillez choisir une difficulté').not().isEmpty(),
        check('type', 'Veuillez séléctionnez le type de la question').not().isEmpty(),
        check('correctanswer', 'Veuillez renseignez la bonne réponse').not().isEmpty(),
        check('incorrectanswers', 'Veuillez renseignez les mauvaises réponses').not().isEmpty()
    ],
    questionController.updateQuestion
);

module.exports = router;