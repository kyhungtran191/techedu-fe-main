import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ShadcnUI
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import ThreeDots from '@/icons/ThreeDots'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { GetAllInstructorCourse } from '@/services/instructor/instructor-course.service'
import { useQuery } from '@tanstack/react-query'
import SectionLoading from '@/components/Loading/SectionLoading'
import PlaceHolderIMG from '@/assets/placeholder.jpg'
import { formatSystemDate } from '@/utils'

// End

export default function CourseManage() {
  const { data: courseData, isLoading } = useQuery({
    queryKey: ['my-courses'],
    queryFn: GetAllInstructorCourse,
    select: (data) => data.data.value
  })

  const navigate = useNavigate()

  const columns = [
    {
      id: 'thumbnail',
      header: () => <p className='text-lg text-primary-1'>Thumbnail</p>,
      cell: ({ row }: { row: any }) => {
        return (
          <img
            src={row.original.thumbnailUrl || PlaceHolderIMG}
            alt={row.original.title}
            className='font-semibold w-[120px] h-[100px] object-cover mx-auto'
          />
        )
      },
      enableSorting: false,
      enableHiding: false
    },

    {
      id: 'slug',
      header: () => <p className='text-lg text-primary-1'>Title</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='text-lg font-medium'>{row.original.title}</p>
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'created_date',
      header: () => <p className='text-lg text-primary-1'>Created Date</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='text-lg'>{formatSystemDate(row.original.createdDate)}</p>
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'status',
      header: () => <p className='text-lg text-primary-1'>Status</p>,
      cell: ({ row }: { row: any }) => {
        return (
          <p
            className={`w-fit mx-auto px-3 py-2 tex  rounded-lg ${row.original.isPublish ? 'bg-primary-1 text-white' : 'bg-[#F0D355] text-black'}`}
          >
            {row.original.isPublish ? 'Publish' : 'Draft'}
          </p>
        )
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'action',
      header: () => <p className='text-lg text-primary-1'>Action</p>,
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
                  onClick={() => navigate(`/teacher/course/${row.original.courseId}/manage/curriculum`)}
                >
                  Edit Course
                </DropdownMenuItem>
                <DropdownMenuItem className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'>
                  Delete Course
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
    data: courseData || [],
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className='flex flex-col h-full'>
      <div className='sticky top-0 flex items-center'>
        <div className='flex items-center gap-[32px] flex-1 mr-[70px]'>
          <div className=' py-[14px] px-[10px] bg-white rounded-xl flex items-center gap-x-[10px] flex-1 max-w[50vw]'>
            <Search className='flex-shrink-0 w-4 h-4 md:h-6 md:w-6'></Search>
            <Input
              className='px-0 py-0 text-sm bg-transparent border-none outline-none md:text-base '
              placeholder='Search your courses'
            ></Input>
          </div>
          <Select defaultValue='newest'>
            <SelectTrigger
              className='w-[180px] h-[56px]  !py-4 !px-6 bg-transparent  border-neutral-black text-lg'
              defaultValue={'newest'}
            >
              <SelectValue placeholder='Select a timezone' />
            </SelectTrigger>
            <SelectContent className='' side='bottom'>
              <SelectItem value='newest'>Newest</SelectItem>
              <SelectItem value='oldest'>Oldest</SelectItem>
              <SelectItem value='in-course'>In this course</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Link
          to='/teacher/create-course'
          className='flex items-center px-6 py-4 text-white bg-primary-1 h-[58px] gap-x-[10px] rounded-lg w-fit ml-auto '
        >
          <Plus></Plus>
          <span>New course</span>
        </Link>
      </div>
      <div className='flex-grow px-6 py-3 mt-4 overflow-y-auto bg-white rounded-xl no-scrollbar'>
        <Table className='w-full h-full overflow-auto'>
          {isLoading && <SectionLoading></SectionLoading>}
          <TableHeader className='sticky z-20 py-4 bg-white border-b -top-3'>
            {courseTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='text-center'>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
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
                <TableCell colSpan={columns?.length} className='h-24 text-center'>
                  <div className='text-xl font-medium text-center'>No courses yet</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
