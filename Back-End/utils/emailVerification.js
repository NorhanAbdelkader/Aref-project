import nodemailer from "nodemailer";
import userModel from '../database/models/userModel.js';
import Token from '../database/models/emailTokenModel.js';

export const confirmEmail= async(req,res)=>{
  try{  const user=await userModel.findOne({_id:req.params.userId});
    if(!user){
        return res.status(400).send({message:"Invalid link"})
    }
    const token =await Token.findOne({
            userId:req.params.userId,
            token:req.params.token,
    })

    if(!token){
        return res.status(400).send({message: "Invalid token"})
    }
    await userModel.updateOne({_id:req.params.userId},{verified:true});
    await userModel.findAndDeleteById(token._id);
    res.status(200).send({message:"Email verified"})}
    catch{
        res.status(500).send({message:"Failed Email verfication Internal  server error"})
    }
}
export const sendEmail = async(email,subject,message)=> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: process.env.HOST,
          pass: process.env.PASS
        },
      });
  
       transporter.sendMail({
        from: process.env.HOST,
        to: email,
        subject: subject,
        html: message
      });
      console.log("Email sent Successfully")
    }catch(error){
      console.log("Email not sent")
      console.log(error)
      return error;
    }
  };