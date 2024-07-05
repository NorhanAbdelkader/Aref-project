import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userModel from '../../database/models/userModel.js';
import Token from '../../database/models/emailTokenModel.js';
import { validateRegisterUser, validateLoginUser } from "./userValidation.js";
import { getArticle } from "../article/articleController.js";
import cloudinary from "../../services/cloudinary.js";
import {sendEmail} from '../../utils/emailVerification.js'


//register
export const register = async (req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(404).send(error.details[0].message);
    }
    let UserRegistered = await userModel.findOne({ email: req.body.email })
    if (UserRegistered) {// && UserRegistered.verified) {

        return res.status(404).send("User already have an account");
    }
    const user = new userModel({
        name: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        },
        email: req.body.email,
        password: req.body.password,

    });
    try {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        await user.save();
        //const token = jwt.sign({ _id: user._id, role: user.role }, "privateKey")
        //res.header('auth-token', token).send(user)
    //     const token = await new Token({
    //         userId: user._id,
    //         token: jwt.sign({ email: user.email, _id: user._id }, process.env.SECRETKEY, { expiresIn: "1h" })
    //     }).save();
    //     const url = `http://localhost:${process.env.PORT}/${user.id}/verify/${token.token}`
    //     const subject = " Please Verify Email";
    //     const message = `
    //   <h3>Hello ${(user.name).firstName} ${(user.name).firstName}</h3>
    //   <p>Thanks yor for registering for our services.</p>
    //   <p>Click this link <a href="${url}">here</a> to verify your email</p>
    // `;
    //     try {
    //         await sendEmail(user.email, subject, message);
    //     }
    //     catch {
    //         res.status(404).send({ message: "error sending email" })
    //     }
    //     res.status(201).send({ message: "An Email sent to your account please" });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }

}

