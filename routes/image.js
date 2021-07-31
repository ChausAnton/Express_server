import { Router } from "express";
const image = require('../controllers/image.controller');
const router = Router();

router.get('/getUserImage/:id', image.getUserImage);
// router.delete('/deletelike/:id', like.deletelike);

export default router;