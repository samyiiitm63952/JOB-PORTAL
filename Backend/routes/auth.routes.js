import express from "express"
import { register, login, logout, sendRegistrationOtp } from '../controllers/auth.controller.js'
import { singleUpload } from "../middleware/multer.js"

const router = express.Router();
router.route("/register").post(singleUpload, register);
router.route("/send-otp").post(sendRegistrationOtp);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;

