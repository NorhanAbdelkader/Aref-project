import userModel from "../../database/models/userModel.js";
import { getArticle } from "../article/articleController.js";


// TODO: delete this
export const createUser = async (req, res) => {
    try {
        const user = new userModel(req.body);
        const savedUser = await user.save();

        res.status(201).json({ message: `User created successfully`, createdUser: savedUser });
    }
    catch (error) {
        res.status(500).json(error);
    }
}
/////////////////////////////////////

// request body -> has only the user's id (the friend to be added) and the current user (who made the request)
// DONE:
export const followUser = async (req, res) => {
    try {
        const { currUserId, userId } = req.body;
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
        const { currUserId, userId } = req.body;
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
        const { currUserId, userId } = req.body;
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
            //TODO: if the user is following currentUser, remove him from his following list?
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
        const { currUserId, userId } = req.body;
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
        const { currUserId, interest } = req.body;
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
        const { currUserId, interest } = req.body;
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
        const userId = req.params.userId;
        const user = await userModel.findById(userId);

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


