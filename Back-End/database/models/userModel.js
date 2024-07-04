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
            // match: [/.+\@.+\..+/, "من فضلك أدخل بريد إلكتروني صحيح"],
        },
        password: {
            type: String,
            required: [true, "يجب ادخال كلمة المرور"],
        },

        verified:{
            type:Boolean,
            default:false
        },
        role: {
            type: String,
            default: 'User',
            enum: ['User', 'Admin']
        },
        profilePhoto: {
            type: String,
            default:"https://res.cloudinary.com/dfvv2i9vk/image/upload/v1719747384/profile_photo_iw5kfx.jpg"
        },
        coverPhoto: {
            type: String,
            default:"https://res.cloudinary.com/dfvv2i9vk/image/upload/v1719747656/cover_uhhwks.jpg"
        },
        bio: {
            type: String,
        },
        interests: {
            type: [String],
            // Added
            enum: ['رواية', 'خيالي', 'علوم', 'واقعي', 'ديني', 'شعر'] 
        },
        followingList: [{
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
    { strict: true },
)

const userModel = model('User', userSchema)

export default userModel
