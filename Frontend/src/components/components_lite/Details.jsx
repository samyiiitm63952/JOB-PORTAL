import React from 'react'
import Navbar from './Navbar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const Details = () => {
    const isApplied = false;
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 '>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-xl'>title </h1>
                        <div>
                            <div className='flex gap-2 items-center mt-4'>
                                <Badge className={"text-blue-600 font-bold rounded-md"} variant='outline'>10 positions</Badge>
                                <Badge className={"text-[#FA4F09] font-bold rounded-md"} variant='outline'>20 LPA</Badge>
                                <Badge className={"text-[#6B3AC2] font-bold rounded-md"} variant='outline'>Remote</Badge>
                                <Badge className={"text-black font-bold rounded-md"} variant='outline'>Intern</Badge>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button className={`bg-black w-32 text-white rounded-md ${isApplied?"bg-gray-500 cursor-not-allowed":"bg-[#6B3AC2] cursor-pointer"}`}>
                            {isApplied?"Already Applied":"Apply"}
                        </Button>
                    </div>
                </div>
                <div>
                    <h1 className='border-b-2 border-b-gray-400 font-medium py-4 mb-5'>Job Description</h1>
                    <div>
                        <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Software Engineer</span></h1>
                    </div>
                     <div>
                        <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Meerut</span></h1>
                    </div>
                     <div>
                        <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>20LPA</span></h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details