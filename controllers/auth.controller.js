const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');


const maxAge = 3*21*60*60*1000;
const createToken = (id) => {
    return jwt.sign({id}, config.get('jwtToken'), { expiresIn: maxAge });
}

// Method for registration
module.exports.signUp = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res
            .status(400)
            .json({errors: errors.array()});
    }

    const {pseudo, email, password} = req.body;

    try {
        let user = await UserModel.findOne({email});

        // See if user exists
        if (user) {
            return res
                .status(400)
                .json({errors: [{msg: 'Utilisateur existe déjà'}]});
        }

        user = new UserModel({
            pseudo,
            email,
            password
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user in DB
        await user.save();

        res.json(user);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

};

// Method for login
module.exports.signIn = async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res
            .status(400)
            .json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        let user = await UserModel.findOne({email});

        if (!user) {
            return res
                .status(400)
                .json({errors: [{msg: 'Invalid Credentials'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res
                .status(400)
                .json({errors: [{msg: 'Invalid Credentials'}]});
        }

        // Return jsonwebtoken
        const token = createToken(user.id);

        // Stock token in cookie
        res.cookie('jwtquizzapp', token, {httpOnly: true, maxAge: maxAge});
        res.status(200).json({user: user.id});


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

};

// Method for logout
module.exports.logout = async (req, res) => {
    res.cookie('jwtquizzapp', '', {maxAge: 1});
    res.redirect('/');
};