import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { USER_API_ENDPOINT } from '@/utils/data'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((store)=>store.auth)
    const logouthandler=async ()=>{
        try{
            const response = await axios.get(`${USER_API_ENDPOINT}/logout`,{
                withCredentials:true
            });
            if(response.data.success){
                dispatch(setUser(null));
                navigate("/")
                toast.success("Logged out successfully");
            }
        }
        catch(error){
            toast.error(error.response.data.message);
            console.error(error)
        }

    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>
                       <span className='text-[#FA4F09]' >Job</span>  <span className='text-[#6B3AC2]'>Portal</span>
                    </h1>
                </div>
                <div className='flex items-center gap-10'>
                    <ul className='flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'Recruiter'?(
                                <><Link to={"/admin/companies"}><li>Companies</li></Link>
                        <Link to={"/admin/jobs"}><li>Jobs</li></Link></>
                            ):<>
                             <Link to={"/"}><li>Home</li></Link>
                        <Link to={"/Browse"}><li>Browse</li></Link>
                        <Link to={"/jobs"}><li>Job</li></Link></>
                        }
                       
                        
                    </ul>
                    { 
                        !user?(
                            <div className='flex gap-2 items-center'>
                                <Link to="/login" ><Button variant ="outline" className="cursor-pointer"  >Login</Button></Link>
                                <Link to="/register"><Button className="bg-red-600 cursor-pointer text-white hover:bg-red-700 ">Register</Button></Link>
                            </div>
                        ):(
                             <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src={user?.profile?.profilePhoto}
                                    alt="@maxleiter"
                                />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className='flex items-center gap-4'>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto}
                                        alt="@maxleiter"
                                    />
                                </Avatar>
                                <div>
                                    <h3 className='font-medium' >{user.fullname}</h3>
                                    <p className='text-sm text-muted-foreground'>{user.bio}
                                    </p>
                                </div>


                            </div>
                          
                            <div className=' flex flex-col text-gray-600'>
                                  {user && user.role === "Student" && (  <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                    <User2></User2>
                                    <Link to={"/Profile"} ><Button className="cursor-pointer" variant="link">
                                        Profile
                                    </Button></Link>
                                </div>) }
                              
                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                    <LogOut></LogOut>
                                   <Button onClick={logouthandler} className="cursor-pointer" variant="link">
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