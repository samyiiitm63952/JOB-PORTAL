import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.application);

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!allAppliedJobs || allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob?._id}>
                <TableCell className="font-medium text-gray-700">
                  {appliedJob?.createdAt ? appliedJob.createdAt.split("T")[0] : 'N/A'}
                </TableCell>
                <TableCell className="text-gray-900 font-medium">
                  {appliedJob?.job?.title || 'N/A'}
                </TableCell>
                <TableCell className="text-gray-600">
                  {appliedJob?.job?.company?.name || 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className={`rounded-full px-3 py-0.5 text-xs font-semibold capitalize ${
                      appliedJob?.status?.toLowerCase() === "rejected"
                        ? "bg-red-50 text-red-600 border-red-200"
                        : appliedJob?.status?.toLowerCase() === "accepted"
                        ? "bg-green-50 text-green-600 border-green-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {appliedJob?.status || "pending"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJob;
