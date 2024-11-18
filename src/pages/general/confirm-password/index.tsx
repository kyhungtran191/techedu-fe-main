import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Eye, EyeOff } from 'lucide-react'
import { PASSWORD_REG } from '@/constants/validate-rules'
import SectionLoading from '@/components/Loading/SectionLoading'
import { ConfirmEmailUser } from '@/services/user.services'
import { ActivePrivateUser } from '@/services/admin/private-users.service'
import ConfirmSuccess from '@/components/confirm-success-email'
// import { PASSWORD_REG, RESET_PASS } from '@/utils/regex'
export default function ConfirmPassword() {
  const navigate = useNavigate()
  const { userId, token } = useParams()
  // const [isConfirmed, setIsConfirmed] = useState(true)
  // const [isOpenPassword, setIsOpenPassword] = useState(false)
  // const [isOpenConfirm, setIsOpenConfirm] = useState(false)
  const handleResendConfirmEmail = () => {}

  const schema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .matches(PASSWORD_REG, 'Invalid password. Please ensure the password meets all required criteria.'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .matches(PASSWORD_REG, 'Invalid password. Please ensure the password meets all required criteria.')
      .oneOf([yup.ref('password'), ''], 'Confirm password is not match')
  })

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['confirm-email'],
    queryFn: () => ConfirmEmailUser({ userId, token } as { userId: string; token: string }),
    enabled: Boolean(userId && token),
    retry: 1,
    onSuccess: (data) => {},
    onError: (err: any) => {
      const errMsg = err.response.data.title + ': ' + err.response.data.detail || ''
      toast.error(errMsg)
    }
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setError
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const {
    mutate: activePrivateUser,
    isSuccess: isSuccessActive,
    isLoading: isLoadingActive
  } = useMutation({
    mutationFn: (data: { password: string; confirmPassword: string }) => ActivePrivateUser(userId as string, data)
  })

  const onSubmit = (data: { password: string; confirmPassword: string }) => {
    activePrivateUser(data, {
      onSuccess() {}
    })
  }
  return (
    <div className='container flex flex-col items-center justify-center h-[80vh]'>
      {(isLoading || isLoadingActive) && <SectionLoading></SectionLoading>}
      {isSuccess && !isSuccessActive && (
        <form className='container max-w-[1000px] ' onSubmit={handleSubmit(onSubmit)}>
          <div className='absolute inset-0 w-full h-full opacity-40 bg-gradient-to-b from-transparent via-primary-3 to-parent'></div>
          <div className='relative z-20 flex-grow w-full pt-10 mx-auto overflow-y-auto text-xl text-neutral-black no-scrollbar '>
            <h2 className='text-4xl font-medium text-center text-primary-1'>Complete Your Registration</h2>
            <div className='px-3 py-6 mt-8'>
              <div className='mb-6'>
                <div className='mb-6'>
                  <Label className='mb-[18px] block text-xl'>Password</Label>
                  <div className='relative w-full p-3 border rounded-lg border-primary-1'>
                    {/* Title input */}
                    <Controller
                      control={control}
                      name='password'
                      render={({ field }) => (
                        <Input
                          placeholder='Password'
                          type='password'
                          className='px-0 py-0 text-xl border-none focus:outline-none text-neutral-black pr-[30px] placeholder:text-neutral-silver-3'
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <div className='h-3 mt-2 text-sm font-medium text-red-500'>
                    {errors?.password && errors?.password?.message}
                  </div>
                </div>
                <div className='mb-6'>
                  <Label className='mb-[18px] block text-xl'>Confirm Password</Label>
                  <div className='relative w-full p-3 border rounded-lg border-primary-1'>
                    {/* Title input */}
                    <Controller
                      control={control}
                      name='confirmPassword'
                      render={({ field }) => (
                        <Input
                          type='password'
                          placeholder='Confirm Password'
                          className='px-0 py-0 text-xl border-none focus:outline-none text-neutral-black pr-[30px] placeholder:text-neutral-silver-3'
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <div className='h-3 mt-2 text-sm font-medium text-red-500'>
                    {errors?.confirmPassword && errors?.confirmPassword?.message}
                  </div>
                </div>
              </div>
            </div>
            <Button
              type='submit'
              variant='custom'
              className='w-full mb-10 text-lg cursor-pointer py-7'
              disabled={!isValid}
            >
              Complete
            </Button>
          </div>
        </form>
      )}
      {isSuccessActive && <ConfirmSuccess></ConfirmSuccess>}
    </div>
  )
}
