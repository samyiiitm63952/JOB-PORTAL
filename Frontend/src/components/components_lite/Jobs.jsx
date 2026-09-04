import React from 'react'
import Navbar from './Navbar'
import Filtercard from './Filtercard'
import Job1 from './Job1'
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Jobs = () => {
  useGetAllJobs(); // fetch jobs if not already in store
  const { alljobs } = useSelector((store) => store.job);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-[20%]'><Filtercard /></div>
          {alljobs?.length <= 0 ? (
            <span className='text-center mt-10 text-gray-500'>No jobs found</span>
          ) : (
            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
              <div className='grid grid-cols-2 gap-4'>
                {alljobs?.map((job) => (
                  <Job1 key={job._id} job={job} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Jobs