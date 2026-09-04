import React, { useState } from 'react'
import Navbar from './Navbar'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from '../ui/badge'
import AppliedJob from './AppliedJob'
import EditProfileModal from './EditProfileModal'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const skills = user?.profile?.skills || [];
    const isResume = user?.profile?.resume;
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400 hover:shadow-yellow-400'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-5'><Avatar className="cursor-pointer h-24 w-24">
                        <AvatarImage
                            src={user?.profile?.profilePhoto}
                            alt="@maxleiter"
                        />
                    </Avatar>
                        <div><h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio || 'No bio added'}</p></div>

                    </div>
                    <Button onClick={() => setOpen(true)} className={"text-right"} variant='outline'><Pen /></Button>
                </div>
                <div className="flex items-center gap-6 my-2">
                    <a
                        href={`mailto:${user?.email}`}
                        className="flex items-center gap-2"
                    >
                        <Mail size={18} />
                        <span>{user?.email}</span>
                    </a>

                    <div className="flex items-center gap-2">
                       <a href={`tel:${user?.phoneNumber}`}> <Contact size={18} />
                        <span>{user?.phoneNumber}</span></a>
                    </div>
                </div>
                <div>
                    <h1 className='font-semibold'>Skills</h1>
                    <div className='flex my-4 items-center gap-1'>

                        {
                            (skills.length != 0) ? (skills.map((skill, i) => {
                                return (<Badge className={"bg-black text-white rounded-md p-2"} variant='outline' key={i}>{skill}</Badge>)
                            })) : <span>NA 😭</span>
                        }
                    </div>
                </div>

                <div>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <label className='text-md font-bold'>Resume </label>
                        <div>
                            {
                                isResume ? <a target="_blank" href={isResume?.replace('/upload/', '/upload/fl_attachment/')} download={user?.profile?.resumeOriginalname || 'resume.pdf'} className='text-blue-500 cursor-pointer hover:underline' >{user?.profile?.resumeOriginalname || 'Download Resume'}</a> : <span>No resume found</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl '>
                <h1 className='text-lg my-5 font-bold'>  Applied Jobs
                </h1>
                <AppliedJob />
            </div>

            {/* Edit Profile Model */}
            <EditProfileModal open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile