import { Router } from "express";
import { addInterest, blockUser, followUser, removeInterest, unblockUser, unfollowUser, viewUserArticles, editBio, editCoverPhoto, editProfilePhoto, editUserName, viewProfile, register, login } from "./userController.js";
import { myMulter ,fileValidation,HME } from '../../services/multer.js';
import { auth } from "../../middleware/auth.js";

const router = Router();

router.patch('/followUser', followUser);
router.patch('/unfollowUser', unfollowUser);

router.patch('/blockUser', blockUser);
router.patch('/unblockUser', unblockUser);

router.patch('/addInterest',auth(['Admin','User']), addInterest);
router.patch('/removeInterest',auth(['Admin','User']), removeInterest);

router.get('/viewUserArticles/:userId', viewUserArticles);

router.post('/register', register);
router.post('/login', login);

router.patch('/name',auth(['Admin','User']), editUserName);
router.patch('/profilePhoto',myMulter(fileValidation.image).single('profile photo'),HME,auth(['Admin','User']), editProfilePhoto);

router.patch('/CoverPhoto',myMulter(fileValidation.image).single('cover photo'),HME,auth(['Admin','User']), editCoverPhoto);

router.patch('/Bio',auth(['Admin','User']), editBio);

///toDo:viewMyprofile OR OtherProfile to exclude email and password

router.get('/profile',auth(['Admin','User']), viewProfile);

router.get('/profile/:userId',auth(['Admin','User']), viewProfile);



export default router

