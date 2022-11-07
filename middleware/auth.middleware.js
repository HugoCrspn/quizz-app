const jwt = require('jsonwebtoken');
const config = require('config');
const UserModel = require('../models/user.model');

// Test if user is connected during navigation
module.exports.checkUser = (req, res, next) => {

    const token = req.cookies.jwtquizzapp;

    if (token) {
        jwt.verify(token, config.get('jwtToken'), async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwtquizzapp', '', { maxAge: 1 });
                next();
            } else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }

}