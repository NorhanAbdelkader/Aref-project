import commentModel from "../../database/models/commentModel.js";

// content, articleId, userId, replies
// add
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
    
    const newComment = new commentModel(req.body);
    try
    {
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } 
    catch (error) {
        res.status(500).json(error);
    }
}

// edit
export const editComment = async(req, res) => {
    try {
        const comment = await commentModel.findById(req.params.commentId);

        if (!comment) {
            res.status(400).json('Comment not found, ensure the comment id is correct');
        }
        if (comment.userId === req.body.userId) {
            await comment.updateOne({content: req.body.content});
            res.status(201).json({message: 'Comment edited successfully'});
        }
        else {
            res.status(403).json('You can edit only your own comments');
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}

// delete
export const deleteComment = async(req, res) => {
    try {
        const comment = await commentModel.findById(req.params.commentId);
        if (!comment) {
            res.status(400).json('Comment not found, ensure the comment id is correct')
        }
        // TODO: check the the user ID to be sent in the body of the request
        if (comment.userId === req.body.userId) {
            await article.deleteOne();
            res.status(201).json({message: 'Comment deleted successfully'});
        }
        else {
            res.status(403).json('You can delete only your own comments');
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}

// TODO: reply
export const replyOnComment = async(req, res) => {
    try {
        
    }
    catch (error) {
        res.status(500).json(error);
    }
}