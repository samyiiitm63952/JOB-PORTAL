import React, { useState } from 'react'
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from '../ui/dialog'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/data'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'


const EditProfileModal = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const {user}= useSelector((store)=>store.auth);
    const [input,setInput] = useState({
        name:user?.fullname,
        email:user?.email,
        phone:user?.phoneNumber,
        bio:user?.profile?.bio,
        skills:user?.profile?.skills.map((skills)=>skills),
        file:user?.profile?.resume
    })
    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }
    const handleFileHandler=async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname",input.name);
        formData.append("email",input.email);
        formData.append("phone",input.phone);
        formData.append("bio",input.bio);
        formData.append("skills",input.skills);
        if(input.file){
            formData.append("file",input.file);
        }
        try{
            const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`,formData,{
                headers:{"Content-Type":"multipart/form-data"},
                withCredentials:true
            })
            if(res.data.success){
                dispatch(setUser(res.data,user))
                toast.success(res.data.message);
            }

        }catch(err){
            console.log(err)
            toast.error("Failed to update profile")
        }
        setOpen(false);
        console.log(input);
        
    }
    const filechangehandler= (e)=>{
        const file = e.target.files[0];
        setInput({...input,file})
    }
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className={"sm:max-w-[500px] "}>
                    <DialogHeader>
                        <DialogTitle className="text-[#F8FAFC]">Edit Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleFileHandler}>
                        <div className='grid gap-4 py-4 text-[#E2E8F0]'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className={"text-right"}>Name</Label>
                                <input
                                   onChange={changeEventHandler}  type="text" id="name" name='name' value={input.name} className='w-full col-span-3 border border-gray-300 rounded-md p-2'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className={"text-right"}>Email</Label>
                                <input
                                   onChange={changeEventHandler} type="email" id="email" name='email' value={input.email} className='w-full col-span-3 border border-gray-300 rounded-md p-2'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="phoneNumber" className={"text-right"}>Phone</Label>
                                <input
                                  onChange={changeEventHandler}  type="text" id="phoneNumber" name='phone' value={input.phone} className='w-full col-span-3 border border-gray-300 rounded-md p-2'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className={"text-right"}>Bio</Label>
                                <input
                                  onChange={changeEventHandler}  type="text" id="bio" value={input.bio} name='bio' className='w-full col-span-3 border border-gray-300 rounded-md p-2'
                                />
                            </div>
                            <div>
                                <Label htmlFor="skills" className={"text-right"}>Skills</Label>
                                <input onChange={changeEventHandler} type='text' id='skills' name='skills' className='col-span-3 border border-gray-300 rounded-md p-2'/>
                            </div>
                            {/* Resume file upload */}
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className={"text-right"}>Resume</Label>
                                <input onChange={filechangehandler} type="file" id='file' name='file' accept='application/pdf' className='col-span-3 border border-gray-300 rounded-md p-2' />
                            </div>
                        </div>
                        <DialogFooter>
                           {
                        loading?<Button><Loader2 className='mr-2 h-4 w-4 animate-spin' /> </Button>: <button type="submit" className='block w-full py-3 my-3 text-white bg-black hover:bg-black/90 rounded-md cursor-pointer'>
                            Save
                        </button>
                    }

                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditProfileModal