const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.middleware');
const profileController = require('../../controllers/profile.controller');
const { check } = require('express-validator');

// Get current users profile
router.get('/me', auth.checkUser, profileController.userProfile);
router.post('/', auth.checkUser, profileController.createOrUpdateUserProfile);
router.get('/', profileController.getAllProfiles);
router.get('/user/:userid', profileController.getProfileWithUserId);
router.delete('/', auth.checkUser, profileController.deleteProfileAndUser);
router.put('/score', auth.checkUser, profileController.updateScore);

module.exports = router;