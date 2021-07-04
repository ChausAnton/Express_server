import { Router } from "express";

const user = require('../controllers/user.cotroller');
const router = Router();

router.get('/:id', user.getUser)

export default router;