import { Link } from 'react-router-dom'
import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'


const Navbar = () => {
    const user=true;
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>
                        Job <span className='text-[#022bf8]'>Portal</span>
                    </h1>
                </div>
                <div className='flex items-center gap-10'>
                    <ul className='flex font-medium items-center gap-6'>
                        <li>Home</li>
                        <li>Browse</li>
                        <li>Job</li>
                    </ul>
                    {
                        !user?(
                            <div className='flex gap-2 items-center'>
                                <Button variant ="outline">Login</Button>
                                <Button className="bg-red-600 text-white hover:bg-red-700 ">Register</Button>
                            </div>
                        ):(
                             <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src="https://github.com/maxleiter.png"
                                    alt="@maxleiter"
                                />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className='flex items-center gap-4'>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage
                                        src="https://github.com/maxleiter.png"
                                        alt="@maxleiter"
                                    />
                                </Avatar>
                                <div>
                                    <h3 className='font-medium' >Samad khan</h3>
                                    <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde non impedit quod quasi perferendis maxime?
                                    </p>
                                </div>


                            </div>
                            <div className=' flex flex-col text-gray-600'>
                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                    <User2></User2>
                                    <Button className="cursor-pointer" variant="link">
                                        Profile
                                    </Button>
                                </div>
                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                    <LogOut></LogOut>
                                    <Button className="cursor-pointer" variant="link">
                                    Logout
                                </Button></div>
                            </div>
                        </PopoverContent>
                    </Popover>
                        )
                    }
                   
                </div>
            </div>
        </div>
    )
}

export default Navbar