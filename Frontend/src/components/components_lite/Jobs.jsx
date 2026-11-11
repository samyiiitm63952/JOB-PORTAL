import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Filtercard from './Filtercard'
import Job1 from './Job1'
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Jobs = () => {
  useGetAllJobs(); // fetch jobs if not already in store
  const { alljobs, searchedQuery, selectedFilters } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(alljobs || []);

  useEffect(() => {
    let filtered = alljobs || [];

    // 1. Text search query
    if (searchedQuery) {
      const q = searchedQuery.toLowerCase();
      filtered = filtered.filter((job) =>
        job.title?.toLowerCase().includes(q) ||
        job.description?.toLowerCase().includes(q) ||
        job.location?.toLowerCase().includes(q) ||
        job.jobType?.toLowerCase().includes(q) ||
        job.company?.name?.toLowerCase().includes(q)
      );
    }

    // 2. Location filter (OR within Location)
    if (selectedFilters?.Location?.length > 0) {
      filtered = filtered.filter((job) =>
        selectedFilters.Location.some((loc) =>
          job.location?.toLowerCase().includes(loc.toLowerCase())
        )
      );
    }

    // 3. Industry filter (matches title, description, or requirements)
    if (selectedFilters?.Industry?.length > 0) {
      filtered = filtered.filter((job) => {
        const text = `${job.title || ''} ${job.description || ''} ${job.requirements?.join(' ') || ''}`.toLowerCase();
        return selectedFilters.Industry.some((ind) =>
          text.includes(ind.toLowerCase())
        );
      });
    }

    // 4. Experience filter
    if (selectedFilters?.Experience?.length > 0) {
      filtered = filtered.filter((job) => {
        const exp = Number(job.experience) || 0;
        return selectedFilters.Experience.some((expRange) => {
          if (expRange === "0-3 years") return exp >= 0 && exp <= 3;
          if (expRange === "3-5 years") return exp > 3 && exp <= 5;
          if (expRange === "5-7 years") return exp > 5 && exp <= 7;
          if (expRange === "7+ years") return exp > 7;
          return true;
        });
      });
    }

    // 5. Salary filter
    if (selectedFilters?.Salary?.length > 0) {
      filtered = filtered.filter((job) => {
        const sal = Number(job.salary) || 0;
        return selectedFilters.Salary.some((salRange) => {
          if (salRange === "0-50k") return (sal >= 0 && sal <= 50000) || (sal >= 0 && sal <= 5);
          if (salRange === "50k-100k") return (sal > 50000 && sal <= 100000) || (sal > 5 && sal <= 10);
          if (salRange === "100k-200k") return (sal > 100000 && sal <= 200000) || (sal > 10 && sal <= 20);
          if (salRange === "200k+") return sal > 200000 || sal > 20;
          return true;
        });
      });
    }

    setFilterJobs(filtered);
  }, [alljobs, searchedQuery, selectedFilters]);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-4 '>
          <div className='w-[35%]'>
            <Filtercard />
          </div>
          <div className='top-40'>
            {filterJobs?.length <= 0 ? (
            <div className='flex-1 flex flex-col items-center justify-center h-[50vh] text-gray-500'>
              <span className='text-lg font-medium'>No jobs found</span>
              <p className='text-sm text-gray-400 mt-1'>Try adjusting or clearing your filters</p>
            </div>
          ) : (
            <div className='flex-1 h-[88vh] relative overflow-y-auto scrollbar-thumb-gray-300  pb-5'>
              <div className='grid grid-cols-2 top-4 gap-4 '>
                {filterJobs?.map((job) => (
                  <Job1 key={job._id} job={job} />
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs