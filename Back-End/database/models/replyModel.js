import { Schema, model, Types } from 'mongoose';
import { arabicTextValidator } from './articleModel.js';

const replySchema = Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
    ,
    content: {
        type: String,
        required: true,
        minlength: [3, 'عدد الحروف يجب ألا يقل عن ٣ حرف'],
        maxlength: [500, 'عدد الحروف يجب ألا يزيد عن ٥٠٠ حرف'],
        validate: arabicTextValidator
    }
    ,
    commentId: {
        type: Types.ObjectId,
        ref: 'Comment',
        required: true
    }
}
, 
{
    timestamps: true
}
)

const replyModel = model('Reply', replySchema);

export default replyModel;
