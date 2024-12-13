import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AddNewRole, GetDetailRole, UpdateRole } from '@/services/admin/role.service'
import { toast } from 'react-toastify'
import SectionLoading from '@/components/Loading/SectionLoading'
import { Textarea } from '@/components/ui/textarea'
import { RoleParams, RoleUpdateParams } from '@/@types/admin/role.type'

interface TCreateEditRole {
  open: boolean
  idRole?: string
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
  setEditRole: React.Dispatch<React.SetStateAction<string | undefined>>
  refetch: any
  wrapperClass?: string
  CREATE_PERMISSION: boolean
}

const defaultValues = {}

export default function EditAddRoleDialog({
  wrapperClass,
  CREATE_PERMISSION,
  setEditRole,
  open,
  setOpenDialog,
  idRole,
  refetch
}: TCreateEditRole) {
  const schema = yup.object().shape({
    displayName: yup.string().required('Display name  is required'),
    name: yup.string().required('Name is required'),
    description: yup.string().required('Role description is required')
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  })

  const { isLoading, isFetching } = useQuery({
    queryKey: ['role-detail', idRole],
    queryFn: () => GetDetailRole(idRole as string),
    enabled: idRole !== undefined,
    select: (data) => data?.data?.value,
    onSuccess: (data) => {
      reset({
        displayName: data.displayName,
        name: data.name,
        description: data.description || 'Example'
      })
    }
  })
  // Update Role
  const updateRoleMutation = useMutation({
    mutationFn: (roleData: RoleParams) => UpdateRole(roleData)
  })
  // Create Role
  const createRoleMutation = useMutation({
    mutationFn: (body: RoleParams) => AddNewRole(body)
  })

  const handleForm = (data: RoleParams) => {
    if (idRole) {
      updateRoleMutation.mutate(data, {
        onSuccess: () => {
          toast.success('Update successfully!')
          refetch()
          reset(defaultValues)
          setEditRole(undefined)
          setOpenDialog(false)
        },
        onError(data: any) {
          toast.error(data.response.data.message)
        }
      })
    } else {
      createRoleMutation.mutate(data, {
        onSuccess() {
          toast.success('Add new role successfully!')
          refetch()
          reset(defaultValues)
          setOpenDialog(false)
        },
        onError(data: any) {
          toast.error(data.response.data.message)
        }
      })
    }
  }

  return (
    <>
      <Dialog defaultOpen={open} open={open} onOpenChange={setOpenDialog}>
        {CREATE_PERMISSION && (
          <DialogTrigger
            className={`outline-none flex items-center justify-center flex-shrink-0 p-3 rounded-lg cursor-pointer bg-primary-1 text-white ${wrapperClass}`}
          >
            <Plus></Plus>
            <span>Add new role</span>
          </DialogTrigger>
        )}
        <DialogContent
          className='min-h-[270px]'
          onCloseAutoFocus={() => {
            setEditRole(undefined)
            setOpenDialog(false)
            reset({
              displayName: ''
            })
          }}
        >
          {((idRole && isLoading) || createRoleMutation.isLoading || updateRoleMutation) && (
            <SectionLoading className='z-30'></SectionLoading>
          )}
          <DialogHeader>
            <DialogTitle className='text-center'>{idRole ? 'Update role' : 'Add new role'}</DialogTitle>
          </DialogHeader>

          {!isFetching && (
            <form className='grid gap-2 py-4' onSubmit={handleSubmit(handleForm)}>
              <div>
                <Label htmlFor='role_name'>Display Name</Label>
                <Controller
                  control={control}
                  name='displayName'
                  render={({ field }) => (
                    <Input
                      className='px-4 py-6 mt-3 text-sm outline-none'
                      placeholder='Role Display Name'
                      {...field}
                    ></Input>
                  )}
                />
                <div className='text-sm font-medium text-red-500 '>
                  {errors?.displayName && errors?.displayName?.message}
                </div>
              </div>

              <div>
                <Label htmlFor='role_name'>Role Name</Label>
                <Controller
                  control={control}
                  name='name'
                  render={({ field }) => (
                    <Input
                      className='px-4 py-6 mt-3 text-sm outline-none disabled:bg-neutral-200'
                      disabled={!!idRole}
                      placeholder='Role Name'
                      {...field}
                    ></Input>
                  )}
                />
                <div className='text-sm font-medium text-red-500 '>{errors?.name && errors?.name?.message}</div>
              </div>

              <div>
                <Label htmlFor='description'>Description</Label>
                <Controller
                  control={control}
                  name='description'
                  render={({ field }) => (
                    <Textarea
                      className='px-4 py-6 mt-3 text-sm outline-none focus-visible:ring-0'
                      placeholder='Description...'
                      {...field}
                    ></Textarea>
                  )}
                />
                <div className='text-sm font-medium text-red-500 '>
                  {errors?.description && errors?.description?.message}
                </div>
              </div>

              <DialogFooter>
                <Button type='submit' className='w-full mt-4' disabled={!isValid} variant={'custom'}>
                  {idRole ? 'Update ' : 'Add'}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
