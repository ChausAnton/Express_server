import { Router } from "express";
const post = require('../controllers/post.controller');
const router = Router();

router.get('/getPost/:id', post.getPost);
router.get('/getPosts', post.getPosts);
router.get('/getPostDateFilter', post.getPostDateFilter);
router.post('/createPost', post.createPost);
router.put('/updatePost/:id', post.updatePost);
router.delete('/deletePost/:id', post.deletePost);

export default router;