const db = require('../models');
const User = db.User;

exports.getUser = async(req, res) => {
    res.send({
        message: 'This is working'
    });
};