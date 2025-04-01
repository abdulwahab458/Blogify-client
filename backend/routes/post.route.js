import express from "express"
import { createPost, deletePost, featurePost, getPost, getPosts,uploadauth } from "../controllers/post.controller.js";
const router = express.Router();
router.get('/upload-auth',uploadauth)


router.get('/',getPosts)
router.get('/:slug',getPost)
router.post('/',createPost)
router.delete('/:id',deletePost)
router.patch('/feature',featurePost)
export default router