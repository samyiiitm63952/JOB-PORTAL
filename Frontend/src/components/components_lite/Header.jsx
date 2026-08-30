import { Button } from "../ui/button"
import { Search } from 'lucide-react'
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import React from 'react'

const Header = () => {
  return (
    <div>
      <div className='text-center'>
        <div className='flex flex-col gap-5 my-10 '>
          <span className="px-4 mx-auto flex justify-center items-center py-2 gap-2 rounded-full bg-gray-200 text-red-600 font-medium">
            <span className="text-[#614232]"><HiOutlineOfficeBuilding /></span><span>No.1 Job Hunt Platform</span>
          </span>


          <h2 className='text-5xl font-bold'>
            Search Apply & <br />
            Get Your <span className='text-[#6A38C2]'>Dream Job</span>
          </h2>
          <p>
            Start your hunt for the best, life-changing career oppotunities from here in your selected areas conveniently and get hired quickly.
          </p>

          <div className='flex w-[40%] shadow-lg border border-gray-300 pl-4 rounded-full items-center mx-auto'>
            <input type="text" placeholder='Find your Dream Job ' className='outline-none border-none w-full' />
            <Button className="rounded-r-full h-10 cursor-pointer bg-black" >
              <Search className='h-5 w-5 invert'></Search>
            </Button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Header