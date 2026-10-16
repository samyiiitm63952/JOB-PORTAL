import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_ENDPOINT } from '@/utils/data'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'


const Details = () => {
    const params = useParams();
    const jobId = params.id;
    const user = useSelector((store) => store.user);
    const { singleJob } = useSelector((store) => store.job);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log("job id in des", jobId);
    
    


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
                }
                else {
                    setError("Failed to fetch jobs");
                }
            } catch (error) {
                console.log(error);
                setError(error.message || "Something went wrong");
            }
            finally {
                setLoading(false);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const isApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

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
                            disabled={isApplied}
                            className={`w-32 text-white rounded-md ${isApplied ? "bg-gray-500 cursor-not-allowed" : "bg-[#6B3AC2] cursor-pointer"}`}
                        >
                            {isApplied ? "Already Applied" : "Apply"}
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
                            {singleJob?.experienceLevel} Year
                        </span>
                    </h1>
                    <h1 className="font-bold my-1 ">
                        Total Applicants:{" "}
                        <span className=" pl-4 font-normal text-gray-800">
                            {singleJob?.applications?.length}
                        </span>
                    </h1>
                    <h1 className="font-bold my-1 ">
                        Job Type:
                        <span className=" pl-4 font-normal text-gray-800">
                            {singleJob?.jobType}
                        </span>
                    </h1>
                    <h1 className="font-bold my-1 ">
                        Post Date:
                        <span className=" pl-4 font-normal text-gray-800">
                            {singleJob?.createdAt?.split("T")[0]}
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Details