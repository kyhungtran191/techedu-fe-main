import React, { useState } from 'react'
import { Layout } from '@/components/custom/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import ThreeDots from '@/icons/ThreeDots'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import PaginationCustom from '@/components/Pagination'
import SearchInput from '../../components/Search'
import { isUndefined, omitBy } from 'lodash'
import useParamsVariables from '@/hooks/useParamsVariable'
import FilterRole from '../../components/FilterRoles'
import FilterStatus from '../../components/FilterStatus'
import AvatarPopover from '@/components/AvatarPopover'
import { PrivateUserQueryConfig, PrivateUserQueryParams } from '@/@types/admin/private-user.type'
import { GetAllAccounts } from '@/services/admin/accounts.service'
import { useQuery } from '@tanstack/react-query'
import { formatRolesDisplay, formatSystemDate } from '@/utils'
import { USER_STATUS } from '@/constants'
import LoadingCircle from '@/components/Loading/LoadingCircle'
import EditAddAccount from './components/EditAddAccount'
import { useToggleBlockUserMutation } from '@/mutations/useToggleBlockUserMutation'
import { useAppContext } from '@/hooks/useAppContext'
import { BASIC_ROLE } from '@/constants/role'
import { APP_PERMISSIONS } from '@/constants/permissions'

export default function Accounts() {
  const queryParams: PrivateUserQueryParams = useParamsVariables()
  const queryConfig: PrivateUserQueryConfig = omitBy(
    {
      pageIndex: queryParams.pageIndex || '1',
      pageSize: queryParams.pageSize || '8',
      roles: queryParams.roles,
      userStatus: queryParams.userStatus,
      searchTerm: queryParams.searchTerm
    },
    isUndefined
  )

  const [idUser, setIdUser] = useState<string | undefined>(undefined)
  const [open, setOpen] = useState<boolean>(false)
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['private-users', queryConfig],
    queryFn: () => GetAllAccounts(queryConfig),
    select: (res) => res.data.value
  })

  const { profile, permissions } = useAppContext()

  const { mutate: toggleBlock } = useToggleBlockUserMutation(refetch)

  const columns = [
    {
      id: 'fullName',
      header: () => <p className=''>Full Name</p>,
      cell: ({ row }: { row: any }) => {
        return (
          <p className='font-medium'>
            {row.original.firstName} {row.original.lastName}
          </p>
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
      id: 'roles',
      header: () => <p className=''>Roles</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='font-medium'>{formatRolesDisplay(row.original.roles)}</p>
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'createdAt',
      header: () => <p className=''>Created date</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='font-medium'>{formatSystemDate(row.original.createdDateTime)}</p>
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
            className={`w-fit mx-auto px-3 py-2 tex  rounded-lg ${row.original.userStatus !== USER_STATUS.ACTIVE ? 'bg-red-500 text-white' : 'bg-primary-1 text-white'}`}
          >
            {row.original.userStatus}
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
                  onSelect={() => {
                    setIdUser(row.original.userId)
                    setOpen(true)
                  }}
                >
                  View Member
                </DropdownMenuItem>
                {(profile?.roles.includes(BASIC_ROLE.DIRECTOR) ||
                  permissions?.includes(APP_PERMISSIONS.USER.BLOCK as string)) && (
                  <DropdownMenuItem
                    className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'
                    onSelect={() => {
                      toggleBlock({
                        userId: row.original.userId,
                        isBlock: row.original.userStatus !== USER_STATUS.BANNED
                      })
                    }}
                  >
                    {row.original.userStatus === USER_STATUS.BANNED ? 'Un ban this account' : 'Ban this account'}
                  </DropdownMenuItem>
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

  const accountTable = useReactTable({
    data: data && data?.items ? data?.items : [],
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
          <SearchInput queryConfig={queryConfig} path='/admin/accounts' placeholder='Search in accounts'></SearchInput>
        </div>
        <div className='flex items-center justify-between mt-3'>
          <div className='grid items-center w-full grid-cols-2 gap-2 md:grid-cols-3'>
            {/* 2 */}
            <div className='grid items-center grid-cols-2 gap-2 md:grid-cols-3'>
              <FilterRole queryConfig={queryConfig} className='col-span-2' path={'/admin/accounts'}></FilterRole>
              {/* 2 */}
              <FilterStatus path='/admin/accounts' queryConfig={queryConfig}></FilterStatus>
            </div>
          </div>
          <EditAddAccount open={open} setEditUser={setIdUser} idUser={idUser} setOpenDialog={setOpen}></EditAddAccount>
        </div>
        <div className='mt-5 w-full overflow-auto h-[500px] rounded-lg no-scrollbar'>
          {isFetching && <LoadingCircle></LoadingCircle>}
          {!isFetching && (
            <Table className='w-full h-full overflow-auto'>
              <TableHeader className='sticky top-0 z-20 bg-white border-b sm:py-4 tb:-top-3'>
                {accountTable.getHeaderGroups().map((headerGroup) => (
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
                    <TableCell colSpan={columns?.length} className='h-24 font-semibold text-center'>
                      No data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
        <PaginationCustom
          totalPage={data?.totalPage as number}
          queryConfig={queryConfig}
          className='mt-3'
        ></PaginationCustom>
      </Layout.Body>
    </Layout>
  )
}
