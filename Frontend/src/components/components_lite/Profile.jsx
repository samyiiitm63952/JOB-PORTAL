import React from 'react'
import Navbar from './Navbar'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from '../ui/badge'
import AppliedJob from './AppliedJob'

const skills = [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "JavaScript",
    "Docker",
    "AWS"
];

const IsResume = true;

const Profile = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400 hover:shadow-yellow-400'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-5'><Avatar className="cursor-pointer h-24 w-24">
                        <AvatarImage
                            src="https://github.com/maxleiter.png"
                            alt="@maxleiter"
                        />
                    </Avatar>
                        <div><h1 className='font-medium text-xl'>Full Name</h1>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti!</p></div>

                    </div>
                    <Button className={"text-right"} variant='outline'><Pen /></Button>
                </div>
                <div className='flex items-center gap-3 my-2'>
                    <div className=''>
                        <Mail />
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <span className=''>Samadkhan@gmail.com</span>
                        <Contact />
                        <span className=''>6395280880</span>
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
                                IsResume ? <a target="_blank" href={"http://resume.com"} download="resume.pdf" className='text-blue-500 cursor-pointer hover:underline' >Download</a> : <span>No resume found</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl '>
                <h1 className='text-md font-bold'>  Applied Jobs
                </h1>
                <AppliedJob />
            </div>

        </div>
    )
}

export default Profile