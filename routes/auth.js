import { Router } from "express";
const auth = require('../controllers/auth.controller');
const router = Router();


router.post('/signIn', auth.signIn);

router.post('/signUp', auth.signUp);

router.post('/logout', auth.logout)

export default router;