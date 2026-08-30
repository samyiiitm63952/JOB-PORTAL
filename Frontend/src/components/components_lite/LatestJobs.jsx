import React from 'react'
import JobCard from './JobCard';

const RandomJob = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const LatestJobs = () => {
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h2 className='text-4xl font-bold '>
                <span className='text-[#6A38C2]'>
                    Latest & Top
                </span>
                Job Opening
            </h2>
            <div>
                
            </div>

            {
                RandomJob.map((job, i) => (
                    <JobCard key={i} />
                ))
            }
        </div>
    )
}

export default LatestJobs