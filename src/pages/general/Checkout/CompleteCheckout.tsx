import SectionLoading from '@/components/Loading/SectionLoading'
import { Button } from '@/components/ui/button'
import { getPaymentStatusById } from '@/services/payment'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function CompleteCheckout() {
  const navigate = useNavigate()
  const { orderId, transactionId } = useParams()

  const queryCheckPaymentStatus = useQuery({
    queryKey: ['payment-status', orderId, transactionId],
    queryFn: () => getPaymentStatusById(orderId as string, transactionId as string),
    enabled: Boolean(orderId && transactionId),
    refetchInterval: 60 * 1000
  })

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        toast.error('Get Payment Timeout !')
        navigate('/my-cart')
      },
      4 * 60 * 1000
    )

    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <div className='relative z-20 flex-grow w-full h-[70vh] pt-10 mx-auto overflow-y-auto text-xl text-neutral-black no-scrollbar flex items-center justify-center flex-col'>
      {queryCheckPaymentStatus.isLoading && <SectionLoading></SectionLoading>}
      {!queryCheckPaymentStatus.isLoading && queryCheckPaymentStatus.data && (
        <>
          <h2 className='mb-3 text-4xl font-bold text-primary-1'>Checkout Complete! 🎉</h2>
          <p>Congratulations ! Your checkout process has been done, now you can learn all your new courses</p>
          <Button className='mt-8' variant={'custom'} onClick={() => navigate('/enrolled-courses')}>
            Go to my courses
          </Button>
        </>
      )}
    </div>
  )
}
