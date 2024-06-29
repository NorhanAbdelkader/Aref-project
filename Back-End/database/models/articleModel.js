import { Schema, model, Types } from 'mongoose';

const arabicTextValidator = {
    
    validator: (value) => {
        // regex to check arabic letters
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        return isArabic.test(value);
    },
    message: 'يجب أن تكون الكتابة باللغة العربية فقط'

}

const numImagesValidator = {
    validator: (array) => {
        return array.length <= 4;
    },
    message: 'يجب ألا تزيد عدد الصور عن ٤ صور'
}

// id, userid, content, images, likes_num, dislikes_num, comments, reports_num
const articleSchema = new Schema ({
    userId: {
        // TODO: return this
        type: Types.ObjectId,
        ref: 'User',
        // type: Number,
        // required: true
    }
    ,
    content: {
        type: String,
        required: true,
        minlength: [25, 'عدد الحروف يجب ألا يقل عن ٢٥ حرف'],
        maxlength: [5000, 'عدد الحروف يجب ألا يزيد عن ٥٠٠٠ حرف'],
        validate: arabicTextValidator
    }
    ,
    images: {
        type: [String],
        validate: numImagesValidator
    }
    ,
    publicImagesId: {
        type: [String]
    }
    ,
    likesNum: {
        type: Number,
        default: 0,
        min: 0
    }
    ,
    dislikesNum: {
        type: Number,
        default: 0,
        min: 0
    }
    ,
    reportsNum: {
        type: Number,
        default: 0,
        min: 0
    }
    ,
    likedUsers: {
        // TODO:
        type: [Types.ObjectId],
        ref: 'User',
        default: []
        // type: [Number],
        // default: []
    }
    ,
    dislikedUsers: {
        // TODO:
        type: [Types.ObjectId],
        ref: 'User',
        default: []
        // type: [Number],
        // default: []
    }
    ,
    reportedUsers: {
        // TODO:
        type: [Types.ObjectId],
        ref: 'User',
        default: []
        // type: [Number],
        // default: []
    }
    ,
    comments: {
        type: [Types.ObjectId],
        ref: 'Comment',
        default: []
    }
}, 
{
    timestamps: true
}
)

const articleModel = model('Article', articleSchema)

export default articleModel
export {arabicTextValidator}
