import { Router } from "express";
import { addInterest, blockUser, createUser, followUser, removeInterest, unblockUser, unfollowUser, viewUserArticles, editBio, editCoverPhoto, editProfilePhoto, editUserName, viewProfile } from "./userController.js";
import { myMulter ,validationTypes,HME } from '../../service/clodMulter.js';

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
//////////////////////////////////////////////


router.patch('/:userId/name', editUserName);
router.patch('/:userId/profilePhoto',myMulter(validationTypes.iamge).single('profile photo'),HME, editProfilePhoto);

router.patch('/:userId/CoverPhoto',myMulter(validationTypes.iamge).single('cover photo'),HME, editCoverPhoto);

router.patch('/:userId/Bio', editBio);

///toDo:viewMyprofile OR OtherProfile to exclude email and password
router.get('/:userId/profile', viewProfile);

export default router

