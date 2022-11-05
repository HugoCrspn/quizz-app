const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');
const { check } = require('express-validator');

router.post('/register', [
    check('pseudo', 'Pseudo est requis').not().isEmpty(),
    check('email', 'Ajoutez un email valide').isEmail(),
    check('password', 'Ajoutez un password de plus de 6 caractères').isLength({min: 6})
], authController.signUp);

module.exports = router;