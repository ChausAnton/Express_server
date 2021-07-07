const db = require('../models');
const Validator  = require('fastest-validator');
const User = db.User;
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.getUser = async(req, res) => {
    User.findOne({ attributes: {
            exclude: ['password', 'token', 'password_reset_token']
        }
    }, {where: {id: req.params.id}}).then((user) => {
        res.send(user);
    })
};

exports.getUsers = async(req, res) => {
    if(!res.locals.admin) {
        return res.status(401).send("Only andmin can see all users");
    }
    User.findAll({ attributes: {
            exclude: ['password', 'token', 'password_reset_token']
        }
    }).then((users) => {
        res.send(users);
    })
}

exports.updateUser = async(req, res) => {
    // const schema = {
    //     role: { type: "string", option: true, enum: [ "user", "admin" ] },
    //     real_name: {type: "string", option: true, max: "100"},
    //     image_path: {type: "string", option: true, max: "100"}
    // }

    // let data = {
    //     role: req.body.role,
    //     real_name: req.body.real_name,
    //     image_path: req.body.image_path
    // }

    // const v = new Validator();
    // const validationresponse = v.validate(data, schema);
    // if(validationresponse !== true) {
    //     return res.status(400).json({
    //         message: "Validation fail",
    //         errors: validationresponse
    //     });
    // }

    if(res.locals.admin) {

        User.update({role: req.body.role}, {where: {id: req.params.id}}).then(() => {
            res.status(201).send("role updated");
        })

    }
    if(res.locals.user && res.locals.user.id == req.params.id) {
        
        User.update({image_path: req.body.image_path, real_name: req.body.real_name}, {where: {id: req.params.id}}).then(() => {
            res.status(201).send("data updated");
        })

    }
}

exports.deleteUser = async(req, res) => {
    if(!res.locals.admin) {
        return res.status(401).send("Only andmin can delete user");
    }
    User.destroy({where: {id: req.params.id}}).then(() => {
        res.status(200).send("result");
    })
}