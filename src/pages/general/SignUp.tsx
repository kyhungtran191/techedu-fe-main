import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import AuthCarousel from '@/components/AuthCarousel'
import * as yup from 'yup'
import { EMAIL_REG, PASSWORD_REG } from '@/constants/validate-rules'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { TRegister } from '@/@types/auth.type'
import { register } from '@/services/auth.services'
import { toast } from 'react-toastify'
import SectionLoading from '@/components/Loading/SectionLoading'

type TDefaultValue = {
  email: string
  password: string
  confirmPassword: string
}

const defaultValue = { email: '', password: '', confirmPassword: '' }

const schema = yup.object().shape({
  email: yup.string().required('Email is required').matches(EMAIL_REG, 'Email Format Error'),
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

export default function SignUp() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setError
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),

    defaultValues: defaultValue
  })

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (data: TRegister) => register(data)
  })

  const onSubmit = (data: TRegister) => {
    mutate(data, {
      onSuccess(data) {
        if (data.data.isSuccess) {
          toast.success('Register Successfully, please check your email to active your account!')
          reset(defaultValue)
        }
      },
      onError(err: any) {
        const errMessage = err?.response?.data?.Error?.Message || 'Something was wrong'
        toast.error(errMessage)
      }
    })
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen overflow-auto no-scrollbar '>
      <div className='grid w-full h-[full] grid-cols-1 lg:grid-cols-2 max-h-screen fixed inset-0'>
        <AuthCarousel></AuthCarousel>
        <div className='w-full flex-1 bg-primary-3 rounded-[20px] flex-col h-full flex overflow-auto no-scrollbar  justify-center px-[40px]'>
          <div className='flex justify-center'>
            <h1 className='text-2xl sm:text-[32px] font-medium'>Create your account</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='relative'>
            {isLoading && <SectionLoading></SectionLoading>}
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
              <div className='h-3 mt-2 text-sm font-medium text-red-500'>{errors?.email && errors?.email?.message}</div>
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
            <div className='mt-3 sm:mt-6'>
              <Label className='text-lg sm:text-xl text-neutral-black'>Confirm password</Label>
              <Controller
                control={control}
                name='confirmPassword'
                render={({ field }) => (
                  <Input
                    type='password'
                    className='h-[50px] sm:h-[65px] bg-transparent !p-4 !outline-none !focus:outline-none mt-[18px] text-lg sm:text-xl placeholder:text-neutral-silver-3'
                    placeholder='Enter your confirm password'
                    {...field}
                  ></Input>
                )}
              />
              <div className='h-3 mt-2 text-sm font-medium text-red-500'>
                {errors?.confirmPassword && errors?.confirmPassword?.message}
              </div>
            </div>
            <Separator className='my-3 sm:my-4'></Separator>
            <div className='flex items-end space-x-2'>
              <Checkbox id='terms' className='w-8 h-8 mr-5' />
              <Label
                htmlFor='terms'
                className='text-sm sm:text-[18px] font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-[25px]'
              >
                I don’t want to receive news and coupons by email.
              </Label>
            </div>
            <Button
              className='w-full !px-6 !py-4 text-white bg-primary-1 text-lg sm:text-xl h-[50px] sm:h-[60px] sm:mt-6 mt-3'
              variant={'custom'}
            >
              Continue
            </Button>
            <p className='mt-3 text-sm sm:mt-6 text-neutral-silver-3'>
              By continuing, you agree to{' '}
              <span className='underline text-neutral-black'>Untitled UI’s Terms of Use and Privacy Policy.</span>
            </p>
            <div className='text-sm mt-4 sm:mt-12 py-3 sm:py-[18px] px-4 xl:px-6 bg-neutral-silver text-neutral-silver-3 text-center sm:text-xl rounded-lg'>
              Already have an account?
              <Link to='/login' className='ml-1 text-sm underline sm:text-base sm:ml-3 text-primary-1'>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
