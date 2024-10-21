import React from 'react'

type ITypeCourseTable = {
  _id: string
  thumbnail: string
  courseName: string
  instructorName: string
  instructorAvatar: string
  level: string
  status: number
  createdAt: string
}

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import ThreeDots from '@/icons/ThreeDots'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import PaginationCustom from '@/components/Pagination'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const mockData: ITypeCourseTable[] = [
  {
    _id: '1',
    thumbnail: 'https://kyhungtran191.github.io/elearning-temp/assets/images/courses/4by3/09.jpg',
    courseName: 'JavaScript: Full Understanding',
    instructorName: 'Billy Vasquez',
    instructorAvatar: 'https://kyhungtran191.github.io/elearning-temp/assets/images/avatar/04.jpg',
    level: 'Beginner',
    status: 0,
    createdAt: new Date().toLocaleDateString('vi-VN')
  },
  {
    _id: '2',
    thumbnail: 'https://kyhungtran191.github.io/elearning-temp/assets/images/courses/4by3/09.jpg',
    courseName: 'JavaScript: Full Understanding',
    instructorName: 'Billy Vasquez',
    instructorAvatar: 'https://kyhungtran191.github.io/elearning-temp/assets/images/avatar/04.jpg',
    level: 'All level',
    status: 1,
    createdAt: new Date().toLocaleDateString('vi-VN')
  },
  {
    _id: '3',
    thumbnail: 'https://kyhungtran191.github.io/elearning-temp/assets/images/courses/4by3/09.jpg',
    courseName: 'JavaScript: Full Understanding',
    instructorName: 'Frances Guerrero',
    instructorAvatar: 'https://kyhungtran191.github.io/elearning-temp/assets/images/avatar/04.jpg',
    level: 'Beginner',
    status: 2,
    createdAt: new Date().toLocaleDateString('vi-VN')
  },
  {
    _id: '4',
    thumbnail: 'https://kyhungtran191.github.io/elearning-temp/assets/images/courses/4by3/09.jpg',
    courseName: 'JavaScript: Full Understanding',
    instructorName: 'Samuel Bishop',
    instructorAvatar: 'https://kyhungtran191.github.io/elearning-temp/assets/images/avatar/04.jpg',
    level: 'Intermediate',
    status: 2,
    createdAt: new Date().toLocaleDateString('vi-VN')
  }
]

export default function CourseTable() {
  const navigate = useNavigate()

  const columns = [
    {
      id: 'thumbnail',
      header: () => <p className=''>Thumbnail</p>,
      cell: ({ row }: { row: any }) => {
        return (
          <img
            src={row.original.thumbnail}
            alt={row.original.name}
            className='font-semibold w-[100px] h-[70px] object-cover mx-auto'
          />
        )
      },
      enableSorting: false,
      enableHiding: false
    },

    {
      id: 'courseName',
      header: () => <p className=''>Course Name</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='font-medium'>{row.original.courseName}</p>
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'instructor',
      header: () => <p className=''>Instructor</p>,
      cell: ({ row }: { row: any }) => {
        return (
          <div className='flex items-center justify-center'>
            <img
              src={row.original.instructorAvatar}
              alt={''}
              className='flex-shrink-0 object-cover w-10 h-10 mr-1 rounded-full'
            />
            <div className='w-[120px]'>{row.original.instructorName}</div>
          </div>
        )
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'created_date',
      header: () => <p className=''>Created date</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='font-medium'>{row.original.createdAt}</p>
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'type',
      header: () => <p className=''>Level</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='font-medium '>{row.original.level}</p>
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'status',
      header: () => <p className=''>Status</p>,
      cell: ({ row }: { row: any }) => {
        return (
          <p
            className={`w-fit mx-auto px-3 py-2 tex  rounded-lg ${row.original.status == 0 ? 'bg-red-500 text-white' : row.original.status == 1 ? 'bg-primary-1 text-white' : 'bg-[#F0D355] text-black'}`}
          >
            {row.original.status == 0 ? 'Rejected' : row.original.status == 1 ? 'Published' : 'Pending'}
          </p>
        )
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
                  Preview course as Student
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'
                  onClick={() => {
                    navigate('/admin/courses/1')
                  }}
                >
                  View course detail
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

  const courseTable = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <div className='mt-5 w-full overflow-auto h-[500px] rounded-lg no-scrollbar'>
        <Table className='w-full h-full overflow-auto'>
          <TableHeader className='sticky top-0 z-20 py-4 bg-white border-b tb:-top-3'>
            {courseTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='font-bold text-center'>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className='h-[50px] overflow-y-auto'>
            {courseTable?.getRowModel()?.rows?.length ? (
              courseTable?.getRowModel()?.rows?.map((row) => (
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
      <PaginationCustom totalPage={10} className='mt-3'></PaginationCustom>
    </>
  )
}
