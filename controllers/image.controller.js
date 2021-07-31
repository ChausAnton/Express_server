const Validator = require('fastest-validator');
const path = require("path");
const db = require('../models');
const User = db.User;

exports.getUserImage = async(req, res) => {
    const user = await User.findOne({where: {id: req.params.id}});

    if(user) {
        
        res.sendFile(path.join(__dirname, '/../public/img/' + user.image_path));
    }
    else {
        res.status(404).send({message: "user not found"});
    }

};