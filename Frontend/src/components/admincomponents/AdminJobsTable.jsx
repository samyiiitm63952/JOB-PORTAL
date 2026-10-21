import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState(allAdminJobs || []);

  useEffect(() => {
    const filteredJobs =
      allAdminJobs?.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      }) || [];
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>Your recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">No Jobs Found</TableCell>
            </TableRow>
          ) : (
            filterJobs?.map((job) => (
              <TableRow key={job._id || job.id}>
                <TableCell>{job?.company?.name || "N/A"}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job?.createdAt ? job.createdAt.split("T")[0] : "N/A"}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger className="p-1 hover:bg-gray-100 rounded-md inline-flex items-center justify-center">
                      <MoreHorizontal className="w-5 h-5" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-white p-2 border border-gray-200 shadow-md rounded-md">
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer mb-1 hover:text-blue-600"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <hr className="my-1 border-gray-200" />
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 w-fit cursor-pointer mt-1 hover:text-blue-600"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;