import{Job} from "../models/job.model"
export const postJob = async(req,res){
    try{
        const {title,description,requirements,salary,location,jobType,position,companyId,experience}=req.body;
        const userId = req.id;
        if(!title || !description || !requirements || !salary || !location || !jobType || !position || !companyId || !experience){
            return res.status(404).json({
                message:"please fill up all required fields"
            })
        }
        let newJob = await Job.findOne({ companyId: companyId })
        if(newJob){
            return res.status(404).json({
                message:"Job is already posted",
                success:false
            })
        }
        newJob = await Job.create({
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            position,
            companyId,
            experience
        })

        await newJob.save();
        return res.status(200).json({
            message:"new job created successfully",
            newJob,
            success:true
        })

    }
    catch(err){
        console.log(err);
    }
}