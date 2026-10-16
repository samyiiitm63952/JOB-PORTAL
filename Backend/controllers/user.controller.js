import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js"
export const register =async(req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        console.log(fullname, email, phoneNumber, password, role )
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(404).json({
                message: "Missing required fields",
                success: false
            })
        }
        const file = req.file;
        const fileuri = getDataUri(file);
        const cloudinaryResponse = await cloudinary.uploader.upload(fileuri.content);
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                message: "Email already exists",
                success: false,
            })
        }
        //convert passwords to hashes
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser= new User({
            fullname,
            email,
            phoneNumber,
            password:hashedpassword,
            role,
            profile:{
                profilePhoto : cloudinaryResponse.secure_url,
                
            }
        })
        await newUser.save();
        return res.status(200).json({
            message:`Account created successfully for ${fullname}`,
            success:true
        })
    }

    catch (error) {
        console.error(error);
        res.status(500).json({
            message:"Server Error register user failed",
            success:false
        })
    }
}

export const login = async (req,res)=>{
    try{
        const {email,password,role} = req.body;
        if(!email || !password || !role){
            return res.status(404).json({
                message:"Missing required fields",
                success:false
            })
        }
        let user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message:"Incorrect email or password",
                success:false
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(404).json({
                message:"Incorrect email or password",
                success:false
            })
        }
        //check role correctly or not
        if(user.role!==role){
            return res.status(403).json({
                message:"you don't have the necessary role to accces this resource",
                success:false
            })
        }
        //geneerate token
        const tokenData = {
            userId:user._id
        }
        const token = jwt.sign(tokenData,process.env.JWT_SECRET,{
            expiresIn:"1d",
        });

        user= {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie("token",token,{
            maxAge:1*24*60*60*1000,
            httpOnly:true,
            sameSite:'Strict'
        })
        .json({
            message:`Welcome back ${user.fullname}`,
            user,
            success:true
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message:"Server Error login failed",
            success:false
        })
    }
}

export const logout = (req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully",
            success:true
        })
    } catch(error){
        console.error(error);
        res.status(500).json({
            message:"Server Error logout",
            success:false
        })
    }
}


export const updateProfile = async (req,res)=>{
    try{
        const {fullname,email,phoneNumber,bio,skills}= req.body;
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw"
    });
        //cloudinary upload

        let skillsArray;
        if(skills){
            skillsArray = skills.split(',');
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
        if(phoneNumber){
            user.phoneNumber = phoneNumber;
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
            profile:user.profile
        }
        return res.status(200).json({
            message:"Profile updates successfully",
            user,
            success:true
        })
    }
    catch(err){
        console.error(err);
        res.status(404).json({
            message:"profle update failed",
            success:false
        })
    }
}