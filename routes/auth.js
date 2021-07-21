import { Router } from "express";
const auth = require('../controllers/auth.controller');
const router = Router();


router.post('/signIn', auth.signIn);

router.post('/signUp', auth.signUp);

router.post('/logout', auth.logout)

router.get('/resetPassword', auth.resetPassword)

router.get('/requestForPasswordReset', auth.requestForPasswordReset)

export default router;