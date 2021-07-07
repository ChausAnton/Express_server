import { Router } from "express";
const user = require('../controllers/user.controller');
const router = Router();

router.get('/GetUser/:id', user.getUser)
router.get('/users', user.getUsers)
router.delete('/delete/:id', user.deleteUser)
router.put('/update/:id', user.updateUser)

export default router;