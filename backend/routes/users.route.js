import express from "express"
import { getuserSavedPosts, savePosts } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/saved",getuserSavedPosts)
router.patch("/save",savePosts)
export default router