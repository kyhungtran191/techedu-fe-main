import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import { EMAIL_REG } from '@/utils/regex'
import { useMutation } from '@tanstack/react-query'
import { EMAIL_REG } from '@/constants/validate-rules'
import { ForgotPasswordUser, ResendEmailUser } from '@/services/user.services'
import { toast } from 'react-toastify'
// import { Auth } from '@/services/client'
// import Spinner from '@/components/Spinner'
export default function ResendEmail() {
  const [isSuccess, setIsSuccess] = useState(false)

  const schema = yup.object().shape({
    email: yup.string().required('Email is required').matches(EMAIL_REG, 'Email Format Error')
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    setError
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver<{ email: string }>(schema),
    defaultValues: {
      email: ''
    }
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (email: string) => ResendEmailUser(email)
  })

  const onSubmit = ({ email }: { email: string }) => {
    mutate(email, {
      onSuccess() {
        toast.success('We have send confirm to your email. Please check your email')
        reset({})
      },
      onError(err: any) {
        const errMsg = err.response.data.error.message || ''
        toast.error(errMsg)
      }
    })
  }

  return (
    <div className='relative z-20 flex-grow w-full pt-10 mx-auto overflow-y-auto text-xl text-neutral-black no-scrollbar '>
      <h2 className='text-4xl font-bold text-center text-primary-1'>Resend Confirm Email</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='container px-3 py-6 mt-8'>
        <div className='mb-6'>
          <Label className='mb-[18px] block text-xl'>Email</Label>
          {/* Title input */}
          <Controller
            control={control}
            name='email'
            render={({ field }) => (
              <Input
                className='h-[50px] sm:h-[65px] bg-transparent !p-4 !outline-none !focus:outline-none mt-[18px] text-lg sm:text-xl border-primary-1 placeholder:text-neutral-silver-3'
                placeholder='Enter your email'
                {...field}
              ></Input>
            )}
          />
          <div className='h-3 mt-2 text-sm font-medium text-red-500'>{errors?.email && errors?.email?.message}</div>
        </div>
        <div className='text-center'>
          <Button
            type='submit'
            variant='custom'
            className='w-full mb-10 text-lg cursor-pointer py-7 max-w-[500px] mx-auto'
            disabled={!isValid}
          >
            Resend Confirm Email
          </Button>
        </div>
      </form>
    </div>
  )
}
