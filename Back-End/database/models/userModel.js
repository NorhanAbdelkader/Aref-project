import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            firstName: {
                type: String,
                required: [true, "يجب ادخال الاسم الأول"]
            },
            lastName: {
                type: String,
                required: [true, "يجب ادخال الاسم الأخير"]
            }
        },
        email: {
            type: String,
            required: [true, "يجب ادخال البريد الإلكتروني"],
            unique: [true, "البريد الإلكتروني مُسجل به مُسبقًا"],
            match: [/.+\@.+\..+/, "من فضلك أدخل بريد إلكتروني صحيح"],
        },
        password: {
            type: String,
            required: [true, "يجب ادخال كلمة المرور"],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        profilePhoto: {
            data: Buffer,
            contentType: String
        },
        coverPhoto: {
            data: Buffer,
            contentType: String,
        },
        bio: {
            type: String,
        },
        interests: {
            type: [String],
            // Added
            enum: ['رواية', 'خيالي', 'علوم', 'واقعي', 'ديني', 'شعر'] 
        },
        friends: [{
            type: Types.ObjectId,
            ref: "User",
        }],
        blockList: [{
            type: Types.ObjectId,
            ref: "User",
        }],
        articles: [{
            type: Types.ObjectId,
            ref: "Article",
        }]

    },

    { timestamps: true },
    { strict: false },
)

const userModel = model('User', userSchema)

export default userModel