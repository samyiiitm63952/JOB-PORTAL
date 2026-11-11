import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Job from './Job1'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const Browse = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { alljobs, searchedQuery } = useSelector((store) => store.job);
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  const filteredJobs = searchedQuery
    ? alljobs?.filter((job) =>
        job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.jobType?.toLowerCase().includes(searchedQuery.toLowerCase())
      )
    : alljobs;

  return (
    <div className='min-h-screen bg-gray-50/50 pb-10'>
      <Navbar />
      <div className='max-w-7xl mx-auto my-5 px-4'>
        <div className='flex items-center gap-3 my-8'>
          <h1 className='font-bold text-2xl text-gray-800'>
            Search Results ({filteredJobs?.length || 0})
          </h1>
          {searchedQuery && (
            <span className='text-sm bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full font-medium'>
              for "{searchedQuery}"
            </span>
          )}
        </div>

        {!filteredJobs || filteredJobs.length <= 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-gray-500'>
            <span className='text-lg font-medium'>No jobs found</span>
            <p className='text-sm text-gray-400 mt-1'>
              Try searching with different keywords or check all jobs.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {filteredJobs.map((job) => (
              <Job key={job?._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
