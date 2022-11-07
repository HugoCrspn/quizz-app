const ProfileModel = require('../models/profile.model');
const UserModel = require('../models/user.model');
const { validationResult } = require('express-validator');

module.exports.userProfile = async (req, res) => {
    try {
        const profile = await ProfileModel.findOne({ user: res.locals.user.id }).populate('user', ['pseudo']);
        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' })
        }
        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports.createOrUpdateUserProfile = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res
            .status(400)
            .json({errors: errors.array()});
    }

    const {company, website, location, bio, twitter, linkedin, instagram, github} = req.body;

    // Build profile object

    const profileFields = {};

    profileFields.user = res.locals.user.id

    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;

    profileFields.social = {}
    if(twitter) profileFields.social.twitter = twitter;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;
    if(github) profileFields.social.github = github;

    try {
        let profile = await ProfileModel.findOne({ user: res.locals.user.id }); 

        if(profile) {
            //Update
            profile = await ProfileModel.findOneAndUpdate({ user: res.locals.user.id }, { $set: profileFields }, { new: true });
            return res.json(profile);
        }

        // Create
        profile = new ProfileModel(profileFields);
        await profile.save();

        res.json(profile);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

}