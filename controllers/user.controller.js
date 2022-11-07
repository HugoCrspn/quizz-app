const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

// Get All Users
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

// Get Info for One User
module.exports.userInfo = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnue (user alone) : ' + req.params.id);

    UserModel.findById(req.params.id, (err, docs) =>{
        if(!err) res.send(docs);
        else console.log('ID Inconnue : ' + err);
    }).select('-password');
}

// Update User with his ID
module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnue (maj user) : ' + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    pseudo: req.body.pseudo
                }
            },
            {new: true, upsert: true, setDefaultsOnInsert: true}
        )
        .then((docs) => {return res.send(docs)})
        .catch((err) => {return res.status(500).send({message: err})})
    } catch (err) {
        return res.status(500).send({message:err});
    }
};

// Delete User
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnue (delete user) : ' + req.params.id);

    try {
        await UserModel.remove({_id: req.params.id}).exec();
        res.status(200).json({message: "Succès, l'utilisateur est supprimé"})
    } catch (err) {
        return res.status(500).send({message:err});
    }
}