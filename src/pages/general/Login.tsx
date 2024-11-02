import React, { useEffect } from 'react'
import StarIcon from '@/assets/welcome-back.png'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { EMAIL_REG, PASSWORD_REG } from '@/constants/validate-rules'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { TLogin, TRegister, User } from '@/@types/auth.type'
import { login, register } from '@/services/auth.services'
import { toast } from 'react-toastify'
import AuthCarousel from '@/components/AuthCarousel'
import * as yup from 'yup'
import { useAppContext } from '@/hooks/useAppContext'
import { jwtDecode } from 'jwt-decode'
import { saveAccessTokenToLS, savePermissions, saveRefreshTokenToLS, saveUserToLS } from '@/utils/auth'
import SectionLoading from '@/components/Loading/SectionLoading'
export default function Login() {
  type TDefaultValue = {
    email: string
    password: string
  }

  const schema = yup.object().shape({
    email: yup.string().required('Email is required').matches(EMAIL_REG, 'Email Format Error'),
    password: yup.string().required('Password is required')
    // .matches(PASSWORD_REG, 'Invalid password. Please ensure the password meets all required criteria.')
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'director@gmail.com',
      password: '12345678'
    }
  })

  const { setIsAuthenticated, setPermissions, setProfile } = useAppContext()

  const { isLoading, mutate } = useMutation({
    mutationFn: (body: TLogin) => login(body),
    onError: (err: any) => {
      const errMsg = err.response.data.error.message 
      toast.error(errMsg || 'error when login')
    }
  })

  const onSubmit = (data: TLogin) => {
    mutate(data, {
      onSuccess(info) {
        const accessToken = data && (info?.data?.value?.accessToken as string)
        const refreshToken = data && (info?.data?.value?.refreshToken as string)
        const refreshTokenExpiryTime = data && (info?.data?.value?.refreshTokenExpiryTime as string)
        const exp = Math.floor(new Date(refreshTokenExpiryTime as string).getTime() / 1000)
        const dataDetail = jwtDecode(accessToken as string)
        const { email, fullname, id, permissions, phoneNumber, roles } = dataDetail as any
        const roleData = JSON.parse(roles)
        const permissionData = JSON.parse(permissions)
        savePermissions(permissionData)
        saveAccessTokenToLS(accessToken)
        saveRefreshTokenToLS(refreshToken as string, exp)
        saveUserToLS({ email, fullname, id, phoneNumber, roles: roleData })
        setPermissions(permissionData)
        setProfile({ email, fullname, id, phoneNumber, roles: roleData })
        setIsAuthenticated(true)
        toast.success('Login successfully!')
      }
    })
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen overflow-auto no-scrollbar'>
      <div className='fixed inset-0 grid w-full h-full grid-cols-1 lg:grid-cols-2'>
        <AuthCarousel></AuthCarousel>
        <div className='w-full flex-1 bg-primary-3 rounded-[20px] flex-col h-full flex overflow-auto no-scrollbar  justify-center px-[40px]'>
          <div className='flex justify-center'>
            <h1 className='text-2xl sm:text-[32px] font-medium'>Welcome back</h1>
            <img src={StarIcon} alt='' className='w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] ml-2 sm:ml-6' />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='relative'>
            {isLoading && <SectionLoading></SectionLoading>}
            <>
              <div className='mt-3 sm:mt-6'>
                <Label className='text-lg sm:text-xl text-neutral-black'>Email</Label>
                <Controller
                  control={control}
                  name='email'
                  render={({ field }) => (
                    <Input
                      className='h-[50px] sm:h-[65px] bg-transparent !p-4 !outline-none !focus:outline-none mt-[18px] text-lg sm:text-xl placeholder:text-neutral-silver-3'
                      placeholder='Enter your email'
                      {...field}
                    ></Input>
                  )}
                />
                <div className='h-3 mt-2 text-sm font-medium text-red-500'>
                  {errors?.email && errors?.email?.message}
                </div>
              </div>
              <div className='mt-3 sm:mt-6'>
                <Label className='text-lg sm:text-xl text-neutral-black'>Password</Label>

                <Controller
                  control={control}
                  name='password'
                  render={({ field }) => (
                    <Input
                      type='password'
                      className='h-[50px] sm:h-[65px] bg-transparent !p-4 !outline-none !focus:outline-none mt-[18px] text-lg sm:text-xl placeholder:text-neutral-silver-3'
                      placeholder='Enter your password'
                      {...field}
                    ></Input>
                  )}
                />
                <div className='h-3 mt-2 text-sm font-medium text-red-500'>
                  {errors?.password && errors?.password?.message}
                </div>
              </div>
              {/* <div className='flex items-center space-x-2'>
              <Checkbox id='terms' className='mr-2 sm:mr-5 sm:h-8 sm:w-8' />
              <Label
                htmlFor='terms'
                className='text-sm sm:text-[18px] font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 max-w-[357px] leading-[25px]'
              >
                Remember this account
              </Label>
            </div> */}
              <Button
                className='w-full !px-6 !py-4 text-white bg-primary-1 text-lg sm:text-xl h-[50px] sm:h-[60px] mt-3 sm:mt-6'
                variant={'custom'}
              >
                Log in
              </Button>
            </>
          </form>
          <div className='flex items-center justify-between'>
            <Link to='/forgot-password' className='inline-block mt-6 underline text-primary-1'>
              Forgot password?
            </Link>

            <Link to='/resend-email' className='inline-block mt-6 underline text-primary-1'>
              I didn't receive confirm email?
            </Link>
          </div>

          <div className='mt-4 sm:mt-12 py-3 sm:py-[18px] px-4 xl:px-6 bg-neutral-silver text-neutral-silver-3 text-center text-lg sm:text-xl rounded-lg'>
            Don’t have an account?
            <Link to='/signup' className='ml-1 text-sm underline sm:text-base sm:ml-3 text-primary-1'>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
