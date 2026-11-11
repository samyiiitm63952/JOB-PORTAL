import express from "express"
import { updateProfile, getBookmarkedJobs, togglebookmarkcontroller } from '../controllers/user.controller.js'
import authenticateToken from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js"

const router = express.Router();
router.route("/profile/update").post(authenticateToken, singleUpload, updateProfile);
router.route("/bookmark/:id").post(authenticateToken, togglebookmarkcontroller);
router.route("/bookmarks").get(authenticateToken, getBookmarkedJobs);

export default router;
