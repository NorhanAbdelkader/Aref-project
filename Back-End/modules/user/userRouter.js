import { Router } from "express";
import { addInterest, blockUser, createUser, followUser, removeInterest, unblockUser, unfollowUser, viewUserArticles } from "./userController.js";

const router = Router();

router.patch('/followUser', followUser);
router.patch('/unfollowUser', unfollowUser);

router.patch('/blockUser', blockUser);
router.patch('/unblockUser', unblockUser);

router.patch('/addInterest', addInterest);
router.patch('/removeInterest', removeInterest);

router.get('/viewUserArticles/:userId', viewUserArticles);

// TODO: delete this
router.post('/createUser', createUser);

export default router;