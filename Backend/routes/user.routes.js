import express from "express"
import { register, updateProfile, login, logout } from '../controllers/user.controller.js'
import authenticateToken from "../middleware/isAuthenticated.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").post(authenticateToken, updateProfile);
router.route("/logout").post(logout);

export default router;