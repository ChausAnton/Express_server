const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

exports.checkUser = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if(token) {
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                next();
            }
            else {
                let user = await User.findOne({ where: { id: decodedToken.id } })
                res.locals.user = user;
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}