import React from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import ThreeDots from '@/icons/ThreeDots'
import { Progress } from '@/components/ui/progress'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
type ITypeStudentsTable = {
  _id: string
  avatar: string
  fullName: string
  averageProcess: number
  registrationDate: string
}

const mockData: ITypeStudentsTable[] = [
  {
    _id: '1',
    avatar: 'https://kyhungtran191.github.io/elearning-temp/assets/images/avatar/04.jpg',
    fullName: 'Ky Hung Tran',
    averageProcess: 60,
    registrationDate: new Date().toLocaleDateString('vi-VN')
  },
  {
    _id: '2',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    fullName: 'John Doe',
    averageProcess: 70,
    registrationDate: new Date().toLocaleDateString('vi-VN')
  },
  {
    _id: '3',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    fullName: 'Jane Smith',
    averageProcess: 70,
    registrationDate: new Date().toLocaleDateString('vi-VN')
  },
  {
    _id: '4',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    fullName: 'Robert Brown',
    averageProcess: 70,
    registrationDate: new Date().toLocaleDateString('vi-VN')
  },
  {
    _id: '5',
    avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
    fullName: 'Emma Wilson',
    averageProcess: 70,
    registrationDate: new Date().toLocaleDateString('vi-VN')
  },
  {
    _id: '6',
    avatar: 'https://randomuser.me/api/portraits/men/60.jpg',
    fullName: 'Michael Jones',
    averageProcess: 70,
    registrationDate: new Date().toLocaleDateString('vi-VN')
  }
]

const columns = [
  {
    id: 'student',
    header: () => <p className='text-start'>Student</p>,
    cell: ({ row }: { row: any }) => {
      return (
        <div className='flex items-center '>
          <img src={row.original.avatar} alt={''} className='flex-shrink-0 object-cover w-10 h-10 mr-1 rounded-full' />
          <div className='w-[120px]'>{row.original.fullName}</div>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'registrationDate',
    header: () => <p className='text-start'>Registration Date</p>,
    cell: ({ row }: { row: any }) => {
      return <p className='font-medium text-start'>{row.original.registrationDate}</p>
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'avgProgress',
    header: () => <p className='text-center'>AVG Progress</p>,
    cell: ({ row }: { row: any }) => {
      return <Progress value={row.original.averageProcess} className='h-2 '></Progress>
    },
    enableSorting: false,
    enableHiding: false
  },

  {
    id: 'action',
    header: () => <p className=''>Action</p>,
    cell: ({ row }: { row: any }) => {
      return (
        <div className='flex items-center justify-center font-base'>
          <DropdownMenu>
            <DropdownMenuTrigger
              className='[state=open]:bg-primary-1 text- neutral-black'
              onClick={(e) => e.preventDefault()}
            >
              <ThreeDots></ThreeDots>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='rounded-xl min-w-[160px] py-2'>
              <DropdownMenuItem className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'>
                View student's detail
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  }
]

interface IProps {
  className?: string
  students?: string
}

export default function StudentsTable({ className }: IProps) {
  const studentTable = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  return (
    <div className={`w-full overflow-auto h-[500px] rounded-lg no-scrollbar ${className}`}>
      <Table className='w-full h-full overflow-auto'>
        <TableHeader className='sticky top-0 z-20 bg-white border-b sm:py-4 tb:-top-3'>
          {studentTable.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className='font-bold text-center '>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className='h-[50px] overflow-y-auto'>
          {studentTable?.getRowModel()?.rows?.length ? (
            studentTable?.getRowModel()?.rows?.map((row) => (
              <TableRow
                key={row.id}
                className={`cursor-pointer text-center border-none`}
                onClick={() => {
                  // setSelectedRow(row.original)
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns?.length} className='h-24 text-center '>
                {/* Loading section */}
                {/* <ComponentsLoading></ComponentsLoading> */}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
