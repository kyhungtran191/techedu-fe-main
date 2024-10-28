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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

/*End ShadcnUI */

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import ThreeDots from '@/icons/ThreeDots'
import { Edit, Pen } from 'lucide-react'
import PermissionDialog from './components/PermissionDialog'
import { UserNav } from '@/components/custom/user-nav'
import EditAddRoleDialog from './components/EditAddRoleDialog'
import { usePermission } from '@/hooks/usePermissions'

interface IRole {
  _id: number
  name: string
  slug: string
  created_date: string | null
  permissions: []
}
// Permission table type
// Type Permission
const roleData: IRole[] = [
  {
    _id: 1,
    name: 'Student',
    slug: 'student',
    created_date: new Date().toLocaleDateString('vi-VN'),
    permissions: []
  },
  {
    _id: 2,
    name: 'Instructor',
    slug: 'instructor',
    created_date: new Date().toLocaleDateString('vi-VN'),
    permissions: []
  },
  {
    _id: 3,
    name: 'Admin',
    slug: 'admin',
    created_date: new Date().toLocaleDateString('vi-VN'),
    permissions: []
  }
]
export default function Role() {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [editRole, setEditRole] = useState<undefined | string>(undefined)

  // Filter is not checked list
  // Filter is checked list
  console.log(1)
  // Table Columns
  const columns = [
    {
      id: 'name',
      header: () => <p className=''>Name</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='font-semibold'>{row.original.name}</p>
      },
      enableSorting: false,
      enableHiding: false
    },

    {
      id: 'slug',
      header: () => <p className=''>Slug</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='font-semibold'>{row.original.slug}</p>
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'created_date',
      header: () => <p className=''>Create Date</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='font-semibold'>{row.original.created_date}</p>
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'action',
      header: () => <p className='text-center'>Action</p>,
      cell: ({ row }: { row: any }) => {
        return (
          <div className='flex items-center justify-center font-base'>
            <DropdownMenu>
              <DropdownMenuTrigger className=''>
                <ThreeDots></ThreeDots>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='rounded-xl min-w-[160px]'>
                {UPDATE && (
                  <DropdownMenuItem
                    className='flex items-center w-full p-3 mb-2 text-sm text-center rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none gap-x-[18px]'
                    onSelect={() => {
                      setEditRole(row.original._id)
                      setOpenDialog(true)
                    }}
                  >
                    <Edit className='w-5 h-5'></Edit>
                    Update role
                  </DropdownMenuItem>
                )}
                <Separator className='mb-2'></Separator>
                <PermissionDialog authorizeAuthId={row.original._id}></PermissionDialog>
              </DropdownMenuContent>
            </DropdownMenu>
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
    data: roleData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const { CREATE, VIEW, UPDATE, DELETE } = usePermission('ROLE', ['CREATE', 'VIEW', 'UPDATE', 'DELETE'])
  /* end init role table */
  return (
    <Layout>
      <Layout.Header className='flex items-center justify-between'>
        <h2 className='text-4xl font-bold text-primary'>Role Management</h2>
        <UserNav></UserNav>
      </Layout.Header>
      <Layout.Body>
        <div className='flex justify-end my-5'>
          <EditAddRoleDialog
            open={openDialog}
            setOpenDialog={setOpenDialog}
            idRole={editRole}
            setEditRole={setEditRole}
            CREATE_PERMISSION={CREATE}
          ></EditAddRoleDialog>
        </div>

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
                <TableCell colSpan={columns?.length} className='h-24 text-center'>
                  {/* Loading section */}
                  {/* <ComponentsLoading></ComponentsLoading> */}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Layout.Body>
    </Layout>
  )
}
