import React, { useState } from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.job?.alljobs || []);
  const validJobs = allJobs.filter((job) => job?._id).slice(0, 6);
  const navigate = useNavigate();
  // Track currently hovered card ID (shuru me null = koi blur nahi)
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="max-w-7xl select-none mx-auto my-20 px-4 md:px-8">
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
      </h2>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-5">
        {validJobs.length === 0 ? (
          <span className="text-gray-500">No Job Available</span>
        ) : (
          validJobs.map((job) => (
            <div
              key={job._id}
              onMouseEnter={() => setHoveredId(job._id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={()=>{navigate(`/Details/${job._id}`)}}
              className={`transition-all duration-300 ${
                hoveredId && hoveredId !== job._id ? "blur-[2px] opacity-75" : ""
              } ${
                hoveredId === job._id ? "scale-105" : ""
              }`}
            >
              <JobCard job={job} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;