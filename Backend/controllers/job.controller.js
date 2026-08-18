import { Job } from "../models/job.model.js"
//Admin
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, position, companyId, experience } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !position || !companyId || !experience) {
            return res.status(404).json({
                message: "please fill up all required fields",
                success: false
            })
        }
        let newJob = await Job.findOne({ companyId: companyId })
        if (newJob) {
            return res.status(404).json({
                message: "Job is already posted",
                success: false
            })
        }
        newJob = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            position,
            company: companyId,
            experience,
            created_by: userId
        })

        await newJob.save();
        return res.status(200).json({
            message: "new job created successfully",
            newJob,
            success: true
        })

    }
    catch (err) {
        console.log(err);
        return res.status(404).json({
            message: "Server error",
            success: false
        })
    }
}


export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const query =
        {
            $or: [{title: { $regex: keyword, $options: "i" } },
                {description: { $regex: keyword, $options: "i" } },
                {requirements: { $regex: keyword, $options: "i" } },
                {location: { $regex: keyword, $options: "i" } },
                {jobType: { $regex: keyword, $options: "i" } },
                {position: { $regex: keyword, $options: "i" } },
            ]
        }
        const job = await Job.find(query).populate({
            path:"company",
        }).sort({createdAt:-1});
        if(!job || job.length === 0){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }
        return res.status(200).json({
            message:`${job.length} jobs found successfully`,
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: "Server error couldn't get all the jobs",
            success: false
        })
    }
}

//Users
export const getJobbyId = async(req,res)=>{
    try{
        const jobid = req.params.id;
        const job = await Job.findById(jobid)
        if(!job){
            return res.status(404).json({
                message:`could not find job with id ${jobid}`
                ,
                success:false
            })
        }
        return res.status(200).json({
            message:"Job you asked have been found",
            success:true,
            job
        })
    }
    catch(error){
        console.error(error);
        return res.status(404).json({
            message:"Server error",
            success:false
        })
    }
}



export const getAdminJobs = async(req,res)=>{
    try{
        const adminId = req.id;
        const adminjob = await Job.find({created_by:adminId});
        if(!adminjob || adminjob.length === 0){
            return res.status(404).json({
                message:"Sorry job could not be found ",
                success:false
            })
        }
        return res.status(200).json({
            message:"Job found",
            success:true,
            adminjob
        })

    }catch(err){
        console.error(err);
        return res.status(404).json({
            message:"server error",
            success:false
        })
    }
}