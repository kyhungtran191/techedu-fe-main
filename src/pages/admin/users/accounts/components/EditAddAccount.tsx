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
import { useQuery } from '@tanstack/react-query'
import { GetDetailAccount } from '@/services/admin/accounts.service'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EMAIL_REG } from '@/constants/validate-rules'

interface TCreateEditAccount {
  open: boolean
  idUser?: string
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
  setEditUser: React.Dispatch<React.SetStateAction<string | undefined>>
}

const schema = yup.object().shape({
  email: yup.string().required('Email is required').matches(EMAIL_REG, 'Format email error'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  role: yup.string().required('Role is required'),
  userStatus: yup.string()
})

type TDefaultValue = {
  firstName: string
  lastName: string
  email: string
  role: string
  userStatus: string
}

export default function EditAddAccount({ open, setEditUser, setOpenDialog, idUser }: TCreateEditAccount) {
  const accountDetailData = useQuery({
    queryKey: ['accounts_detail', idUser],
    queryFn: (_) => GetDetailAccount(idUser as string),
    enabled: idUser !== undefined,
    select: (data) => data.data.value,
    onSuccess: (data) => {
      reset({
        email: data?.email,
        firstName: data?.firstName,
        lastName: data?.lastName,
        role: data?.roles[0]?.displayName,
        userStatus: data?.userStatus
      })
    }
  })

  const defaultValues: TDefaultValue = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    userStatus: ''
  }

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
    setError,
    getValues
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  })

  return (
    <Dialog open={open} onOpenChange={setOpenDialog}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Account Profile</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div>
            <Label htmlFor='firstName'>First Name</Label>
            <Controller
              control={control}
              name='firstName'
              render={({ field }) => (
                <Input className='px-4 py-6 text-sm outline-none' placeholder='First Name' disabled {...field}></Input>
              )}
            />
            <div className='text-sm font-medium text-red-500 '>{errors?.firstName && errors?.firstName?.message}</div>
          </div>
          <div>
            <Label htmlFor='firstName'>Last Name</Label>
            <Controller
              control={control}
              name='lastName'
              render={({ field }) => (
                <Input className='px-4 py-6 text-sm outline-none' placeholder='Last Name' disabled {...field} ></Input>
              )}
            />
            <div className='text-sm font-medium text-red-500 '>{errors?.lastName && errors?.firstName?.message}</div>
          </div>
          <div>
            <Label htmlFor='email'>Email</Label>
            <Controller
              control={control}
              name='email'
              render={({ field }) => (
                <Input className='px-4 py-6 text-sm outline-none' placeholder='Email' {...field} disabled></Input>
              )}
            />
            <div className='text-sm font-medium text-red-500 '>{errors?.firstName && errors?.firstName?.message}</div>
          </div>
          <div>
            <Label htmlFor='firstName'>Role</Label>
            <Controller
              control={control}
              name='role'
              render={({ field }) => (
                <Input className='px-4 py-6 text-sm outline-none' placeholder='Role' {...field} disabled></Input>
              )}
            />
            <div className='text-sm font-medium text-red-500 '>{errors?.firstName && errors?.firstName?.message}</div>
          </div>
          <div>
            <Label htmlFor='status'>Status</Label>
            <Controller
              control={control}
              name='userStatus'
              render={({ field }) => (
                <Input className='px-4 py-6 text-sm outline-none' placeholder='Status' {...field} disabled></Input>
              )}
            />
            <div className='text-sm font-medium text-red-500 '>{errors?.firstName && errors?.firstName?.message}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
