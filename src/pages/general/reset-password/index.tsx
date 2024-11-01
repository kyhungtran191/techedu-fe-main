import SectionLoading from '@/components/Loading/SectionLoading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PASSWORD_REG } from '@/constants/validate-rules'
import { ResetPasswordUser } from '@/services/user.services'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { CircleCheck } from 'lucide-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
export default function ResetPassword() {
  const { userId, token } = useParams()
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
    mutate: resetPassword,
    isSuccess: isSuccessReset,
    isError,
    isLoading
  } = useMutation({
    mutationFn: (data: { password: string; confirmPassword: string }) =>
      ResetPasswordUser({
        userId,
        token,
        ...data
      } as {
        userId: string
        token: string
        password: string
        confirmPassword: string
      })
  })

  const onSubmit = ({ password, confirmPassword }: { password: string; confirmPassword: string }) => {
    resetPassword(
      { password, confirmPassword },
      {
        onError: (err: any) => {
          const errMsg = `${err.response.data.detail}: ${err.response.data.errors[0].message}`
          toast.error(errMsg)
        }
      }
    )
  }

  return (
    <div className='container flex flex-col items-center justify-center h-[80vh]'>
      {isLoading && <SectionLoading></SectionLoading>}
      {!isSuccessReset && (
        <form className='container max-w-[1000px] ' onSubmit={handleSubmit(onSubmit)}>
          <div className='absolute inset-0 w-full h-full opacity-40 bg-gradient-to-b from-transparent via-primary-3 to-parent'></div>
          <div className='relative z-20 flex-grow w-full pt-10 mx-auto overflow-y-auto text-xl text-neutral-black no-scrollbar '>
            <h2 className='text-4xl font-medium text-center text-primary-1'>Reset Password</h2>
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
      {isSuccessReset && (
        <div className='flex flex-col items-center justify-center'>
          <CircleCheck className='w-10 h-10 text-primary-1'></CircleCheck>
          <div className='my-3 text-3xl font-semibold '>Reset Password Success!</div>
          <span className='text-base'>You have reset your account, you can login now !</span>
          <Link
            to='/login'
            className='block px-4 py-2 text-lg text-white rounded-lg bg-primary-1 w-full max-w-[300px] text-center my-4 cursor-pointer'
          >
            Login now
          </Link>
        </div>
      )}
      {isError && (
        <Link
          to='/forgot-password'
          className='relative z-30 px-4 py-3 mx-auto font-medium text-center rounded-lg text-primary-1 w-fit text-underline'
        >
          Go to forgot password page
        </Link>
      )}
    </div>
  )
}
