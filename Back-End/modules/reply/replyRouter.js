import { Router } from "express";
import { deleteReply, editReply, replyOnComment, viewReply } from "./replyController.js";

const router = Router()

// TODO: create a reply -> post req
router.post('/createReply/:commentId', replyOnComment);
router.patch('/editReply/:replyId', editReply);
router.delete('/deleteReply/:replyId', deleteReply);
router.get('/viewReply/:replyId', viewReply);

export default router;