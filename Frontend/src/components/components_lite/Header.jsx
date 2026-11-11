import { Button } from "../ui/button"
import { Search, Briefcase, Code2, Rocket, Sparkles } from 'lucide-react'
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim()) {
      dispatch(setSearchedQuery(query.trim()));
      navigate("/jobs");
    }
  };

  return (
    <div className='max-w-7xl mx-auto relative py-4'>
      {/* Floating Decorative Career Stickers (Desktop only, non-blocking) */}
      <div className='hidden lg:flex pointer-events-none select-none items-center gap-2.5 absolute left-8 top-6 bg-white/90 backdrop-blur-sm border border-purple-100 shadow-md rounded-2xl px-3.5 py-2 -rotate-3 animate-float-slow'>
        <span className='p-2 rounded-xl bg-purple-100 text-[#6A38C2]'>
          <Briefcase size={16} />
        </span>
        <div className='text-left'>
          <p className='text-xs font-bold text-gray-800'>500+ Roles</p>
          <p className='text-[10px] text-gray-500'>Internships & Jobs</p>
        </div>
      </div>

      <div className='hidden lg:flex pointer-events-none select-none items-center gap-2.5 absolute left-14 bottom-2 bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md rounded-2xl px-3.5 py-2 rotate-2 animate-float-delayed'>
        <span className='p-2 rounded-xl bg-orange-100 text-[#FA4F09]'>
          <Code2 size={16} />
        </span>
        <div className='text-left'>
          <p className='text-xs font-bold text-gray-800'>Tech & Core</p>
          <p className='text-[10px] text-gray-500'>Verified Openings</p>
        </div>
      </div>

      <div className='hidden lg:flex pointer-events-none select-none items-center gap-2.5 absolute right-10 top-28 bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md rounded-2xl px-3.5 py-2 rotate-3 animate-float-delayed'>
        <span className='p-2 rounded-xl bg-orange-100 text-[#FA4F09]'>
          <Sparkles size={16} />
        </span>
        <div className='text-left'>
          <p className='text-xs font-bold text-gray-800'>Top Startups</p>
          <p className='text-[10px] text-gray-500'>Hiring Now</p>
        </div>
      </div>

      <div className='hidden lg:flex pointer-events-none select-none items-center gap-2.5 absolute right-14 bottom-2 bg-white/90 backdrop-blur-sm border border-purple-100 shadow-md rounded-2xl px-3.5 py-2 -rotate-2 animate-float-slow'>
        <span className='p-2 rounded-xl bg-purple-100 text-[#6A38C2]'>
          <Rocket size={16} />
        </span>
        <div className='text-left'>
          <p className='text-xs font-bold text-gray-800'>Fast Apply</p>
          <p className='text-[10px] text-gray-500'>Track Live Status</p>
        </div>
      </div>

      <div className='text-center relative z-10'>
        <div className='flex flex-col gap-5 my-10'>
          <span className="px-4 mx-auto flex justify-center items-center py-2 gap-2 rounded-full bg-white shadow-sm border border-gray-200 text-red-600 font-medium">
            <span className="text-[#614232]"><HiOutlineOfficeBuilding /></span><span>No.1 Job Hunt Platform</span>
          </span>

          <h2 className='text-4xl md:text-5xl font-bold text-gray-900'>
            Search Apply & <br />
            Get Your <span className='text-[#6A38C2]'>Dream Job</span>
          </h2>
          <p className='text-gray-600 max-w-xl mx-auto'>
            Start your hunt for the best, life-changing career opportunities from here in your selected areas conveniently and get hired quickly.
          </p>

          <div className='flex w-[90%] sm:w-[70%] md:w-[45%] bg-white shadow-lg border border-gray-200 pl-4 rounded-full items-center mx-auto focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100 transition-all'>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
              placeholder='Find your Dream Job'
              className='outline-none border-none w-full bg-transparent text-sm py-2'
            />
            <Button onClick={searchJobHandler} className="rounded-r-full h-10 cursor-pointer bg-[#6A38C2] hover:bg-[#5a2fa8]" >
              <Search className='h-5 w-5 text-white'></Search>
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Header
