import React, { useEffect } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import { EMAIL_REG, PASSWORD_REG } from '@/utils/regex'
import { OptionType } from '@/components/MultiSelect'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useMutation, useQuery } from '@tanstack/react-query'
// import { createUser, getDetailUser, updateUser } from '@/services/user.services'
// import { TUserAdd } from '@/@types/user.type'
// import { separationFullName, toFullName } from '@/utils/helper'
import { toast } from 'react-toastify'
// import ComponentsLoading from '@/components/loading/ComponentsLoading'
import { EMAIL_REG, PASSWORD_REG } from '@/constants/validate-rules'
import { useGetListRoles } from '@/queries/role'
import { Role } from '@/@types/admin/role.type'
import { TPrivateUserAdd, TPrivateUserUpdate } from '@/@types/admin/private-user.type'
import { AddNewPrivateUser, GetDetailPrivateUser, UpdatePrivateUser } from '@/services/admin/private-users.service'

interface TCreateEditUser {
  open: boolean
  roles?: OptionType[]
  idUser?: string
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
  setEditUser: React.Dispatch<React.SetStateAction<string | undefined>>
  refetch: () => any
  wrapperClass?: string
  CREATE_PERMISSION: boolean
}

type TDefaultValue = {
  password?: string | null | undefined
  firstName: string
  lastName: string
  email: string
  roleId: string
}

