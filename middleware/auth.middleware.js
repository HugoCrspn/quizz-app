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

// Permet d'éviter a l'utilisateur de se reconnecter a chaque fois qu'il arrive sur le site (vérification de la présence du token)
module.exports.requireAuth = (req, res, next) => {

    const token = req.cookies.jwtquizzapp;

    if (token) {
        jwt.verify(token, config.get('jwtToken'), async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.send(200).json('No token');
            } else {
                console.log(decodedToken.id);
                next();
            } 
        });
    } else {
        console.log('No token');
    }

}