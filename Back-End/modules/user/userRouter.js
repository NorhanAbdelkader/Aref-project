import { Router } from "express";
import { addInterest, blockUser, followUser, removeInterest, unblockUser, unfollowUser, viewUserArticles, editBio, editCoverPhoto, editProfilePhoto, editUserName, viewProfile, register, login,deleteAccount, createAdminUser } from "./userController.js";
import { myMulter ,fileValidation,HME } from '../../services/multer.js';
import { auth } from "../../middleware/auth.js";
import {confirmEmail} from '../../utils/emailVerification.js'
const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/deleteAccount',deleteAccount);
router.get("/:userId/verify/:token", confirmEmail)

router.patch('/followUser',auth(['Admin','User']), followUser);
router.patch('/unfollowUser',auth(['Admin','User']), unfollowUser);

router.patch('/blockUser',auth(['Admin','User']), blockUser);
router.patch('/unblockUser',auth(['Admin','User']), unblockUser);

router.patch('/addInterest',auth(['Admin','User']), addInterest);
router.patch('/removeInterest',auth(['Admin','User']), removeInterest);

router.get('/viewUserArticles/:userId',auth(['Admin','User']), viewUserArticles);

router.patch('/name',auth(['Admin','User']), editUserName);
router.patch('/profilePhoto',myMulter(fileValidation.image).single('profile photo'),HME,auth(['Admin','User']), editProfilePhoto);

router.patch('/CoverPhoto',myMulter(fileValidation.image).single('cover photo'),HME,auth(['Admin','User']), editCoverPhoto);

router.patch('/Bio',auth(['Admin','User']), editBio);

///toDo:viewMyprofile OR OtherProfile to exclude email and password

router.get('/profile',auth(['Admin','User']), viewProfile);

router.get('/profile/:userId',auth(['Admin','User']), viewProfile);

// TODO: for admins only
router.post('/admin/createAdminUser', auth(['Admin']), createAdminUser);

export default router

