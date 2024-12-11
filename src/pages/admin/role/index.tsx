/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from '@/components/custom/layout'
import React, { useMemo, useState } from 'react'
/* ShadcnUI import */
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Separator } from '@/components/ui/separator'

/*End ShadcnUI */

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import ThreeDots from '@/icons/ThreeDots'
import { Edit, Lock } from 'lucide-react'
import PermissionDialog from './components/PermissionDialog'
import EditAddRoleDialog from './components/EditAddRoleDialog'
import { usePermission } from '@/hooks/usePermissions'
import AvatarPopover from '@/components/AvatarPopover'
import { useQuery } from '@tanstack/react-query'
import { GetAllRoles } from '@/services/admin/role.service'

import moment from 'moment'
import SectionLoading from '@/components/Loading/SectionLoading'
import useParamsVariables from '@/hooks/useParamsVariable'
import { isUndefined, omitBy } from 'lodash'
import SearchInput from '../components/Search'
import PaginationCustom from '@/components/Pagination'
import LoadingCircle from '@/components/Loading/LoadingCircle'
import { BASIC_ROLE } from '@/constants/role'
import { formatSystemDate } from '@/utils'
interface IRole {
  roleId: number
  name: string
  displayName: string
  roleStatus: string
  slug: string
  createdDateTime: string | null
  updatedDateTime: string | null
}
// Permission table type
// Type Permission

type QueryParams = {
  pageIndex?: string
  searchTerm?: string
}

export type QueryConfig = {
  [key in keyof QueryParams]: string
}
export default function Role() {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [editRole, setEditRole] = useState<undefined | string>(undefined)

  // Filter is not checked list
  const queryParams: QueryParams = useParamsVariables()
  const queryConfig: QueryConfig = omitBy(
    {
      pageIndex: queryParams.pageIndex || '1',
      searchTerm: queryParams.searchTerm || ''
    },
    isUndefined
  )
  // Filter is checked list
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['roles', queryConfig],
    queryFn: () => GetAllRoles(queryConfig),
    select: (data) => data?.data?.value
  })
  // Table Columns
  const columns = [
    {
      id: 'displayName',
      header: () => <p className=''>Display Name</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='font-semibold'>{row.original.displayName}</p>
      },
      enableSorting: false,
      enableHiding: false
    },

    {
      id: 'name',
      header: () => <p className=''>Name</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='font-semibold'>{row?.original?.name}</p>
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'createdDateTime',
      header: () => <p className=''>Create Date</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='font-semibold'>{formatSystemDate(row.original.createdDateTime)}</p>
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'Updated Date',
      header: () => <p className=''>Updated Date</p>,
      cell: ({ row }: { row: any }) => {
        return (
          <p className='font-semibold'>
            {row?.original?.updatedDateTime ? moment(row?.original?.updatedDateTime).format('DD/MM/YYYY') : ''}
          </p>
        )
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'status',
      header: () => <p className=''>Status</p>,
      cell: ({ row }: { row: any }) => {
        return (
          <p className={`font-bold' ${row.original.roleStatus == 1 ? 'text-primary-1' : 'text-red-500'}`}>
            {row?.original?.roleStatus == 1 ? 'Active' : 'Inactive'}
          </p>
        )
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'action',
      header: () => <p className='text-center'>Action</p>,
      cell: ({ row }: { row: any }) => {
        return (
          <div
            className={`flex items-center justify-center font-base ${row.original?.name == BASIC_ROLE.DIRECTOR && 'cursor-not-allowed'}`}
          >
            {row.original?.name == BASIC_ROLE.DIRECTOR ? (
              <Lock></Lock>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className=''>
                  <ThreeDots></ThreeDots>
                </DropdownMenuTrigger>
                {row.original?.name == BASIC_ROLE.DIRECTOR ? (
                  <Lock></Lock>
                ) : (
                  <DropdownMenuContent className='rounded-xl min-w-[160px]'>
                    {UPDATE && (
                      <>
                        <DropdownMenuItem
                          className='flex items-center w-full p-3 mb-2 text-sm text-center rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none gap-x-[18px]'
                          onSelect={() => {
                            setEditRole(row.original?.roleId)
                            setOpenDialog(true)
                          }}
                        >
                          <Edit className='w-5 h-5'></Edit>
                          Update role
                        </DropdownMenuItem>
                        <Separator className='mb-2'></Separator>
                        <PermissionDialog roleId={row.original.roleId}></PermissionDialog>
                      </>
                    )}
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            )}
          </div>
        )
      },
      enableSorting: false,
      enableHiding: false
    }
  ]
  // End Table Columns
  /* init role table */
  const roleTable = useReactTable({
    data: data?.items ? data.items : [],
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const { CREATE, VIEW, UPDATE, DELETE } = usePermission('ROLE', ['CREATE', 'VIEW', 'UPDATE', 'DELETE'])
  /* end init role table */
  return (
    <Layout>
      <Layout.Header className='flex items-center justify-between'>
        <h2 className='text-4xl font-bold text-primary'>Role Management</h2>
        <AvatarPopover></AvatarPopover>
      </Layout.Header>
      <Layout.Body className='relative'>
        <SearchInput path='/admin/role' placeholder='Search in here' queryConfig={queryConfig}></SearchInput>
        <div className='flex justify-end my-5'>
          <EditAddRoleDialog
            refetch={refetch}
            open={openDialog}
            setOpenDialog={setOpenDialog}
            idRole={editRole}
            setEditRole={setEditRole}
            CREATE_PERMISSION={CREATE}
          ></EditAddRoleDialog>
        </div>
        {isFetching && <LoadingCircle></LoadingCircle>}
        {data && data.items && (
          <Table className='border'>
            <TableHeader>
              {roleTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {roleTable?.getRowModel()?.rows?.length ? (
                roleTable?.getRowModel()?.rows?.map((row) => (
                  <TableRow
                    key={row.id}
                    className={`cursor-pointer`}
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
                  <TableCell colSpan={columns?.length} className='h-24 font-medium text-center'>
                    No Data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        {data && data.items.length > 0 && (
          <PaginationCustom
            queryConfig={queryConfig}
            className='mt-7'
            totalPage={data && Math.ceil(data?.totalCount / data?.pageSize)}
          ></PaginationCustom>
        )}
      </Layout.Body>
    </Layout>
  )
}
