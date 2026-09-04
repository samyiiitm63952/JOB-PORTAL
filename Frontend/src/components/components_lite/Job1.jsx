import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Bookmark, BookmarkCheck, MapPin, Briefcase, Clock } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Link } from 'react-router-dom'

const Job = ({ job }) => {
  const jobId = job?._id;
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Format date
  const postedDate = job?.createdAt
    ? new Date(job.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  return (
    <div className="flex flex-col justify-between bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-purple-300 transition-all duration-200 group">

      {/* Top Row — date + bookmark */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Clock size={12} />
          <span>{postedDate}</span>
        </div>
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`p-1.5 rounded-full transition-colors ${isBookmarked ? 'text-purple-600 bg-purple-50' : 'text-gray-400 hover:text-purple-500 hover:bg-purple-50'}`}
        >
          {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>

      {/* Company info */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-12 w-12 rounded-xl border border-gray-100 shadow-sm">
          <AvatarImage src={job?.company?.logo} className="object-contain p-1" />
          <AvatarFallback className="rounded-xl bg-purple-100 text-purple-700 font-bold text-sm">
            {job?.company?.name?.charAt(0) || 'C'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold text-gray-800 text-sm leading-tight">{job?.company?.name}</h2>
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
            <MapPin size={11} />
            <span>{job?.location}</span>
          </div>
        </div>
      </div>

      {/* Job title + description */}
      <div className="mb-4 flex-1">
        <h1 className="font-bold text-gray-900 text-base mb-1.5 group-hover:text-purple-700 transition-colors line-clamp-1">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-5">
        <Badge variant="secondary" className="text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 border-0">
          <Briefcase size={10} className="mr-1" />
          {job?.position} Position{job?.position > 1 ? 's' : ''}
        </Badge>
        <Badge variant="secondary" className="text-xs font-medium bg-orange-50 text-orange-600 hover:bg-orange-100 border-0">
          {job?.jobType}
        </Badge>
        <Badge variant="secondary" className="text-xs font-medium bg-purple-50 text-purple-700 hover:bg-purple-100 border-0">
          ₹{job?.salary} LPA
        </Badge>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <Link to={`/Details/${jobId}`} className="flex-1">
          <Button
            variant="outline"
            className="w-full text-sm font-medium border-gray-200 hover:border-purple-400 hover:text-purple-700 transition-colors"
          >
            Details
          </Button>
        </Link>
        <Button
          className="flex-1 text-sm font-medium bg-[#7209b7] hover:bg-[#5a0791] text-white transition-colors"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Job