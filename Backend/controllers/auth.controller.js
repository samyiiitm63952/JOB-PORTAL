import { User } from "../models/user.model.js"
import { Otp } from "../models/otp.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js"
import { sendOtpEmail } from "../utils/nodemailer.js"

export const sendRegistrationOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await Otp.deleteMany({ email });
        await Otp.create({ email, otp });

        await sendOtpEmail(email, otp);

        return res.status(200).json({
            message: `Verification code sent to ${email}`,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to send verification code",
            success: false
        });
    }
};

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role, otp } = req.body;
        console.log(fullname, email, phoneNumber, password, role )
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false
            });
        }

        if (!otp) {
            return res.status(400).json({
                message: "Verification code (OTP) is required",
                success: false
            });
        }

        const validOtp = await Otp.findOne({ email, otp: otp.trim() });
        if (!validOtp) {
            return res.status(400).json({
                message: "Invalid or expired verification code",
                success: false
            });
        }

        const user = await User.findOne({
            $or: [{ email }, { phoneNumber }]
        });
        if (user) {
            if (user.email === email) {
                return res.status(400).json({
                    message: "User already exists with this email",
                    success: false,
                });
            }
            if (user.phoneNumber == phoneNumber) {
                return res.status(400).json({
                    message: "User already exists with this phone number",
                    success: false,
                });
            }
        }
        // Upload profile photo only if a file was provided
        let profilePhoto = "";
        if (req.file) {
            const fileuri = getDataUri(req.file);
            if (fileuri) {
                const cloudinaryResponse = await cloudinary.uploader.upload(fileuri.content);
                profilePhoto = cloudinaryResponse.secure_url;
            }
        }
        //convert passwords to hashes
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullname,
            email,
            phoneNumber,
            password: hashedpassword,
            role,
            profile: {
                profilePhoto
            }
        })
        await newUser.save();

        // Delete used OTP
        await Otp.deleteMany({ email });

        return res.status(200).json({
            message:`Account created successfully for ${fullname}`,
            success:true
        })
    }    catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Server error",
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
            profile:user.profile,
            bookmarks:user.bookmarks
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

