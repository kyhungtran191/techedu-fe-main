import React from 'react'
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
import { Switch } from '@/components/ui/switch'
import { EMAIL_REG, PASSWORD_REG } from '@/constants/validate-rules'

interface TCreateEditUser {
  open: boolean
  roles?: OptionType[]
  idUser?: string
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
  setEditUser: React.Dispatch<React.SetStateAction<string | undefined>>
  refetch?: () => void
  wrapperClass?: string
  CREATE_PERMISSION: boolean
}

type TDefaultValue = {
  password?: string
  fullName: string
  email: string
  role: string
  status?: number
}

export default function EditAddUserDialog({
  open,
  roles,
  setEditUser,
  setOpenDialog,
  wrapperClass,
  idUser,
  CREATE_PERMISSION
}: TCreateEditUser) {
  const schema = yup.object().shape({
    email: yup.string().required('Required_field').matches(EMAIL_REG, 'Rules_email'),
    password: idUser
      ? yup.string().nonNullable()
      : yup.string().required('Required_field').matches(PASSWORD_REG, 'Rules_password'),
    fullName: yup.string().required('Required_field'),
    role: yup.string().required('Required_field')
  })

  const defaultValues: TDefaultValue = {
    password: '',
    fullName: '',
    email: '',
    role: '',
    status: 1
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    getValues
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  // const userDetailData = useQuery({
  //   queryKey: ['users_detail', idUser],
  //   queryFn: (_) => getDetailUser(idUser as string),
  //   enabled: Boolean(idUser),
  //   onSuccess: (data) => {
  //     const user = data?.data?.data
  //     reset({
  //       fullName: toFullName(user?.lastName as string, user?.middleName as string, user?.firstName as string, 'vi'),
  //       phoneNumber: user?.phoneNumber,
  //       email: user?.email,
  //       role: user?.role?._id,
  //       password: '',
  //       status: user?.status
  //     })
  //   }
  // })

  //** */ Add function mutation

  // const createUserMutation = useMutation({
  //   mutationFn: (body: TUserAdd) => createUser(body)
  // })

  //** */ Update function mutation
  // const updateUserMutation = useMutation({
  //   mutationFn: (body: TUserAdd) => updateUser(body, idUser as string)
  // })

  // const handleForm = (data: TDefaultValue) => {
  //   let { firstName, lastName, middleName } = separationFullName(data.fullName, 'vi')
  //   if (!idUser) {
  //     const addData: TUserAdd = {
  //       email: data.email,
  //       password: data.password as string,
  //       role: data.role as string,
  //       status: data.status,
  //       phoneNumber: data.phoneNumber,
  //       firstName,
  //       lastName,
  //       middleName
  //     }
  //     createUserMutation.mutate(addData, {
  //       onSuccess(data) {
  //         let successMessage = data.data.message
  //         toast.success(successMessage)
  //         // queryClient.invalidateQueries(["users"]);
  //         refetch()
  //         reset(defaultValues)
  //         setOpenDialog(false)
  //       },
  //       onError(err: any) {
  //         const errMessage = err.response.data.message
  //         toast.error(errMessage)
  //       }
  //     })
  //   } else {
  //     const updatedData: TUserAdd = {
  //       email: data.email,
  //       password: data.password as string,
  //       role: data.role as string,
  //       phoneNumber: data.phoneNumber,
  //       status: data.status,
  //       firstName,
  //       lastName,
  //       middleName
  //     }
  //     updateUserMutation.mutate(updatedData, {
  //       onSuccess(data) {
  //         let successMessage = data.data.message
  //         toast.success(successMessage)
  //         // queryClient.invalidateQueries(["users"]);
  //         refetch()
  //         reset(defaultValues)
  //         setOpenDialog(false)
  //       },
  //       onError(err: any) {
  //         const errMessage = err.response.data.message
  //         toast.error(errMessage)
  //       }
  //     })
  //   }
  // }

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
        <DialogContent
          className=''
          onCloseAutoFocus={() => {
            setEditUser(undefined)
            setOpenDialog(false)
            // reset(defaultValues)
          }}
        >
          <DialogHeader>
            <DialogTitle className='text-center'>{idUser ? 'Update User' : 'Add new User'}</DialogTitle>
          </DialogHeader>
          {/* Loading component when fetching user data */}
          {/* {userDetailData.isLoading && idUser && <ComponentsLoading></ComponentsLoading>} */}
          {/* {(!userDetailData.isLoading || !idUser) && */}
          <form
            className='grid gap-2 py-4'

            // onSubmit={handleSubmit(handleForm)}
          >
            <div>
              <Label htmlFor='fullName'>Full Name</Label>
              <Controller
                control={control}
                name='fullName'
                render={({ field }) => (
                  <Input className='px-4 py-6 text-sm outline-none' placeholder='Full Name' {...field}></Input>
                )}
              />
              <div className='text-sm font-medium text-red-500 '>{errors?.fullName && errors?.fullName?.message}</div>
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
                  ></Input>
                )}
              />
              <div className='text-sm font-medium text-red-500 '>{errors?.password && errors?.password?.message}</div>
            </div>

            <div>
              <Label htmlFor='role'>Role</Label>
              <Select
                onValueChange={(value) => {
                  setValue('role', value)
                }}
                defaultValue={getValues('role')}
              >
                <SelectTrigger className=''>
                  <SelectValue placeholder='Select User Role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {roles &&
                      roles.map((role) => (
                        <SelectItem value={role.value as string} key={role.label}>
                          {role.label}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* <div className='text-sm font-medium text-red-500 '>{errors?.role && errors?.role?.message}</div> */}
            </div>
            <div className='flex items-center space-x-2'>
              <Label htmlFor='airplane-mode'>Status </Label>
              <Switch
                id='airplane-mode'
                // defaultChecked={getValues('status') == 1}
                // onCheckedChange={() => {
                //   const currentStatus = getValues('status')
                //   currentStatus == 1 ? setValue('status', 0) : setValue('status', 1)
                // }}
              />
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
