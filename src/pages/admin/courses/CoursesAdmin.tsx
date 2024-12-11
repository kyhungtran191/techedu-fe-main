import { Layout } from '@/components/custom/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import ThreeDots from '@/icons/ThreeDots'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import PaginationCustom from '@/components/Pagination'
import { useNavigate } from 'react-router-dom'
import AvatarPopover from '@/components/AvatarPopover'
import { PrivateCourse, PrivateCourseQueryConfig, PrivateCourseQueryParams } from '@/@types/admin/courses.type'
import useParamsVariables from '@/hooks/useParamsVariable'
import { isUndefined, omitBy } from 'lodash'
import { ApproveCourse, GetAllPrivateCourses, RejectCourse } from '@/services/admin/private-course.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { formatSystemDate } from '@/utils'
import SectionLoading from '@/components/Loading/SectionLoading'
import { COURSE_STATUS } from '@/constants/course'
import SearchInput from '../components/Search'
import FilterCourseStatus from './components/FilterCourseStatus'
import FilterCourseLevel from './components/FilterCourseLevel'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Textarea } from '@/components/ui/textarea'
import { useAppContext } from '@/hooks/useAppContext'
import { BASIC_ROLE } from '@/constants/role'
import { APP_PERMISSIONS } from '@/constants/permissions'
const schema = yup
  .object({
    reason: yup.string().required('Reason is required')
  })
  .required()
