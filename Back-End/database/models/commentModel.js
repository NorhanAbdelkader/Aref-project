import { Schema, model, Types } from 'mongoose';
import { arabicTextValidator } from './articleModel.js';

// content, articleId, userId
// TODO: add reply
const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        minlength: [3, 'عدد الحروف يجب ألا يقل عن ٣ حرف'],
        maxlength: [500, 'عدد الحروف يجب ألا يزيد عن ٥٠٠ حرف'],
        validate: arabicTextValidator
    }
    ,
    userId: {
        // TODO: return this
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
    ,
    articleId: {
        type: Types.ObjectId,
        ref: 'Article',
        required: true
    }
    ,
    replies: {
        type: [Types.ObjectId],
        ref: 'Reply',
        default: []
    }
}, 
{
    timestamps: true
}
)

const commentModel = model('Comment', commentSchema);

export default commentModel;