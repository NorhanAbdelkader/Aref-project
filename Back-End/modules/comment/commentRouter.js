import { Router } from "express";
import { addComment, deleteComment, editComment, viewComment } from "./commentController.js";
import { auth } from "../../middleware/auth.js";

const router = Router()

router.post('/addcomment',auth(['Admin','User']), addComment);
router.patch('/editComment/:commentId', editComment);
router.delete('/deleteComment/:commentId', deleteComment);
router.get('/viewComment/:commentId', viewComment);


// router.patch('/reply/:commentId', replyOnComment);

export default router;