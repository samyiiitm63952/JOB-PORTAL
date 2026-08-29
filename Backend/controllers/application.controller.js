import { Application } from "../models/application.model.js"
import { Job } from "../models/job.model.js"
export const applyjob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Invalid job id", succes: false
            })
        }
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(404).json({
                message: "You have already applied",
                success: false
            })
        }
        //let first check if job exits or not first
        const jobfind = await Job.findById(jobId);
        if (!jobfind) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,

        })
        if (!jobfind.application) jobfind.application = [];
        jobfind.application.push(newApplication._id);
        await jobfind.save();

        return res.status(200).json({
            message: "application created successfully",
            success: true,
            newApplication
        })



    } catch (err) {
        console.error(err);
        return res.status(404).json({
            message: "Server error",
            success: false
        })
    }
}

export const getAppliedjobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job", options: { sort: { createdAt: -1 } }, populate: { path: "company" }
        });
        if (applications.length == 0) {
            return res.status(404).json({
                message: "No job found with this user id",
                success: false
            })
        }
        return res.status(200).json({
            message: "Here are the jobs you have applied for",
            applications,
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(404).json({
            message: "Server error",
            success: false
        })
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "application",
            options: { sort: { createdAt: -1 } },
            populate: { path: "applicant", options: { sort: { createdAt: -1 } } },
        })
        if (!job) {
            return res.status(404).json({
                message: "job not found",
                success: false
            })
        }
        return res.status(200).json({ job, success: true });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message:"Server error"
        })
    }
}

export const updatestatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: "Invalid status",
                success: false
            })
        }
        //find the application by applicant id
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(400).json({
                message: "no application found",
                success: false
            })
        }
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message: "Appliaction status updated",
            succes: true,
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error", success: false
        })
    }
}