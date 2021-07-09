import { Router } from "express";
const jwt = require('jsonwebtoken');
const auth = require('../controllers/auth.controller');
const router = Router();


router.post('/signIn', auth.signIn);

router.post('/signUp', auth.signUp);

router.post('/logout/:id', auth.logout)

export default router;