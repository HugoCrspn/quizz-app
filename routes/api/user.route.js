const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');
const userController = require('../../controllers/user.controller');
const { check } = require('express-validator');


// Auth
router.post(
    '/register', 
    [
        check('pseudo', 'Pseudo est requis').not().isEmpty(),
        check('email', 'Ajoutez un email valide').isEmail(),
        check('password', 'Ajoutez un password de plus de 6 caractères').isLength({min: 6})
    ],
    authController.signUp
);

router.post(
    '/login', 
    [
        check('email', 'Ajoutez un email valide').isEmail(),
        check('password', 'Le mot de passe n\'existe pas').exists()
    ], 
    authController.signIn
);

router.get('/logout', authController.logout);

// CRUD User
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;