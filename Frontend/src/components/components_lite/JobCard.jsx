import React from 'react'
import { Badge } from '../ui/badge'

const JobCard = () => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-400 hover:p-3'>
        <div>
            <h1 className='text-lg font-medium'>Company Name</h1>
            <p className='text-sm text-gray-600'>india</p>
        </div>
        <div>
            <h2 className='font-bold text-lg my-2'>Job Title</h2>
            <p className='text-sm text-gray-600 '>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium et quisquam porro obcaecati eligendi tempore mollitia accusantium? Excepturi obcaecati aliquam, sunt qui totam veniam?
            </p>
        </div>
        <div className='flex gap-2 items-center mt-4'>
            <Badge className={"text-blue-600 font-bold rounded-md"} variant='outline'>10 positions</Badge>
            <Badge className={"text-[#FA4F09] font-bold rounded-md"} variant='outline'>20 LPA</Badge>
            <Badge className={"text-[#6B3AC2] font-bold rounded-md"} variant='outline'>Remote</Badge>
            <Badge className={"text-black font-bold rounded-md"} variant='outline'>Intern</Badge>
        </div>
    </div>
  )
}

export default JobCard