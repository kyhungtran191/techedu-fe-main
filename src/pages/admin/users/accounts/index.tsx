import React, { useState } from 'react'
import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/custom/user-nav'
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
import { MultiSelect, OptionType, SelectedType } from '@/components/MultiSelect'

type ITypeAccountsTable = {
  _id: string
  fullName: string
  email: string
  createdAt: string
  roles: string[]
  status: 0 | 1
}

const mockData: ITypeAccountsTable[] = [
  {
    _id: '1',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    roles: ['Client'],
    createdAt: '2023-09-15',
    status: 1
  },
  {
    _id: '2',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    roles: ['Admin'],
    createdAt: '2023-08-22',
    status: 0
  },
  {
    _id: '3',
    fullName: 'Michael Johnson',
    roles: ['Manager'],
    email: 'michael.johnson@example.com',
    createdAt: '2023-07-10',
    status: 1
  },
  {
    _id: '4',
    fullName: 'Emily Davis',
    roles: ['Manager'],
    email: 'emily.davis@example.com',
    createdAt: '2023-10-01',
    status: 0
  },
  {
    _id: '5',
    fullName: 'William Brown',
    roles: ['Client'],
    email: 'william.brown@example.com',
    createdAt: '2023-06-18',
    status: 1
  },
  {
    _id: '4',
    fullName: 'Emily Davis',
    roles: ['Manager'],
    email: 'emily.davis@example.com',
    createdAt: '2023-10-01',
    status: 0
  },
  {
    _id: '5',
    fullName: 'William Brown',
    roles: ['Client'],
    email: 'william.brown@example.com',
    createdAt: '2023-06-18',
    status: 1
  },
  {
    _id: '4',
    fullName: 'Emily Davis',
    roles: ['Manager'],
    email: 'emily.davis@example.com',
    createdAt: '2023-10-01',
    status: 0
  },
  {
    _id: '5',
    fullName: 'William Brown',
    roles: ['Client'],
    email: 'william.brown@example.com',
    createdAt: '2023-06-18',
    status: 1
  }
]

export default function Accounts() {
  const columns = [
    {
      id: 'fullName',
      header: () => <p className=''>Full Name</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='font-medium'>{row.original.fullName}</p>
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
      id: 'roles',
      header: () => <p className=''>Roles</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='font-medium'>{row.original.roles.join(', ')}</p>
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'createdAt',
      header: () => <p className=''>Created date</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='font-medium'>{row.original.createdAt}</p>
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
            {row.original.status == 0 ? 'Inactive' : 'Active'}
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
                  Edit Account
                </DropdownMenuItem>
                <DropdownMenuItem className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'>
                  {row.original.status == 0 ? 'Activated Member' : 'Inactivate Member'}
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

  const accountTable = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const options: OptionType[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'Manager', value: 'manager' },
    {
      label: 'Client',
      value: 'client'
    }
  ]

  const [selected, setSelected] = useState<SelectedType[] | []>([])

  return (
    <Layout>
      {' '}
      <Layout.Header>
        <div className='flex items-center ml-auto space-x-4'>
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Accounts</h1>
          <div className='flex items-center space-x-2'>
            <Button>Export to CSV</Button>
          </div>
        </div>
        <div className='grid gap-4 mt-3 lg:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>Total Accounts</CardTitle>
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
              <CardTitle className='text-sm font-medium'>Private Accounts</CardTitle>
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
              <CardTitle className='text-sm font-medium'>Client Accounts</CardTitle>
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
            <MultiSelect selected={selected} onChange={setSelected} options={options} name='Roles'></MultiSelect>
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
              {accountTable.getHeaderGroups().map((headerGroup) => (
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
              {accountTable?.getRowModel()?.rows?.length ? (
                accountTable?.getRowModel()?.rows?.map((row) => (
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
