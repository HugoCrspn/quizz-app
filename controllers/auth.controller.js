const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

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

        // TODO
        // Return jsonwebtoken

        return res.send('Utilisateur enregistré');
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }


    res.send('User route')
};