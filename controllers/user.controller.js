const db = require('../models');
const User = db.User;
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.getUsers = async(req, res) => {
    res.send(res.locals.user);
};