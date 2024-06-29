import { Router } from 'express'

import { myMulter ,validationTypes,HME } from '../../service/clodMulter.js';
import { editBio, editCoverPhoto, editProfilePhoto, editUserName, viewProfile } from './userController.js';

const router = Router();


router.patch('/:userId/name', editUserName);
router.patch('/:userId/profilePhoto',myMulter(validationTypes.iamge).single('profile photo'),HME, editProfilePhoto);

router.patch('/:userId/CoverPhoto',myMulter(validationTypes.iamge).single('cover photo'),HME, editCoverPhoto);

router.patch('/:userId/Bio', editBio);

///toDo:viewMyprofile OR OtherProfile to exclude email and password
router.get('/:userId/profile', viewProfile);

export default router