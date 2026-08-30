import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar } from '../ui/avatar'
import { AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'

const Job = () => {
   return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 w-full h-full flex flex-col">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          3 days ago
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark  />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6 shrink-0" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src='https://www.graphicpear.com/wp-content/uploads/2016/11/1.gif' />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div className="flex-1">
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">Description</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
           Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          20LPA
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <Button
          variant="outline"
          className="flex-1 sm:flex-none"
        >
          Details
        </Button>
        <Button 
          className={"bg-[#7209b7] flex-1 sm:flex-none text-white"}> Save 
        </Button>
      </div>
    </div>
  );
};


export default Job