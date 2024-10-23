import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/custom/user-nav'
import { Button } from '@/components/ui/button'
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

import AddNewDialog from './components/AddNewDialog'

type ITypeCategoryTable = {
  _id: string
  name: string
  slug: string
  parentCategory: string | undefined
  status: number
  createdAt: string
}
const mockData: ITypeCategoryTable[] = [
  {
    _id: '1',
    name: 'Development',
    parentCategory: undefined,
    status: 0,
    slug: 'development',
    createdAt: new Date().toLocaleDateString('vi-VN')
  },
  {
    _id: '2',
    name: 'Business',
    parentCategory: undefined,
    status: 1,
    slug: 'business',
    createdAt: new Date().toLocaleDateString('vi-VN')
  },
  {
    _id: '3',
    name: 'IT',
    parentCategory: undefined,
    status: 0,
    slug: 'it',
    createdAt: new Date().toLocaleDateString('vi-VN')
  },
  {
    _id: '4',
    name: 'Marketing',
    parentCategory: undefined,
    status: 0,
    slug: 'marketing',
    createdAt: new Date().toLocaleDateString('vi-VN')
  },
  {
    _id: '4',
    name: 'Design',
    parentCategory: undefined,
    status: 0,
    slug: 'design',
    createdAt: new Date().toLocaleDateString('vi-VN')
  },
  {
    _id: '1',
    name: 'Development',
    parentCategory: undefined,
    status: 0,
    slug: 'development',
    createdAt: new Date().toLocaleDateString('vi-VN')
  },
  {
    _id: '2',
    name: 'Business',
    parentCategory: undefined,
    status: 0,
    slug: 'business',
    createdAt: new Date().toLocaleDateString('vi-VN')
  },
  {
    _id: '3',
    name: 'IT',
    parentCategory: undefined,
    status: 0,
    slug: 'it',
    createdAt: new Date().toLocaleDateString('vi-VN')
  },
  {
    _id: '4',
    name: 'Marketing',
    parentCategory: undefined,
    status: 0,
    slug: 'marketing',
    createdAt: new Date().toLocaleDateString('vi-VN')
  },
  {
    _id: '4',
    name: 'Design',
    parentCategory: undefined,
    status: 0,
    slug: 'design',
    createdAt: new Date().toLocaleDateString('vi-VN')
  }
]

const columns = [
  {
    id: 'name',
    header: () => <p className=''>Category Name</p>,
    cell: ({ row }: { row: any }) => {
      return <p className='font-medium'>{row.original.name}</p>
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'instructor',
    header: () => <p className=''>Slug</p>,
    cell: ({ row }: { row: any }) => {
      return (
        <div className='text-center'>
          <div className=''>{row.original.slug}</div>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'parentCategory',
    header: () => <p className=''>Parent Category</p>,
    cell: ({ row }: { row: any }) => {
      return <p className='font-medium'>{row.original.parentCategory || 'Is Parent'}</p>
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
          className={`w-fit mx-auto px-3 py-2 tex  rounded-lg ${row.original.status == 0 ? 'bg-neutral-silver-1 text-neutral-black' : row.original.status == 1 ? 'bg-primary-1 text-white' : 'bg-[#F0D355] text-black'}`}
        >
          {row.original.status == 0 ? 'Inactive' : 'Active'}
        </p>
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'created_at',
    header: () => <p className=''>Created Date</p>,
    cell: ({ row }: { row: any }) => {
      return (
        <div className='text-center'>
          <div className=''>{row.original.createdAt}</div>
        </div>
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
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'>
                Disabled
              </DropdownMenuItem>
              <DropdownMenuItem className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'>
                Activity logs
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

export default function Category() {
  const categoryTable = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <Layout>
      <Layout.Header>
        <div className='flex items-center ml-auto space-x-4'>
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body className=''>
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Categories</h1>
          <div className='flex items-center space-x-2'>
            <Button>Export to CSV</Button>
          </div>
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
          <div className='grid items-center grid-cols-2 gap-2 md:grid-cols-3'>
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
          <AddNewDialog></AddNewDialog>
        </div>
        <div className='mt-5 w-full overflow-auto h-[500px] rounded-lg no-scrollbar'>
          <Table className='w-full h-full overflow-auto'>
            <TableHeader className='sticky z-20 py-4 bg-white border-b sm:top-0 tb:-top-3'>
              {categoryTable.getHeaderGroups().map((headerGroup) => (
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
              {categoryTable?.getRowModel()?.rows?.length ? (
                categoryTable?.getRowModel()?.rows?.map((row) => (
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
        <PaginationCustom totalPage={10} className='mt-5'></PaginationCustom>
      </Layout.Body>
    </Layout>
  )
}
