import { User } from "../models/user.model.js"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js"

export const updateProfile = async (req,res)=>{
    try{
        const {fullname,email,phoneNumber,phone,bio,skills}= req.body;
        const file = req.file;
        let cloudinaryResponse;
        if (file) {
            const fileUri = getDataUri(file);
            if (fileUri) {
                cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content, {
                    resource_type: "raw"
                });
            }
        }
        //cloudinary upload

        let skillsArray;
        if(skills){
            skillsArray = Array.isArray(skills) ? skills : skills.split(',');
        }

        
        const userId = req.id; //middleware authentication
        let user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }
        if(fullname){
            user.fullname = fullname;
        }
        if(email){
            user.email = email;
        }
        const updatedPhone = phoneNumber || phone;
        if(updatedPhone){
            user.phoneNumber = updatedPhone;
        }
        if(bio)
        {user.profile.bio = bio;}
    if(skills)
        {user.profile.skills = skillsArray;}
    if(cloudinaryResponse){
        user.profile.resume = cloudinaryResponse.secure_url;
        user.profile.resumeOriginalname = file.originalname;
    }
        await user.save();
         user= {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile,
            bookmarks:user.bookmarks
        }
        return res.status(200).json({
            message:"Profile updates successfully",
            user,
            success:true
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Profile update failed",
            success:false
        })
    }
}
export const getBookmarkedJobs = async(req,res)=>{
    try{
        const user = await User.findById(req.id).populate({
            path:"bookmarks",
            populate:{path:"company"}
        });
        if(!user)return res.status(404).json({
            message:"User not found",
            success:false
        });
        const Bookmarks = user.bookmarks.filter((job)=>job!==null);
        return res.status(200).json({
            bookmarks:Bookmarks,
            success:true
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Server error",
            success:false
        })
    }
} 
export const togglebookmarkcontroller = async(req,res)=>{
    try{
        const jobId = req.params.id;
        const user = await User.findById(req.id);
        if(!user){
            return res.status(404).json({
                message:"User did not found",
                success:false
            })
        }
        const alreadybookmarked = user.bookmarks.some((id) => id.toString() === jobId);
        if (alreadybookmarked) {
            user.bookmarks.pull(jobId);
        } else {
            user.bookmarks.push(jobId);
        }
        await user.save();
        return res.status(200).json({
            message: alreadybookmarked ? "Removed from bookmarks" : "Job Bookmarked",
            bookmarks: user.bookmarks,
            success: true,
            isBookmarked: !alreadybookmarked
        });
}
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Server Error",
            success:false
        })
    }
}
export const updateProfilePhoto = async (req, res) => {
    try {
        const user = await User.findById(req.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "Please select a photo",
                success: false
            });
        }
        const fileUri = getDataUri(file);
        if (!fileUri) {
            return res.status(400).json({
                message: "Invalid image file",
                success: false
            });
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: "image"
        });
        user.profile.profilePhoto = cloudinaryResponse.secure_url;
        await user.save();

        return res.status(200).json({
            message: "Profile Photo Updated",
            profilePhoto: user.profile.profilePhoto,
            success: true
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}