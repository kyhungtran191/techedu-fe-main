import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/custom/user-nav'
import { Button } from '@/components/ui/button'

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import ThreeDots from '@/icons/ThreeDots'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import PaginationCustom from '@/components/Pagination'
import { useState } from 'react'
import EditAddUserDialog from './components/EditAddDialog'
import { usePermission } from '@/hooks/usePermissions'
import { isUndefined, omitBy } from 'lodash'
import { useNavigate } from 'react-router-dom'
import useParamsVariables from '@/hooks/useParamsVariable'
import SearchInput from '../components/Search'
import FilterRole from '../components/FilterRoles'
import FilterStatus from '../components/FilterStatus'

type ITypePrivateUserTable = {
  _id: string
  fullName: string
  email: string
  roles: string[]
  status: number
  createdAt: string
}

const mockData: ITypePrivateUserTable[] = [
  {
    _id: '28cd8fba-3bc7-4c9c-aabf-8762e77e5893',
    fullName: 'Teresa Scott',
    email: 'larsenjoshua@yahoo.com',
    roles: ['Manager'],
    status: 0,
    createdAt: '2024-10-22 09:25:30'
  },
  {
    _id: '3b051a70-465f-4cf3-9a2e-b1f4d5b5d006',
    fullName: 'Laura Wise',
    email: 'robertporter@yahoo.com',
    roles: ['Admin'],
    status: 1,
    createdAt: '2024-10-22 09:25:30'
  },
  {
    _id: '8beddf7d-2959-43f9-ae5b-a64a92913f5d',
    fullName: 'Gary Copeland',
    email: 'valdezmichael@gmail.com',
    roles: ['Instructor', 'Student'],
    status: 1,
    createdAt: '2024-10-22 09:25:30'
  },
  {
    _id: 'f3a17e3f-bbfc-4600-8519-2a917c5cdfae',
    fullName: 'Savannah Hernandez',
    email: 'tgomez@knox.org',
    roles: ['Instructor', 'Student'],
    status: 1,
    createdAt: '2024-10-22 09:25:30'
  },
  {
    _id: '709fc22b-4946-4c6c-93b6-3bfaea5f6d1c',
    fullName: 'Scott Hall',
    email: 'collinssamuel@hotmail.com',
    roles: ['Manager'],
    status: 1,
    createdAt: '2024-10-22 09:25:30'
  }
]

type QueryParams = {
  page?: string
  limit?: string
  search?: string
  roles?: string
  status?: string
}

export type QueryConfig = {
  [key in keyof QueryParams]: string
}

export default function PrivateUserManage() {
  const queryParams: QueryParams = useParamsVariables()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '8',
      roles: queryParams.roles,
      status: queryParams.status,
      search: queryParams.search
    },
    isUndefined
  )

  // check user permission
  const { CREATE, DELETE, UPDATE, VIEW } = usePermission('PRIVATE_USER', ['VIEW', 'CREATE', 'DELETE', 'UPDATE'])

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [editUser, setEditUser] = useState<undefined | string>(undefined)

  const columns = [
    {
      id: 'fullName',
      header: () => <p className=''>fullName</p>,
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
                {UPDATE && (
                  <>
                    <DropdownMenuItem
                      className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'
                      onSelect={() => {
                        setEditUser(row.original._id)
                        setOpenDialog(true)
                      }}
                    >
                      Update Member
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'>
                      {row.original.status == 0 ? 'Activated Member' : 'Inactivate Member'}
                    </DropdownMenuItem>
                  </>
                )}
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

  const privateUserTable = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <Layout>
      <Layout.Header className=''>
        <div className='flex items-center ml-auto space-x-4'>
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Private Users</h1>
          <div className='flex items-center space-x-2'>
            <Button>Export to CSV</Button>
          </div>
        </div>
        <div className='grid gap-2 mt-4 xl:grid-cols-2'>
          <SearchInput
            queryConfig={queryConfig}
            path='/admin/private-users'
            placeholder='Search in private users'
          ></SearchInput>
        </div>
        <div className='grid grid-cols-2 mt-5'>
          <div className='grid items-center grid-cols-2 gap-2 md:grid-cols-3'>
            <FilterRole queryConfig={queryConfig} className='col-span-2' path={'/admin/private-users'}></FilterRole>
            {/* 2 */}
            <FilterStatus path='/admin/private-users' queryConfig={queryConfig}></FilterStatus>
          </div>
          {CREATE && (
            <EditAddUserDialog
              CREATE_PERMISSION={CREATE}
              open={openDialog}
              setOpenDialog={setOpenDialog}
              idUser={editUser}
              setEditUser={setEditUser}
              wrapperClass='w-fit ml-auto'
            ></EditAddUserDialog>
          )}
        </div>
        <div className='mt-5 w-full overflow-auto h-[500px] rounded-lg no-scrollbar'>
          <Table className='w-full h-full overflow-auto'>
            <TableHeader className='sticky top-0 z-20 py-4 bg-white border-b tb:-top-3'>
              {privateUserTable.getHeaderGroups().map((headerGroup) => (
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
              {privateUserTable?.getRowModel()?.rows?.length ? (
                privateUserTable?.getRowModel()?.rows?.map((row) => (
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
        <PaginationCustom totalPage={10} className='mt-3' queryConfig={queryConfig}></PaginationCustom>
      </Layout.Body>
    </Layout>
  )
}