// Login with an existing user
export const login = async (req, res) => {
    const { error } = validateLoginUser(req.body)
    if (error) {
        return res.status(404).send(error.details[0].message);
    }
    let user = await userModel.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).send("Invalid email ");
    }

    const checkPassword = bcrypt.compare(req.body.password, user.password)

    if (!checkPassword) {
        return res.status(404).send("Invalid  password");
    }
    // if(!user.verified){
    //     return res.status(403).send({ message: "Verify your Account." });
    //   };
    const  accesstoken = jwt.sign({ _id: user._id, role: user.role }, "privateKey");
    return res.status(200).json( { message:" done", accesstoken, user } );

};
export const deleteAccount=async(req,res)=>{
    let user = await userModel.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).send("Invalid email ");
    }
    const checkPassword = bcrypt.compare(req.body.password, user.password)
    if (!checkPassword) {
        return res.status(404).send("Invalid  password");
    }
    await userModel.findByIdAndUpdate(user._id)
}
// request body -> has only the user's id (the friend to be added) and the current user (who made the request)
// DONE:
export const followUser = async (req, res) => {
    try {
        const currUserId  = req.user._id;
        const { userId } = req.body;
        if (!currUserId) {
            return res.status(400).json({ error: 'Current user id required' });
        }
        if (!userId) {
            return res.status(400).json({ error: 'User id required to be added' });
        }
        const currentUser = await userModel.findById(currUserId);
        const user = await userModel.findById(userId);

        if (!currentUser) {
            return res.status(400).json({ error: 'Current user not found' });
        }
        if (!user) {
            return res.status(400).json({ error: 'User to be added not found' });
        }

        if (currentUser.followingList.includes(userId)) {
            res.status(400).json({ message: 'This user is already in your followingList list' });
        }

        else if (currentUser.blockList.includes(userId)) {
            res.status(400).json({ message: 'You can not follow this user as you blocked him, unblock first to follow' });
        }

        else if (user.blockList.includes(currUserId)) {
            res.status(400).json({ message: 'You can not follow this user as you are in his block list' });
        }

        else {
            await currentUser.updateOne({ $addToSet: { followingList: userId } });

            res.status(201).json({ message: 'User followed successfully' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}
// unfollow user 
// DONE:
export const unfollowUser = async (req, res) => {
    try {
        const currUserId  = req.user._id;
        const { userId } = req.body;
        if (!currUserId) {
            return res.status(400).json({ error: 'Current user id required' });
        }
        if (!userId) {
            return res.status(400).json({ error: 'Followed user id required to be removed' });
        }
        const currentUser = await userModel.findById(currUserId);
        const user = await userModel.findById(userId);

        if (!currentUser) {
            return res.status(400).json({ error: 'Current user not found' });
        }
        if (!user) {
            return res.status(400).json({ error: 'Followed user to be removed not found' });
        }

        if (!currentUser.followingList.includes(userId)) {
            res.status(400).json({ message: 'User is not in your followingList list' });
        }
        else {
            await currentUser.updateOne({ $pull: { followingList: userId } });

            res.status(201).json({ message: 'User removed from followingList list successfully' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}

// DONE:
export const blockUser = async (req, res) => {
    try {
        const currUserId  = req.user._id;
        const { userId } = req.body;
        if (!currUserId) {
            return res.status(400).json({ error: 'Current user id required' });
        }
        if (!userId) {
            return res.status(400).json({ error: 'User id required to be blocked' });
        }
        const currentUser = await userModel.findById(currUserId);
        const user = await userModel.findById(userId);

        if (!currentUser) {
            return res.status(400).json({ error: 'Current user not found' });
        }
        if (!user) {
            return res.status(400).json({ error: 'Friend user to be added not found' });
        }

        if (currentUser.blockList.includes(userId)) {
            res.status(400).json({ message: 'User is already blocked' });
        }
        else {
            await currentUser.updateOne({ $addToSet: { blockList: userId }, $pull: { followingList: userId } });
            await user.updateOne({ $pull: { followingList: currUserId } });

            res.status(201).json({ message: 'User blocked successfully' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}

// unblock user
// DONE:
export const unblockUser = async (req, res) => {
    try {
        const currUserId  = req.user._id;
        const { userId } = req.body;
        if (!currUserId) {
            return res.status(400).json({ error: 'Current user id required' });
        }
        if (!userId) {
            return res.status(400).json({ error: 'Blockes user id required' });
        }
        const currentUser = await userModel.findById(currUserId);
        const user = await userModel.findById(userId);

        if (!currentUser) {
            return res.status(400).json({ error: 'Current user not found' });
        }
        if (!user) {
            return res.status(400).json({ error: 'Blocked user not found' });
        }

        if (!currentUser.blockList.includes(userId)) {
            res.status(400).json({ message: 'User is not blocked' });
        }
        else {
            await currentUser.updateOne({ $pull: { blockList: userId } });

            res.status(201).json({ message: 'User removed from block list successfully' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}

// DONE:
export const addInterest = async (req, res) => {
    try {
        const currUserId  = req.user._id;
        const { interest } = req.body;
        if (!currUserId) {
            return res.status(400).json({ error: 'Current user id required' });
        }
        if (!interest) {
            return res.status(400).json({ error: 'Interest required' });
        }

        const currentUser = await userModel.findById(currUserId);

        if (!currentUser) {
            return res.status(400).json({ error: 'Current user not found' });
        }

        if (currentUser.interests.includes(interest)) {
            res.status(400).json({ message: 'Interest is already added' });
        }
        else {
            await currentUser.updateOne({ $addToSet: { interests: interest } });
            res.status(201).json({ message: 'User interest added successfully' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}

// DONE:
export const removeInterest = async (req, res) => {
    try {
        const currUserId  = req.user._id;
        const { interest } = req.body;
        if (!currUserId) {
            return res.status(400).json({ error: 'Current user id required' });
        }
        if (!interest) {
            return res.status(400).json({ error: 'Interest required' });
        }

        const currentUser = await userModel.findById(currUserId);

        if (!currentUser) {
            return res.status(400).json({ error: 'Current user not found' });
        }

        if (!currentUser.interests.includes(interest)) {
            res.status(400).json({ message: 'Interest is not found' });
        }
        else {
            await currentUser.updateOne({ $pull: { interests: interest } });
            res.status(201).json({ message: 'User interest removed successfully' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}

// DONE:
export const viewUserArticles = async (req, res) => {
    try {

        const user = await userModel.findById(req.params.userId);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        let article;
        let articleId;
        const articles = [];

        for (articleId of user.articles) {
            article = await getArticle(articleId);
            if (!article) {
                continue;
            }
            articles.push(article);
        }

        res.status(200).json(articles);

    }
    catch (error) {
        res.status(500).json(error);
    }
}

export const editUserName = async (req, res) => {
    try {
        const userId  = req.user._id;

        const { lastName, firstName } = req.body

        const user = await userModel.findById(userId)
        if (!user) {
            res.json({ message: "user not found" })
        }
        const updatedUser = await userModel.findByIdAndUpdate(userId, { 'name.firstName': firstName, 'name.lastName': lastName }, { new: true })
        res.json({ message: "'Name updated successfully'", updatedUser })
    } catch (error) {
        res.json({ message: "catch error", error })
    }

}
export const editBio = async (req, res) => {
    try {
        const userId  = req.user._id;

        const { bio } = req.body
           
        console.log(bio)
        const user = await userModel.findById(userId)
        if (!user) {
            res.json({ message: "user not found" })
        }
        const updatedUser = await userModel.findByIdAndUpdate(userId, { 'bio': bio }, { new: true })
        res.json({ message: "'Bio updated successfully'", updatedUser })
    } catch (error) {
        res.json({ message: "catch error", error })
    }

}
export const editProfilePhoto = async (req, res) => {

    try {
        const userId  = req.user._id;


        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a photo.' });
        }

        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: `Aref/users/${userId}`
        })

        const user = await userModel.findByIdAndUpdate(
            userId,
            { profilePhoto: secure_url },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ message: 'Profile photo updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};
export const editCoverPhoto = async (req, res) => {
    try {
        const userId  = req.user._id;

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a photo.' });
        }

        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: `Aref/users/${userId}`
        })

        const user = await userModel.findByIdAndUpdate(
            userId,
            { coverPhoto: secure_url },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ message: 'cover photo updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }

}
export const viewProfile = async (req, res) => {
    try {
        let { userId } = req.params
        if(!userId){
            userId=req.user._id;
        }

        const user = await userModel.findById(userId).select("-articles")

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
          console.log(user)
        res.json({ message: "done", user })
    } catch (error) {
        res.json({ message: "catch error", error })
    }

}

// to add admin users
export const createAdminUser = async (req, res) => {

    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(404).send(error.details[0].message);
    }
    let UserRegistered = await userModel.findOne({ email: req.body.email })
    if (UserRegistered) {

        return res.status(404).send("User already have an account");
    }
    const user = new userModel({
        name: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        },
        email: req.body.email,
        password: req.body.password,
        role: "Admin"
    });
    try {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }

}
