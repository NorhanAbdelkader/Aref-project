import commentModel from "../../database/models/commentModel.js";
import replyModel from "../../database/models/replyModel.js";


// TODO: Check reply

export const replyOnComment = async(req, res) => {
    const userId  = req.user._id;
    const { content } = req.body;
    const commentId = req.params.commentId;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }
    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    const user = await userModel.findById(userId);
    if (!user) {
        res.status(400).json({ error: 'User not found, ensure the user id is correct' });
    }

    try {
        const comment = await commentModel.findById(commentId);
        if (!comment) {
            res.status(400).json({ error: 'Comment not found, ensure the comment id is correct' });
        }
        const newReply = new replyModel({userId, content, commentId});
        const savedReply = await newReply.save();

        await comment.updateOne({$addToSet: { replies: savedReply._id }});

        res.status(201).json(savedReply);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

export const editReply = async(req, res) => {
    try {
        const reply = await replyModel.findById(req.params.replyId);
        if (!reply) {
            res.status(400).json({ error: 'Reply not found, ensure the reply id is correct' });
        }
        if (reply.userId === req.user._id) {
            await reply.updateOne({ content: req.body.content });
            res.status(201).json({ message: 'Reply edited successfully' });
        }
        else {
            res.status(403).json({ error: 'You can edit only your own replies' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}

export const deleteReply = async(req, res) => {
    try {
        const replyId = req.params.replyId;
        const reply = await replyModel.findById(replyId);
        if (!reply) {
            res.status(400).json({ error: 'Reply not found, ensure the reply id is correct' })
        }
        // DONE: check the the user ID to be sent in the body of the request
        if (reply.userId === req.user._id) {
            
            const comment = await commentModel.findById(reply.commentId);

            if (!comment) {
                res.status(400).json({ error: 'Comment not found, ensure the comment id is correct' })
            }
            

            await comment.updateOne({ $pull: { replies: replyId } });
            await reply.deleteOne();

            res.status(201).json({ message: 'Reply deleted successfully' });
        }
        else {
            res.status(403).json({ error: 'You can delete only your own replies' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}

export const viewReply = async(req, res) => {
    try {
        const viewedReply = await replyModel.findById(req.params.replyId);
        if (!viewedReply) {
            return res.status(400).json({ error: 'Reply not found, ensure the reply id is correct' });
        }
        res.status(200).json(viewedReply);
    }
    catch (error) {
        res.status(500).json(error);
    }
}