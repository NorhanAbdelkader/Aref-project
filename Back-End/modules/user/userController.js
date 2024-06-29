import userModel from "../../database/models/userModel.js"
import cloudinary from "../../service/cloudinary.js"

export const editUserName=async(req,res)=>{
    try {
        const {userId}=req.params
        const {lastName,firstName}=req.body
        
        const user= await userModel.findById(userId)
        if(!user){
            res.json({message:"user not found"})
        }
        const updatedUser= await userModel.findByIdAndUpdate(userId, { 'name.firstName': firstName, 'name.lastName': lastName },{new:true})
        res.json({message:"'Name updated successfully'",updatedUser})
    } catch (error) {
        res.json({ message: "catch error",error })
    }

}
export const editBio=async(req,res)=>{
    try {
        const {userId}=req.params
        const {bio}=req.body
        
        const user= await userModel.findById(userId)
        if(!user){
            res.json({message:"user not found"})
        }
        const updatedUser= await userModel.findByIdAndUpdate(userId, { 'bio': bio },{new:true})
        res.json({message:"'Bio updated successfully'",updatedUser})
    } catch (error) {
        res.json({ message: "catch error",error })
    }

}
export const editProfilePhoto = async (req, res) => {
    
    try {
        const { userId } = req.params;
    
        if (!req.file) {
        return res.status(400).json({ message: 'Please upload a photo.' });
        }
    
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {
                folder: `Aref/users/${userId}` })

        const user = await userModel.findByIdAndUpdate(
            userId,
            { profilePhoto: secure_url },
            { new: true }
        );
    
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
    
        res.json({ message: 'Profile photo updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  };
export const editCoverPhoto=async(req,res)=>{
    try {
        const { userId } = req.params;
    
        if (!req.file) {
        return res.status(400).json({ message: 'Please upload a photo.' });
        }
    
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {
                folder: `Aref/users/${userId}` })

        const user = await userModel.findByIdAndUpdate(
            userId,
            { coverPhoto: secure_url },
            { new: true }
        );
    
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
    
        res.json({ message: 'cover photo updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }

}
export const viewProfile=async(req,res)=>{
    try {
        const {userId}=req.params
        
        const user= await userModel.findById(userId).select("-articles")
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
       
        res.json({message:"done",user})
    } catch (error) {
        res.json({ message: "catch error",error })
    }

}