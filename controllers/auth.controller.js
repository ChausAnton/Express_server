require('dotenv').config()
const Validator  = require('fastest-validator');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");
const db = require('../models');
const User = db.User;

exports.signUp = async(req, res) => {
    let user = User.findAll({where: 
        {[Op.or]: [
            {login: req.body.login}, 
            {email: req.body.email}
        ]
    }}).then(user => {
        if(user.length) {
            return res.status(400).send("User already exist");
        }
        const schema = {
            login: {type: "string", option: false, max: "100"},
            real_name: {type: "string", option: false, max: "100"},
            email: {type: "email"},
            password: { type: "string", min: 3 },
            passwordConfirmation: { type: "equal", field: "password" },
            role: { type: "string", enum: [ "user", "admin" ] },
        }
    
        let data = {
            login: req.body.login,
            real_name: req.body.real_name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation,
            role: req.body.role,
            image_path: "standart path",
            rating: 0
        }

        const v = new Validator();
        const validationresponse = v.validate(data, schema);
        if(validationresponse !== true) {
            return res.status(400).json({
                message: "Validation fail",
                errors: validationresponse
            });
        }

        data.password = bcrypt.hashSync(req.body.password, 8)
        User.create(data);
        console.log(user)
        res.status(200).send({
            message: "User created",
        });
    });
    
}

exports.signIn = async(req, res) => {
    let user = User.findOne({where: {login: req.body.login}}).then(user => {
        if(!user) {
            return res.status(404).send({message: "User not found"});
        };
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password"
            });
        };

        var token = jwt.sign({id: user.id}, process.env.SECRET, {
            expiresIn: 86400
        });

        res.status(200).send({
            id: user.id,
            login: user.login,
            real_name: user.real_name,
            email: user.email,
            role: user.role,
            rating: user.rating,
            accessToken: token
        })
    })
};