import articleModel from "../../database/models/articleModel.js";
import commentModel from "../../database/models/commentModel.js";

// content, articleId, userId, replies
// add DONE:
export const addComment = async(req, res) => {
    const {articleId, content, userId} = req.body;
    
    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }
    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }
    if (!articleId) {
        return res.status(400).json({ error: 'articleId is required' });
    }
    
    // TODO: Check if the userId exists
    // const user = await userModel.findById(userId);

    // if (!user) {
    //     // bad request
    //     res.status(400).json({ error: 'User not found, ensure the user id is correct' })'
    // }


    try
    {
        const article = await articleModel.findById(articleId);

        if (!article) {
            res.status(400).json({ error: 'Article not found, ensure the article id is correct' })
        }
        
        const newComment = new commentModel(req.body);
        const savedComment = await newComment.save();

        await article.updateOne({$addToSet: { comments: savedComment._id }});

        res.status(201).json(savedComment);
    } 
    catch (error) {
        res.status(500).json(error);
    }
}

// edit DONE:
export const editComment = async(req, res) => {
    try {
        const comment = await commentModel.findById(req.params.commentId);

        if (!comment) {
            res.status(400).json({ error: 'Comment not found, ensure the comment id is correct' });
        }
        if (comment.userId === req.body.userId) {
            await comment.updateOne({ content: req.body.content });
            res.status(201).json({ message: 'Comment edited successfully' });
        }
        else {
            res.status(403).json({ error: 'You can edit only your own comments' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}

// delete DONE:
export const deleteComment = async(req, res) => {
    try {
        const commentId = req.params.commentId;
        const comment = await commentModel.findById(commentId);
        if (!comment) {
            res.status(400).json({ error: 'Comment not found, ensure the comment id is correct' })
        }
        // TODO: check the the user ID to be sent in the body of the request
        if (comment.userId === req.body.userId) {
            
            const article = await articleModel.findById(comment.articleId);

            if (!article) {
                res.status(400).json({ error: 'Article not found, ensure the article id is correct' })
            }
            

            await article.updateOne({ $pull: { comments: commentId } });
            await comment.deleteOne();

            res.status(201).json({ message: 'Comment deleted successfully' });
        }
        else {
            res.status(403).json({ error: 'You can delete only your own comments' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}

// view DONE:
export const viewComment = async(req, res) => {
    try {
        const viewedComment = await commentModel.findById(req.params.commentId).populate('replies');
        if (!viewedComment) {
            return res.status(400).json({ error: 'Comment not found, ensure the comment id is correct' });
        }
        res.status(200).json(viewedComment);
    }
    catch (error) {
        res.status(500).json(error);
    }
}