export default function EditAddUserDialog({
  open,
  roles,
  refetch,
  setEditUser,
  setOpenDialog,
  wrapperClass,
  idUser,
  CREATE_PERMISSION
}: TCreateEditUser) {
  const schema = yup.object().shape({
    email: yup.string().required('Email is required').matches(EMAIL_REG, 'Format email error'),
    password: yup.string().nullable(), // Allow null values
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    roleId: yup.string().required('Role is required')
  })

  const {
    data: roleData,
    isLoading: isLoadingRole,
    isFetching: isFetchingRole
  } = useGetListRoles(
    {},
    {
      select: (data) => data.data.value.items as Role[]
    }
  )

  const defaultValues: TDefaultValue = {
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    roleId: (roleData && roleData[0]?.roleId) || ''
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

  const userDetailData = useQuery({
    queryKey: ['private_users_detail', idUser],
    queryFn: (_) => GetDetailPrivateUser(idUser as string),
    enabled: idUser !== undefined
  })

  useEffect(() => {
    if (userDetailData.data) {
      const private_user = userDetailData.data.data.value
      reset({
        email: private_user?.email,
        firstName: private_user?.firstName,
        lastName: private_user?.lastName,
        password: '',
        roleId: private_user?.roles && private_user?.roles[0]?.roleId
      })
      setValue('roleId', (private_user?.roles && private_user?.roles[0].roleId) as string)
    }
  }, [userDetailData.data, reset, setValue])

  //** */ Add function mutation

  const createUserMutation = useMutation({
    mutationFn: (body: TPrivateUserAdd) => AddNewPrivateUser(body)
  })

  const updateUserMutation = useMutation({
    mutationFn: (body: TPrivateUserUpdate) => UpdatePrivateUser(body)
  })

  const selectedRoleId = watch('roleId')

  const handleForm = (formData: TDefaultValue) => {
    const { email, firstName, lastName, roleId, password } = formData
    if (idUser) {
      if (password) {
        const validatePasswordRegex = PASSWORD_REG.test(password)
        if (validatePasswordRegex) {
          updateUserMutation.mutate(
            {
              firstName,
              lastName,
              password,
              roleId,
              userId: idUser
            },
            {
              onSuccess: () => {
                toast.success('Update Private User with new password successfully!')
                refetch()
                handleResetDialog()
              },
              onError: (err: any) => {
                const errMsg = err.response.data.Error.Message || 'Something when wrong'
                toast.error(errMsg)
              }
            }
          )
        } else {
          return setError('password', {
            message: 'Invalid format password'
          })
        }
      } else {
        updateUserMutation.mutate(
          {
            firstName,
            lastName,
            password: '',
            roleId,
            userId: idUser
          },
          {
            onSuccess: () => {
              toast.success('Update Private User without new password successfully!')
              refetch()
              handleResetDialog()
            },
            onError: (err: any) => {
              const errMsg = err.response.data.Error.Message || 'Something when wrong'
              toast.error(errMsg)
            }
          }
        )
      }
    } else {
      createUserMutation.mutate(
        {
          email,
          firstName,
          lastName,
          roleId
        },
        {
          onSuccess: () => {
            toast.success('Register new account successfully! Please notice your member to active their account')
            refetch()
            handleResetDialog()
          },
          onError: (data: any) => {
            const message = data.response.data.Error.Message || 'Something went wrong'
            toast.error(message)
          }
        }
      )
    }
  }

  const handleResetDialog = () => {
    setEditUser(undefined)
    setOpenDialog(false)
    reset(defaultValues)
  }

  return (
    <div>
      <Dialog defaultOpen={open} open={open} onOpenChange={setOpenDialog}>
        {CREATE_PERMISSION && (
          <DialogTrigger
            className={`flex items-center justify-center flex-shrink-0 p-3 rounded-lg cursor-pointer bg-primary-1 text-white ${wrapperClass}`}
          >
            <Plus></Plus>
            <span>Add new member</span>
          </DialogTrigger>
        )}
        <DialogContent className='' onCloseAutoFocus={handleResetDialog}>
          <DialogHeader>
            <DialogTitle className='text-center'>{idUser ? 'Update User' : 'Add new User'}</DialogTitle>
          </DialogHeader>
          <form className='grid gap-2 py-4' onSubmit={handleSubmit(handleForm)}>
            <div>
              <Label htmlFor='firstName'>First Name</Label>
              <Controller
                control={control}
                name='firstName'
                render={({ field }) => (
                  <Input className='px-4 py-6 text-sm outline-none' placeholder='First Name' {...field}></Input>
                )}
              />
              <div className='text-sm font-medium text-red-500 '>{errors?.firstName && errors?.firstName?.message}</div>
            </div>
            <div>
              <Label htmlFor='lastName'>Last Name</Label>
              <Controller
                control={control}
                name='lastName'
                render={({ field }) => (
                  <Input className='px-4 py-6 text-sm outline-none' placeholder='Last Name' {...field}></Input>
                )}
              />
              <div className='text-sm font-medium text-red-500 '>{errors?.lastName && errors?.lastName?.message}</div>
            </div>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Controller
                control={control}
                name='email'
                render={({ field }) => (
                  <Input
                    className='px-4 py-6 text-sm outline-none'
                    disabled={!!idUser}
                    type='text'
                    placeholder='Email'
                    {...field}
                  ></Input>
                )}
              />

              <div className='text-sm font-medium text-red-500 '>{errors?.email && errors?.email?.message}</div>
            </div>
            {idUser && (
              <div>
                <Label htmlFor='password'>Password</Label>
                <Controller
                  control={control}
                  name='password'
                  render={({ field }) => (
                    <Input
                      className='px-4 py-6 text-sm outline-none'
                      type='password'
                      placeholder='Password'
                      {...field}
                      value={field.value || ''}
                    ></Input>
                  )}
                />
                <div className='text-sm font-medium text-red-500 '>{errors?.password && errors?.password?.message}</div>
              </div>
            )}

            <div>
              <Label htmlFor='role'>Role</Label>
              <Select
                value={selectedRoleId || ''}
                onValueChange={(value) => {
                  setValue('roleId', value)
                }}
              >
                <SelectTrigger className=''>
                  <SelectValue placeholder='Select User Role' />
                </SelectTrigger>
                <SelectContent>
                  {roleData &&
                    roleData?.map((role: Role) => {
                      if (role.name != 'client') {
                        return (
                          <SelectItem value={role.roleId as string} key={role.roleId}>
                            {role.displayName}
                          </SelectItem>
                        )
                      }
                    })}
                </SelectContent>
              </Select>
              <div className='text-sm font-medium text-red-500 '>{errors?.roleId && errors?.roleId?.message}</div>
            </div>

            <DialogFooter>
              <Button type='submit' className='w-full mt-4' variant={'custom'}>
                {idUser ? 'Update ' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
          {/* )} */}
        </DialogContent>
      </Dialog>
    </div>
  )
}
