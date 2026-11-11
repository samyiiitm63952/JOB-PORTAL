import express from "express"
import { register, updateProfile,getBookmarkedJobs,togglebookmarkcontroller, login, logout, sendRegistrationOtp } from '../controllers/user.controller.js'
import authenticateToken from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js"

const router = express.Router();
router.route("/register").post(singleUpload, register);
router.route("/send-otp").post(sendRegistrationOtp);
router.route("/login").post(login);
router.route("/profile/update").post(authenticateToken, singleUpload, updateProfile);
router.route("/logout").get(logout);
router.route("/bookmark/:id").post(authenticateToken, togglebookmarkcontroller);
router.route("/bookmarks").get(authenticateToken, getBookmarkedJobs);
export default router;