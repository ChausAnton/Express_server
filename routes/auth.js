import { Router } from "express";
const auth = require('../controllers/auth.controller');
const router = Router();
const db = require('../models');
const User = db.User;


router.post('/signIn', auth.signIn);

router.post('/signUp', auth.signUp);

router.post('/logout', auth.logout)

router.post('/resetPassword', auth.resetPassword)

router.get('/requestForPasswordReset', auth.requestForPasswordReset)

router.get('/PasswordReset', async(req, res) => {
    res.render('resetPassword', {token: req.param('token') ,userid: req.param('id')});
});

export default router;