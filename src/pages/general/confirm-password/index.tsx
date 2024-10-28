import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Eye, EyeOff } from 'lucide-react'
// import { PASSWORD_REG, RESET_PASS } from '@/utils/regex'
export default function ConfirmPassword() {
  const navigate = useNavigate()
  const { userId, token } = useParams()
  const [isConfirmed, setIsConfirmed] = useState(true)
  const [isOpenPassword, setIsOpenPassword] = useState(false)
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)

  console.log(userId, token)
  const isError = false

  const handleResendConfirmEmail = () => {}

  // const schema = yup
  //   .object({
  //     password: yup
  //       .string()
  //       .matches(RESET_PASS, {
  //         message:
  //           'The password must contain at least 8 character long and one uppercase letter, one lowercase letter, one digit, and one special character'
  //       })
  //       .required('Please provide password'),
  //     confirm_password: yup
  //       .string()
  //       .required('Please provide confirmation password')
  //       .oneOf([yup.ref('password')], 'Confirm password does not match')
  //   })
  //   .required()
  // const {
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  //   setError
  // } = useForm({
  //   resolver: yupResolver(schema)
  // })
  // const { mutate } = useMutation({
  //   mutationFn: (token) => Auth.validateToken(token)
  // })

  // useEffect(() => {
  //   mutate(token, {
  //     onSuccess() {
  //       setIsConfirmed(true)
  //     },
  //     onError(err) {
  //       let errMessage = err && err?.response?.data?.title
  //       toast.error(errMessage)
  //       navigate('/forgot-password')
  //     }
  //   })
  // }, [token])

  // const resetPasswordMutation = useMutation({
  //   mutationFn: (body) => Auth.resetPassword(body)
  // })
  // const onSubmit = (data) => {
  //   resetPasswordMutation.mutate(
  //     { password: data.password, token },
  //     {
  //       onSuccess() {
  //         toast.success('Reset Password Successfully! Please login again')
  //         navigate('/login')
  //       },
  //       onError(err) {
  //         console.log(err)
  //       }
  //     }
  //   )
  // }
  return (
    <div className='container flex flex-col items-center justify-center h-[80vh]'>
      {!isError && isConfirmed && (
        <div className='md:w-[50%] min-h-[400px] p-10 rounded-lg '>
          <div className='flex items-center justify-center gap-3'>
            <img src='./logo.png' alt='' />
            <h2 className='text-xl font-bold md:text-3xl'>Reset Password</h2>
          </div>
          <form
          // onSubmit={handleSubmit(onSubmit)}
          >
            <div className='my-3'>
              <Label className='my-2 font-bold '>New Password</Label>
              <div className='relative'>
                <Input
                  className='p-4 mt-2 outline-none'
                  placeholder='Enter Password'
                  type={isOpenPassword ? 'text' : 'password'}
                ></Input>
                <div
                  className='absolute -translate-y-1/2 top-[50%] w-5 h-5 cursor-pointer right-5'
                  onClick={() => setIsOpenPassword(!isOpenPassword)}
                >
                  {isOpenPassword ? <Eye></Eye> : <EyeOff></EyeOff>}
                </div>
              </div>

              {/* <div className='mt-3 text-base font-semibold text-red-500 '>{errors && errors?.password?.message}</div> */}
            </div>
            <div className='my-3'>
              <Label className='my-2 font-bold '>Confirm Password</Label>
              <div className='relative'>
                <Input
                  className='p-4 py-5 mt-2 outline-none'
                  placeholder='Enter Confirm Password'
                  type={isOpenConfirm ? 'text' : 'password'}
                ></Input>
                <div
                  className='absolute -translate-y-1/2 top-[50%] w-5 h-5 cursor-pointer right-5'
                  onClick={() => setIsOpenConfirm(!isOpenConfirm)}
                >
                  {isOpenPassword ? <Eye></Eye> : <EyeOff></EyeOff>}
                </div>
              </div>
              <div className='h-5 mt-3 text-base font-semibold text-red-500'>
                {/* {errors && errors?.confirm_password?.message} */}
              </div>
            </div>
            <div className='text-right'>
              <Link
                to='/login'
                className='inline-block mt-3 font-semibold text-blue-500 underline cursor-pointer md:mt-5 md:text-base'
              >
                Back to Login
              </Link>
            </div>
            <Button className={`w-full my-4 `} variant={'custom'}>
              {/* {resetPasswordMutation.isLoading ? <Spinner></Spinner> : 'Change New Password'} */}
              Change New Password
            </Button>
          </form>
        </div>
      )}

      {isError && (
        <div className='max-w-[60vw] min-h-[400px] p-10 rounded-lg '>
          <h2 className='text-3xl font-bold text-center'>Confirm Token Expired</h2>
          <p className='mt-3 text-center'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex repellat reprehenderit numquam molestias
            eveniet. Possimus sequi quasi aliquid, maxime, fugit molestias excepturi esse dignissimos consequuntur ipsa,
            non illo repudiandae nulla. Eligendi vel minima consectetur et expedita. Officiis animi eius, ducimus, sit
            amet dicta hic odio quisquam neque consectetur veniam voluptatibus voluptates repudiandae vero quis! Nisi
            sit at corporis mollitia accusantium.s
          </p>
          <Button className='w-full mt-4' variant={'custom'}>
            Resend Confirm Email
          </Button>
        </div>
      )}
      {/* {!isConfirmed && <Spinner></Spinner>} */}
    </div>
  )
}
