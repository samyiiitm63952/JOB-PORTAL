import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const CompaniesTable = () => {
  return (
    <div>
        <Table>
            <TableCaption>Your recent registered Companies</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className={"text-right"}>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Avatar className={"w-14"}>
                            <AvatarImage src="https://www.logo.wine/a/logo/Visa_Inc./Visa_Inc.-Logo.wine.svg" alt="company logo" />
                        </Avatar>
                    </TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Joined at</TableCell>
                    <TableCell className="text-right">
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="cursor-pointer p-1 rounded hover:bg-gray-100">
                                    <MoreHorizontal className="w-4 h-4"/>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-32">
                                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                                    <Edit2 className="w-4 h-4"/>
                                    <span>Edit</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
  )
}

export default CompaniesTable