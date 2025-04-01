import express from "express"
import { addComments, deleteComments, getPostComments } from "../controllers/comment.controller.js";
const router = express.Router();

router.get("/:postId",getPostComments)
router.post("/:postId",addComments)
router.delete("/:id",deleteComments)
export default router