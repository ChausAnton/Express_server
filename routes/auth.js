import { Router } from "express";
const jwt = require('jsonwebtoken');
const user = require('../controllers/auth.controller');
const router = Router();

router.post('/signIn', user.signIn);

router.post('/signUp', user.signUp);

export default router;