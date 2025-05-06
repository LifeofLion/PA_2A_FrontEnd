"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ResponsiveTableWrapper } from "@/components/responsive-table-wrapper"

interface UserData {
  id: number
  name: string
  firstName: string
  email: string
  phone: string
  status?: string
  statusColor?: string
}

interface UserTableProps {
  data: UserData[]
  showJustificative: boolean
}

export function UserTable({ data, showJustificative }: UserTableProps) {
  return (
    <ResponsiveTableWrapper>
      <Table>
        <TableHeader>
          <TableRow className="bg-white">
            <TableHead className="font-medium">Name</TableHead>
            <TableHead className="font-medium">First name</TableHead>
            <TableHead className="font-medium">Email</TableHead>
            <TableHead className="font-medium">Phone number</TableHead>
            {showJustificative && <TableHead className="font-medium">Justificative pieces</TableHead>}
            <TableHead className="font-medium">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              {showJustificative && (
                <TableCell>
                  {user.status && (
                    <span className={`px-3 py-1 rounded-md text-sm ${user.statusColor}`}>{user.status}</span>
                  )}
                </TableCell>
              )}
              <TableCell>
                <Button variant="destructive" size="sm" className="bg-[#E57373] hover:bg-[#ef5350]">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ResponsiveTableWrapper>
  )
}

