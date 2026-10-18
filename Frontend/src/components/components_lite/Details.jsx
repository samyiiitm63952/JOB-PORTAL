import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '@/utils/data'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'


const Details = () => {
    const params = useParams();
    const jobId = params.id;
    const user = useSelector((store) => store.auth.user);
    const { singleJob } = useSelector((store) => store.job);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const isInitiallyApplied = (singleJob?.application || singleJob?.applications)?.some(
        application => application.applicant === user?._id || application.applicant?._id === user?._id
    ) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    useEffect(() => {
        const fetchSingleJob = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    const applied = (res.data.job.application || res.data.job.applications)?.some(
                        application => application.applicant === user?._id || application.applicant?._id === user?._id
                    ) || false;
                    setIsApplied(applied);
                }
                else {
                    setError("Failed to fetch jobs");
                }
            } catch (error) {
                console.log(error);
                setError(error.response?.data?.message || error.message || "Something went wrong");
            }
            finally {
                setLoading(false);
            }
        }
        if (jobId) {
            fetchSingleJob();
        }
    }, [jobId, dispatch, user?._id]);

    const applyJobHandler = async() =>{
        try{
            const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`,{withCredentials:true})
            if(res.data.success){
                setIsApplied(true);
                const currentApps = singleJob?.application || singleJob?.applications || [];
                const updateSingleJob = {
                    ...singleJob, 
                    application: [...currentApps, { applicant: user?._id }]
                }
                dispatch(setSingleJob(updateSingleJob))
                toast.success(res.data.message);
            }
        }
        catch(e){
            console.log(e);
            toast.error(e.response?.data?.message || "Failed to apply")
        }
    }


    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 '>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                        <div>
                            <div className='flex gap-2 items-center mt-4'>
                                <Badge className={"text-blue-600 font-bold rounded-md"} variant='outline'>{singleJob?.position}</Badge>
                                <Badge className={"text-[#FA4F09] font-bold rounded-md"} variant='outline'>{singleJob?.salary}</Badge>
                                <Badge className={"text-[#6B3AC2] font-bold rounded-md"} variant='outline'>{singleJob?.location}</Badge>
                                <Badge className={"text-black font-bold rounded-md"} variant='outline'>{singleJob?.jobType}</Badge>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`w-36 rounded-md font-semibold ${isApplied ? "!bg-gray-400 !text-gray-700 cursor-not-allowed" : "!bg-[#6B3AC2] !text-white cursor-pointer hover:!bg-[#5a2fa8]"}`}
                        >
                            {isApplied ? "Already Applied" : "Apply Now"}
                        </Button>
                    </div>
                </div>
                <div>
                    <h1 className='border-b-2 border-b-gray-400 font-medium py-4 mb-5'>Job Description</h1>
                    <div>
                        <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.position}</span></h1>
                    </div>
                    <div>
                        <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    </div>
                    <div>
                        <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
                    </div>
                    <div>
                        <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    </div>
                    <h1 className="font-bold my-1 ">
                        Experience:{" "}
                        <span className=" pl-4 font-normal text-gray-800">
                            {singleJob?.experienceLevel || singleJob?.experience || 0} Year
                        </span>
                    </h1>
                    <h1 className="font-bold my-1 ">
                        Total Applicants:{" "}
                        <span className=" pl-4 font-normal text-gray-800">
                            {(singleJob?.application || singleJob?.applications)?.length || 0}
                        </span>
                    </h1>
                    <h1 className="font-bold my-1 ">
                        Job Type:
                        <span className=" pl-4 font-normal text-gray-800">
                            {singleJob?.jobType || "N/A"}
                        </span>
                    </h1>
                    <h1 className="font-bold my-1 ">
                        Post Date:
                        <span className=" pl-4 font-normal text-gray-800">
                            {singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : "Recently"}
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Details