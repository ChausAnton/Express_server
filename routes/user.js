import { Router } from "express";
const user = require('../controllers/user.controller');
const router = Router();

router.get('/users', user.getUsers)

export default router;