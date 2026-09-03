import express from "express"
import { register, updateProfile, login, logout } from '../controllers/user.controller.js'
import authenticateToken from "../middleware/isAuthenticated.js";
import {singleUpload}from "../middleware/multer.js"

const router = express.Router();
router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/profile/update").post(authenticateToken, singleUpload, updateProfile);
router.route("/logout").get(logout);

export default router;