const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');
const Joi = require("joi");
const Schema=mongoose.Schema
const Types=mongoose.Types
const userSchema =new Schema(
    {

        name: {
            firstName: { type: String,
                        //required :[true,"*يجب ادخال الاسم الأول"] 
                    },
            lastName: { type: String,
                        //required :[true,"*يجب ادخال الاسم الأخير"]
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
        verified:{
            type:boolean,
            default:false
        },
        isAdmin:{
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
            type:[String],   
        },
        friends:[{
            type: Types.ObjectId,
            ref: "User",
        }],
        blockList:[{
            type: Types.ObjectId,
            ref: "User",
        }],
        articles: [{
            type: Types.ObjectId,
            ref: "Article",
        }]

    },  
    
         {timestamps: true},
    {strict: false},
)
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };
const User = mongoose.model("User",userSchema);
//validation function
function validateRegisterUser(obj) {
    const schema = Joi.object({
        name: Joi.object({
            firstName: Joi.string().required().messages({
                'string.empty': 'يجب ادخال الاسم الأول',
                'any.required': 'يجب ادخال الاسم الأول'
            }),
            lastName: Joi.string().required().messages({
                'string.empty': 'يجب ادخال الاسم الأخير',
                'any.required': 'يجب ادخال الاسم الأخير'
            })
        }).required(),
        email: Joi.string().trim().email().min(10).max(100).required(),
        password: Joi.string().trim().min(6).max(100).required(),
        isAdmin: Joi.boolean() // Use .boolean() instead of .bool()
    });

    return schema.validate(obj);
}

function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().email().min(10).max(100).required(),
        password: Joi.string().trim().min(6).max(1024).required(),
    });

    return schema.validate(obj);
}
module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
   // validateUpdateUser,


};
 