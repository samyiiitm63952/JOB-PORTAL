import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { Contact, Mail, Pen, FileText } from 'lucide-react'
import { Badge } from '../ui/badge'
import AppliedJob from './AppliedJob'
import Job1 from './Job1'
import EditProfileModal from './EditProfileModal'
import { useSelector } from 'react-redux'
import useGetAllAppliedJobs from '@/hooks/useGetAllAppliedJobs'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/data'

const Profile = () => {
    useGetAllAppliedJobs();
    const [open, setOpen] = useState(false);
    const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
    const { user } = useSelector((store) => store.auth);
    const skills = user?.profile?.skills || [];
    const isResume = user?.profile?.resume;

    useEffect(() => {
        const fetchBookmarkedJobs = async () => {
            if (!user) return;
            try {
                const res = await axios.get(`${USER_API_ENDPOINT}/bookmarks`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    setBookmarkedJobs(res.data.bookmarks || []);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchBookmarkedJobs();
    }, [user?.bookmarks]);

    return (
        <div className='min-h-screen bg-gray-50/50 pb-10'>
            <Navbar />

            {/* Profile Info Card */}
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-6 p-8 shadow-sm hover:shadow-md transition-shadow'>
                {/* Header row: Avatar + Name + Edit button */}
                <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-5'>
                        <Avatar className="h-24 w-24 border border-gray-100 shadow-sm">
                            <AvatarImage
                                src={user?.profile?.profilePhoto}
                                alt={user?.fullname}
                            />
                            <AvatarFallback className="bg-purple-100 text-purple-700 font-bold text-2xl">
                                {user?.fullname?.charAt(0)?.toUpperCase() || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-2xl text-gray-800'>{user?.fullname || 'User'}</h1>
                            <p className='text-sm text-gray-500 mt-1 max-w-md'>{user?.profile?.bio || 'No bio added yet'}</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setOpen(true)}
                        variant='outline'
                        size='icon'
                        className='rounded-full border-gray-200 w-20 hover:border-purple-300 hover:text-purple-700 cursor-pointer'
                    >
                     <div className='mx-2'>Edit</div>  <Pen className='' size={16} />
                    </Button>
                </div>

                {/* Contact info: Email & Phone */}
                <div className="flex flex-wrap items-center gap-6 my-5 text-sm text-gray-600">
                    <a
                        href={`mailto:${user?.email}`}
                        className="flex items-center gap-2 hover:text-purple-600 transition-colors"
                    >
                        <Mail size={16} className="text-gray-400" />
                        <span>{user?.email || 'No email provided'}</span>
                    </a>

                    <a
                        href={`tel:${user?.phoneNumber}`}
                        className="flex items-center gap-2 hover:text-purple-600 transition-colors"
                    >
                        <Contact size={16} className="text-gray-400" />
                        <span>{user?.phoneNumber || 'No phone number'}</span>
                    </a>
                </div>

                {/* Skills section */}
                <div className='my-5'>
                    <h2 className='font-semibold text-sm text-gray-700 mb-2.5'>Skills</h2>
                    <div className='flex flex-wrap items-center gap-2'>
                        {skills.length > 0 ? (
                            skills.map((skill, i) => (
                                <Badge
                                    key={i}
                                    variant='secondary'
                                    className='bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 text-xs px-3 py-1 rounded-full'
                                >
                                    {skill}
                                </Badge>
                            ))
                        ) : (
                            <span className='text-xs text-gray-400'>No skills added yet</span>
                        )}
                    </div>
                </div>

                {/* Resume section */}
                <div className='mt-5 pt-4 border-t border-gray-100'>
                    <h2 className='font-semibold text-sm text-gray-700 mb-2'>Resume</h2>
                    <div>
                        {isResume ? (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={isResume?.replace('/upload/', '/upload/fl_attachment/')}
                                download={user?.profile?.resumeOriginalname || 'resume.pdf'}
                                className='inline-flex items-center gap-1.5 text-sm text-purple-600 hover:text-purple-700 hover:underline font-medium'
                            >
                                <FileText size={16} />
                                {user?.profile?.resumeOriginalname || 'Download Resume'}
                            </a>
                        ) : (
                            <span className='text-xs text-gray-400'>No resume uploaded</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Applied Jobs Card */}
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-sm'>
                <h1 className='text-lg font-bold text-gray-800 mb-4'>Applied Jobs</h1>
                <AppliedJob />
            </div>

            {/* Bookmarked Jobs Card */}
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mt-6'>
                <h1 className='text-lg font-bold text-gray-800 mb-4'>
                    Bookmarked Jobs ({bookmarkedJobs.length})
                </h1>
                {bookmarkedJobs.length === 0 ? (
                    <p className='text-sm text-gray-500 text-center py-6'>
                        No bookmarked jobs yet.
                    </p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {bookmarkedJobs.map((job) => (
                            <Job1 key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Profile Modal */}
            <EditProfileModal open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