export default function CoursesAdmin() {
  const { permissions, profile } = useAppContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const queryParams: PrivateCourseQueryParams = useParamsVariables()
  const queryConfig: PrivateCourseQueryConfig = omitBy(
    {
      pageIndex: queryParams.pageIndex || '1',
      pageSize: queryParams.pageSize || '8',
      courseStatus: queryParams.courseStatus,
      searchTerm: queryParams.searchTerm,
      level: queryParams.level
    },
    isUndefined
  )
  const [rejectDialog, setRejectDialog] = useState<{ courseId: string; instructorId: string } | null>(null)
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['private-courses', queryConfig],
    queryFn: () => GetAllPrivateCourses(queryConfig),
    select: (res) => res?.data?.value
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleNavigateViewDraftCourse = (courseId: string | number, instructorId: string | number) => {
    navigate('/preview-draft-course', {
      state: { courseId, instructorId }
    })
  }

  const approveCourseMutation = useMutation({
    mutationFn: ({ courseId, instructorId }: { courseId: string; instructorId: string }) =>
      ApproveCourse(courseId, instructorId)
  })

  const rejectMutation = useMutation({
    mutationFn: ({ courseId, instructorId, reason }: { courseId: string; instructorId: string; reason: string }) =>
      RejectCourse(courseId, { userId: instructorId, reason })
  })

  const handleApprove = (courseId: string, instructorId: string) => {
    Swal.fire({
      title: 'Confirm Approve Course?',
      text: 'Please confirm again to approve',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#588E58',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        approveCourseMutation.mutate(
          { courseId, instructorId },
          {
            onSuccess() {
              toast.success('Approve course successfully!')
              queryClient.invalidateQueries(['private-courses', queryConfig])
              reset
            },
            onError(err: any) {
              toast.error('Error when reject course', err)
            }
          }
        )
      }
    })
  }

  const columns = [
    {
      id: 'thumbnail',
      header: () => <p className=''>Thumbnail</p>,
      cell: ({ row }: { row: any }) => {
        return (
          <img
            src={row.original.thumbnailUrl}
            alt={row.original.title}
            loading='lazy'
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
        return <p className='font-medium'>{row.original.title}</p>
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
              src={row.original.instructor.avatarUrl}
              alt={''}
              className='flex-shrink-0 object-cover w-10 h-10 mr-1 rounded-full'
            />
            <div className='w-[120px]'>
              {row.original.instructor.firstName} {row.original.instructor.lastName}
            </div>
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
        return <p className='font-medium'>{formatSystemDate(row.original.createdDateTime)}</p>
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
            className={`w-fit mx-auto px-3 py-2 tex  rounded-lg ${row.original.status == COURSE_STATUS.REJECT ? 'bg-red-500 text-white' : row.original.status == COURSE_STATUS.PUBLISH ? 'bg-primary-1 text-white' : 'bg-[#F0D355] text-white'}`}
          >
            {row.original.status == COURSE_STATUS.REVIEW ? (
              profile?.roles?.includes(BASIC_ROLE.DIRECTOR) || permissions?.includes(APP_PERMISSIONS.COURSES.REVIEW) ? (
                <div className='flex items-center gap-x-2'>
                  <Button
                    variant={'custom'}
                    onClick={() => handleApprove(row.original.id, row.original.instructor.userId)}
                  >
                    Approve
                  </Button>
                  <Button
                    className='text-white bg-red-500 hover:bg-red-600'
                    onClick={() =>
                      setRejectDialog({ courseId: row.original.id, instructorId: row.original.instructor.userId })
                    }
                  >
                    Reject
                  </Button>
                </div>
              ) : (
                <span>Reviewing</span>
              )
            ) : (
              row.original.status
            )}
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
                <DropdownMenuItem
                  className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'
                  onClick={() => handleNavigateViewDraftCourse(row.original.id, row.original.instructor.userId)}
                >
                  Preview course as Student
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'
                  onClick={() => {
                    navigate(`/admin/courses/${row.original.id}/${row.original.instructor.userId}`)
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
    data: (data?.items as any[]) || [],
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const onSubmit = ({ reason }: { reason: string }) => {
    if (rejectDialog?.courseId && rejectDialog.instructorId) {
      rejectMutation.mutate(
        { courseId: rejectDialog?.courseId, instructorId: rejectDialog?.instructorId, reason },
        {
          onSuccess() {
            toast.success('Reject this course successfully!')
            queryClient.invalidateQueries(['private-courses', queryConfig])
            setRejectDialog(null)
            reset({
              reason: ''
            })
          }
        }
      )
    } else {
      toast.error('Not found courseId or instructorId')
    }
  }

  return (
    <Layout>
      <Dialog
        open={Boolean(rejectDialog?.courseId && rejectDialog.instructorId)}
        onOpenChange={(open) => {
          if (!open) {
            setRejectDialog(null)
          }
        }}
      >
        <DialogContent className='sm:max-w-[425px]'>
          {rejectMutation.isLoading && <SectionLoading className='z-30'></SectionLoading>}
          <DialogHeader>
            <DialogTitle>Reason Reject this course</DialogTitle>
            <DialogDescription>Please give the reason why you reject this courses</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-4 py-4'>
              <Label htmlFor='reason' className='text-left'>
                Reason Reject
              </Label>
              <Textarea
                id='reason'
                placeholder='Write here'
                {...register('reason')} // Đăng ký trường name với react-hook-form
                className='col-span-3'
              />
              {errors.reason && <span className='text-sm text-red-500'>{errors.reason.message}</span>}
            </div>
            <DialogFooter>
              <Button type='submit'>Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Layout.Header>
        <div className='flex items-center ml-auto space-x-4'>
          <AvatarPopover />
        </div>
      </Layout.Header>
      {/* ===== Main ===== */}
      <Layout.Body>
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Courses</h1>
          <div className='flex items-center space-x-2'>
            <Button>Export to CSV</Button>
          </div>
        </div>
        <div className='grid gap-4 mt-3 lg:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>Total Courses</CardTitle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='w-4 h-4 text-muted-foreground'
              >
                <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                <circle cx='9' cy='7' r='4' />
                <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+2350</div>
              <p className='text-xs text-muted-foreground'>+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>Activated Courses</CardTitle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='w-4 h-4 text-muted-foreground'
              >
                <rect width='20' height='14' x='2' y='5' rx='2' />
                <path d='M2 10h20' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+12,234</div>
              <p className='text-xs text-muted-foreground'>+19% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>Pending Courses</CardTitle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='w-4 h-4 text-muted-foreground'
              >
                <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+573</div>
              <p className='text-xs text-muted-foreground'>+201 since last hour</p>
            </CardContent>
          </Card>
        </div>
        <div className='grid items-center gap-2 mt-4 xl:grid-cols-2'>
          <SearchInput queryConfig={queryConfig} path='/admin/courses' placeholder='Search in courses'></SearchInput>
          <div className='grid items-center grid-cols-2 gap-2 md:grid-cols-3'>
            <FilterCourseStatus path='/admin/courses' queryConfig={queryConfig}></FilterCourseStatus>
            {/* 2 */}
            <FilterCourseLevel path='/admin/courses' queryConfig={queryConfig}></FilterCourseLevel>
          </div>
        </div>
        {approveCourseMutation.isLoading && <SectionLoading className='z-30'></SectionLoading>}

        <div className='mt-5 w-full overflow-auto h-[500px] rounded-lg no-scrollbar'>
          {!isLoading && (
            <Table className='w-full h-full overflow-auto'>
              <TableHeader className='sticky top-0 z-20 py-4 bg-white border-b tb:-top-3'>
                {courseTable.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className='font-bold text-center'>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody className='h-[50px] overflow-y-auto'>
                {courseTable?.getRowModel()?.rows?.length ? (
                  courseTable?.getRowModel()?.rows?.map((row) => (
                    <TableRow key={row.id} className={`cursor-pointer text-center border-none`} onClick={() => {}}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns?.length} className='h-24 text-center'>
                      No data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
        {data?.items && data?.items?.length > 0 && (
          <PaginationCustom
            totalPage={data?.totalPage as number}
            path='/admin/courses'
            className='mt-3'
          ></PaginationCustom>
        )}
      </Layout.Body>
    </Layout>
  )
}
