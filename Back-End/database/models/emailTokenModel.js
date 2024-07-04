import mongoose, { Schema, model,Types} from 'mongoose';
const tokenSchema =new Schema({
    userId:{
        type: Types.ObjectId,
        unique:true,
        required:true,
        ref:"User",

    },
    token:{
        type:String,
        required:true,

    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires:3600,
    },
})
const Token=model("token",tokenSchema);
export default Token;