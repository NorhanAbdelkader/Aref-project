import { Router } from "express";
import { addFriend, addInterest, blockUser, createUser, removeInterest, unblockUser, unfriendUser, viewUserArticles } from "./userController.js";

const router = Router();

router.patch('/addFriend', addFriend);
router.patch('/unfriendUser', unfriendUser);

router.patch('/blockUser', blockUser);
router.patch('/unblockUser', unblockUser);

router.patch('/addInterest', addInterest);
router.patch('/removeInterest', removeInterest);

router.get('/viewUserArticles/:userId', viewUserArticles);

// TODO: delete this
router.post('/createUser', createUser);

export default router;