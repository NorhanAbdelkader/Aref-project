import { Router } from "express";
import { addComment, deleteComment, editComment, viewComment } from "./commentController.js";

const router = Router()

router.post('/addcomment', addComment);
router.patch('/editComment/:commentId', editComment);
router.delete('/deleteComment/:commentId', deleteComment);
router.get('/viewComment/:commentId', viewComment);


// router.patch('/reply/:commentId', replyOnComment);

export default router;