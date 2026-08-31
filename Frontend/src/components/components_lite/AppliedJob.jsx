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

const AppliedJob = () => {
  return (
    <div>
        <Table>
            <TableCaption>Recent applied Jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className={"text-right"}>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    [1,2,3,4,5,6].map((item,i)=>{
                        return (
                            <TableRow key={i}>
                            <TableCell>23-12-2024</TableCell>
                            <TableCell>Software Engineer</TableCell>
                            <TableCell>XYZ Corp</TableCell>
                            <TableCell className={"text-right"}><Badge className={"bg-black text-white rounded-bl-xl rounded-tr-xl"}> Scheduled</Badge> </TableCell>
                        </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJob