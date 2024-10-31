import React, { useEffect } from 'react'
import email from '@/assets/confirm-email.png'
import { CheckCircle, CircleCheck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ConfirmEmailUser } from '@/services/user.services'
import SectionLoading from '@/components/Loading/SectionLoading'
export default function ConfirmEmail() {
  const { userId, token } = useParams()

  // const []
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['confirm-email'],
    queryFn: () => {
      if (userId && token) {
        return ConfirmEmailUser({ userId, token })
      }
    },
    enabled: Boolean(userId && token)
  })

  return (
    <div className='relative flex flex-col items-center justify-center h-screen'>
      {isLoading && <SectionLoading></SectionLoading>}
      <>
        <img srcSet={`${email} 2x`} className='w-[300px] h-[300px]'></img>

        <div className='flex items-center my-3 text-3xl font-semibold gap-x-3'>
          Email Confirm Successfully <CircleCheck className='w-10 h-10 text-primary-1'></CircleCheck>
        </div>
        <span className='text-base'>You have been activated your account, you can enjoy our world now !</span>
        <Link
          to='/login'
          className='px-4 py-2 text-lg text-white rounded-lg bg-primary-1 w-full max-w-[300px] text-center my-4'
        >
          Enter now
        </Link>
      </>
    </div>
  )
}
