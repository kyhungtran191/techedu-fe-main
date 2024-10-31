import { Layout } from '@/components/custom/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Progress } from '@/components/ui/progress'
import AvatarPopover from '@/components/AvatarPopover'

type ITypeStudentsTable = {
  _id: string
  avatar: string
  fullName: string
  email: string
  registrationDate: string
  courses: number
  averageProcess: number
  status: 0 | 1
}

const mockData: ITypeStudentsTable[] = [
  {
    _id: '1',
    avatar: 'https://kyhungtran191.github.io/elearning-temp/assets/images/avatar/04.jpg',
    courses: 40,
    email: 'trankyhung225@gmail.com',
    fullName: 'Ky Hung Tran',
    registrationDate: new Date().toLocaleDateString('vi-VN'),
    status: 0,
    averageProcess: 60
  },
  {
    _id: '2',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    courses: 25,
    email: 'john.doe@example.com',
    fullName: 'John Doe',
    registrationDate: new Date().toLocaleDateString('vi-VN'),
    status: 1,
    averageProcess: 70
  },
  {
    _id: '3',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    courses: 30,
    email: 'jane.smith@example.com',
    fullName: 'Jane Smith',
    registrationDate: new Date().toLocaleDateString('vi-VN'),
    status: 1,
    averageProcess: 70
  },
  {
    _id: '4',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    courses: 15,
    email: 'robert.brown@example.com',
    fullName: 'Robert Brown',
    registrationDate: new Date().toLocaleDateString('vi-VN'),
    status: 0,
    averageProcess: 70
  },
  {
    _id: '5',
    avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
    courses: 50,
    email: 'emma.wilson@example.com',
    fullName: 'Emma Wilson',
    registrationDate: new Date().toLocaleDateString('vi-VN'),
    status: 1,
    averageProcess: 70
  },
  {
    _id: '6',
    avatar: 'https://randomuser.me/api/portraits/men/60.jpg',
    courses: 20,
    email: 'michael.jones@example.com',
    fullName: 'Michael Jones',
    registrationDate: new Date().toLocaleDateString('vi-VN'),
    status: 0,
    averageProcess: 70
  }
]

const columns = [
  {
    id: 'student',
    header: () => <p className=''>Student</p>,
    cell: ({ row }: { row: any }) => {
      return (
        <div className='flex items-center justify-center'>
          <img src={row.original.avatar} alt={''} className='flex-shrink-0 object-cover w-10 h-10 mr-1 rounded-full' />
          <div className='w-[120px]'>{row.original.fullName}</div>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'email',
    header: () => <p className=''>Email</p>,
    cell: ({ row }: { row: any }) => {
      return <p className='font-medium'>{row.original.email}</p>
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'registrationDate',
    header: () => <p className=''>Registration Date</p>,
    cell: ({ row }: { row: any }) => {
      return <p className='font-medium'>{row.original.registrationDate}</p>
    },
    enableSorting: false,
    enableHiding: false
  },

  {
    id: 'courses',
    header: () => <p className=''>Courses</p>,
    cell: ({ row }: { row: any }) => {
      return <p className='font-medium '>{row.original.courses}</p>
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'avgProgress',
    header: () => <p className=''>AVG Progress</p>,
    cell: ({ row }: { row: any }) => {
      return <Progress value={row.original.averageProcess} className='h-2'></Progress>
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
          className={`w-fit mx-auto px-3 py-2 tex  rounded-lg ${row.original.status == 0 ? 'bg-red-500 text-white' : 'bg-primary-1 text-white'}`}
        >
          {row.original.status == 0 ? 'Banned' : 'Active'}
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
                Edit student's detail
              </DropdownMenuItem>
              <DropdownMenuItem className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'>
                View student's detail
              </DropdownMenuItem>
              <DropdownMenuItem className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'>
                Ban Account
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

export default function Students() {
  const studentTabel = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  return (
    <Layout>
      {' '}
      <Layout.Header>
        <div className='flex items-center ml-auto space-x-4'>
          <AvatarPopover />
        </div>
      </Layout.Header>
      <Layout.Body>
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Students</h1>
          <div className='flex items-center space-x-2'>
            <Button>Export to CSV</Button>
          </div>
        </div>
        <div className='grid gap-4 mt-3 lg:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>Total Students</CardTitle>
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
              <CardTitle className='text-sm font-medium'>Activated Students</CardTitle>
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
              <CardTitle className='text-sm font-medium'>Pending Students</CardTitle>
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
        <div className='grid gap-2 mt-4 xl:grid-cols-2'>
          <div className='py-1 px-2 bg-white rounded-xl flex items-center gap-x-[10px] flex-1 max-w[50vw] border '>
            <Search className='flex-shrink-0 w-4 h-4 '></Search>
            <Input
              className='px-0 py-0 text-sm bg-transparent border-none outline-none md:text-base '
              placeholder='Search your courses'
            ></Input>
          </div>
        </div>
        <div className='flex items-center justify-between mt-3'>
          <div className='grid items-center w-full grid-cols-2 gap-2 md:grid-cols-3'>
            <Select>
              <SelectTrigger className='font-medium rounded-lg text-neutral-black'>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className='text-base'>
                  <SelectLabel></SelectLabel>
                  <SelectItem value='popular'>Popular</SelectItem>
                  <SelectItem value='highest-rated'>Highest rated</SelectItem>
                  <SelectItem value='newest'>Newest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* 2 */}
            <Select>
              <SelectTrigger className='font-medium rounded-lg text-neutral-black'>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className='text-base'>
                  <SelectLabel></SelectLabel>
                  <SelectItem value='popular'>Popular</SelectItem>
                  <SelectItem value='highest-rated'>Highest rated</SelectItem>
                  <SelectItem value='newest'>Newest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className='font-medium rounded-lg text-neutral-black'>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className='text-base'>
                  <SelectLabel></SelectLabel>
                  <SelectItem value='popular'>Popular</SelectItem>
                  <SelectItem value='highest-rated'>Highest rated</SelectItem>
                  <SelectItem value='newest'>Newest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='mt-5 w-full overflow-auto h-[500px] rounded-lg no-scrollbar'>
          <Table className='w-full h-full overflow-auto'>
            <TableHeader className='sticky top-0 z-20 bg-white border-b sm:py-4 tb:-top-3'>
              {studentTabel.getHeaderGroups().map((headerGroup) => (
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
              {studentTabel?.getRowModel()?.rows?.length ? (
                studentTabel?.getRowModel()?.rows?.map((row) => (
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
      </Layout.Body>
    </Layout>
  )
}
