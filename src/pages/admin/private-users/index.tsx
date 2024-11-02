import { Layout } from '@/components/custom/layout'
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
import useParamsVariables from '@/hooks/useParamsVariable'
import SearchInput from '../components/Search'
import FilterRole from '../components/FilterRoles'
import FilterStatus from '../components/FilterStatus'
import AvatarPopover from '@/components/AvatarPopover'
import { PrivateUserQueryConfig, PrivateUserQueryParams } from '@/@types/admin/private-user.type'
import { useQuery } from '@tanstack/react-query'
import { GetAllPrivateUsers, ResendMail } from '@/services/admin/private-users.service'
import LoadingCircle from '@/components/Loading/LoadingCircle'
import { formatRolesDisplay, formatSystemDate } from '@/utils'
import { USER_STATUS } from '@/constants'
import { toast } from 'react-toastify'
import { useToggleBlockUserMutation } from '@/mutations/useToggleBlockUserMutation'

export default function PrivateUserManage() {
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

  // check user permission
  const { CREATE, DELETE, UPDATE, VIEW } = usePermission('PRIVATE_USER', ['VIEW', 'CREATE', 'DELETE', 'UPDATE'])

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [editUser, setEditUser] = useState<undefined | string>(undefined)

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['private-users', queryConfig],
    queryFn: () => GetAllPrivateUsers(queryConfig),
    select: (res) => res.data.value
  })

  const handleResendMail = (email: string) => {
    ResendMail(email)
      .then((data) => {
        toast.success(`Resend success email to: ${email}`)
      })
      .catch((err) => {
        const errMsg = err.response.data.Error.Message || 'Something when wrong'
        toast.error(errMsg)
      })
  }

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
                {UPDATE && (
                  <>
                    <DropdownMenuItem
                      className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'
                      onSelect={() => {
                        setEditUser(row.original.userId)
                        setOpenDialog(true)
                      }}
                    >
                      Update Member
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'>
                      {row.original.userStatus == USER_STATUS.INACTIVE ? 'Activated Member' : 'Inactivate Member'}
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'>
                  Activity logs
                </DropdownMenuItem>
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
                {row.original.userStatus == USER_STATUS.INACTIVE && (
                  <DropdownMenuItem
                    className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'
                    onClick={() => handleResendMail(row.original.email)}
                  >
                    Resend mail
                  </DropdownMenuItem>
                )}
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
    data: data && data?.items ? data?.items : [],
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <Layout>
      <Layout.Header className=''>
        <div className='flex items-center ml-auto space-x-4'>
          <AvatarPopover />
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
            <FilterRole
              clientOption={false}
              queryConfig={queryConfig}
              className='col-span-2'
              path={'/admin/private-users'}
            ></FilterRole>
            {/* 2 */}
            <FilterStatus path='/admin/private-users' queryConfig={queryConfig}></FilterStatus>
          </div>
          <EditAddUserDialog
            CREATE_PERMISSION={CREATE}
            open={openDialog}
            refetch={refetch}
            setOpenDialog={setOpenDialog}
            idUser={editUser}
            setEditUser={setEditUser}
            wrapperClass='w-fit ml-auto'
          ></EditAddUserDialog>
        </div>
        <div className='mt-5 w-full overflow-auto h-[500px] rounded-lg no-scrollbar'>
          {isFetching && <LoadingCircle></LoadingCircle>}
          {!isFetching && (
            <Table className='w-full h-full overflow-auto'>
              <TableHeader className='sticky top-0 z-20 py-4 bg-white border-b tb:-top-3'>
                {privateUserTable.getHeaderGroups().map((headerGroup) => (
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
                    <TableCell colSpan={columns?.length} className='h-24 font-bold text-center '>
                      No data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
        {data && data.items.length > 0 && (
          <PaginationCustom queryConfig={queryConfig} className='mt-7' totalPage={data.totalPage}></PaginationCustom>
        )}
      </Layout.Body>
    </Layout>
  )
}
