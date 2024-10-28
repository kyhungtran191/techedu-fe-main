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

interface TCreateEditRole {
  open: boolean
  idRole?: string
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
  setEditRole: React.Dispatch<React.SetStateAction<string | undefined>>
  refetch?: () => void
  wrapperClass?: string
  CREATE_PERMISSION: boolean
}

export default function EditAddRoleDialog({
  wrapperClass,
  CREATE_PERMISSION,
  setEditRole,
  open,
  setOpenDialog,
  idRole
}: TCreateEditRole) {
  const schema = yup.object().shape({
    role_name: yup.string().required('This field is required')
  })
  // // Default use of usePermissions
  // const { CREATE, DELETE, UPDATE, VIEW } = usePermission('PERMISSIONS.SYSTEM.ROLE', [
  //   'CREATE',
  //   'VIEW',
  //   'UPDATE',
  //   'DELETE'
  // ])

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleForm = ({ role_name }: { role_name: string }) => {
    console.log(role_name)
  }

  console.log(open)
  return (
    <div>
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
          className=''
          onCloseAutoFocus={() => {
            setEditRole(undefined)
            setOpenDialog(false)
            // reset(defaultValues)
          }}
        >
          <DialogHeader>
            <DialogTitle className='text-center'>{idRole ? 'Update role' : 'Add new role'}</DialogTitle>
          </DialogHeader>
          {/* Loading component when fetching user data */}
          {/* {userDetailData.isLoading && idUser && <ComponentsLoading></ComponentsLoading>} */}
          {/* {(!userDetailData.isLoading || !idUser) && */}
          <form className='grid gap-2 py-4' onSubmit={handleSubmit(handleForm)}>
            <div>
              <Label htmlFor='role_name'>Role Name</Label>
              <Controller
                control={control}
                name='role_name'
                render={({ field }) => (
                  <Input className='px-4 py-6 mt-3 text-sm outline-none' placeholder='Role Name' {...field}></Input>
                )}
              />
              <div className='text-sm font-medium text-red-500 '>{errors?.role_name && errors?.role_name?.message}</div>
            </div>

            <DialogFooter>
              <Button type='submit' className='w-full mt-4' disabled={!isValid} variant={'custom'}>
                {idRole ? 'Update ' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
          {/* )} */}
        </DialogContent>
      </Dialog>
    </div>
  )
}
