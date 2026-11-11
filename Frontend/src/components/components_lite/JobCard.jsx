import React from 'react'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const JobCard = ({ job }) => {
  return (
    <div className='h-full flex flex-col justify-between p-6 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-400 transition-all duration-200'>
      <div>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-medium'>{job?.company?.name}</h1>
          <Avatar className="border-white">
            <AvatarImage src={job?.company?.logo} />
            <AvatarFallback>{job?.company?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <p className='text-sm text-gray-600'>india</p>

        <div>
          <h2 className='font-bold text-lg my-2'>{job?.title}</h2>
          <p className='text-sm text-gray-600'>
            {job?.description}
          </p>
        </div>
      </div>

      <div className='flex flex-wrap gap-2 items-center mt-4'>
        <Badge className={"text-blue-600 font-bold rounded-md"} variant='outline'>{job?.position}</Badge>
        <Badge className={"text-[#FA4F09] font-bold rounded-md"} variant='outline'>{job?.salary} LPA</Badge>
        <Badge className={"text-[#6B3AC2] font-bold rounded-md"} variant='outline'>{job?.location}</Badge>
        <Badge className={"text-black font-bold rounded-md"} variant='outline'>{job?.jobType}</Badge>
      </div>
    </div>
  )
}

export default JobCard
