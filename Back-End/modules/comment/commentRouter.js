import { Router } from "express";
import { addComment, deleteComment, editComment, replyOnComment } from "./commentController.js";

const router = Router()

router.post('/addcomment', addComment);
router.patch('/editComment/:commentId', editComment);
router.delete('/deleteComment', deleteComment);
// TODO:
router.patch('/reply/:commentId', replyOnComment);

export default router;