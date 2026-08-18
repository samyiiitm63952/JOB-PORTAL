import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import {applyjob,getApplicants,getAppliedjobs,updatestatus}from "../controllers/application.controller.js"

const router = express.Router();


router.route("/status/:id/update").post(authenticateToken,updatestatus);
router.route("/apply/:id").get(authenticateToken,applyjob);
router.route("/:id/applicants").get(authenticateToken,getApplicants);
router.route("/get").get(authenticateToken,getAppliedjobs);


export default router;