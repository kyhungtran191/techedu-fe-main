/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from 'react'
import SystemNotification from '../components/SystemNotification'
import { Button } from '@/components/ui/button'
import CourseTitle from '@/components/CourseTittle'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Info from '@/icons/Info'
import { formatPrice } from '@/utils'
import CourseNote from '@/components/CourseNote'
import { useMutation, useQuery } from '@tanstack/react-query'
import { GetCoursePrice, UpdatePrice } from '@/services/instructor/manage/price.service'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import SectionLoading from '@/components/Loading/SectionLoading'

const concurrency = [
  {
    name: 'USD',
    value: 'usd',
    price: [9.99, 19.99, 29.99, 33.99, 49.99]
  }
  // {
  //   name: 'VND',
  //   value: 'vnd',
  //   price: [199.0, 299.0, 399.0, 499.0]
  // }
]

export default function Price() {
  const { id } = useParams()
  if (!id) {
    toast.error('ID Course Not Found !')
    return
  }
  const [currentCurrency, setCurrentCurrency] = useState<{ currency: string | undefined; price: number | undefined }>({
    currency: '',
    price: undefined
  })

  const listPrice = useMemo(() => {
    if (!currentCurrency.currency) return
    return concurrency.find((item) => item.value === currentCurrency.currency)?.price
  }, [currentCurrency.currency])

  const UpdatePriceMutation = useMutation({
    mutationFn: (data: { amount: number; currency: string }) => UpdatePrice(id, data)
  })

  const { data, isLoading } = useQuery({
    queryKey: ['course-price', id],
    enabled: Boolean(id),
    queryFn: () => GetCoursePrice(id),
    select: (data) => data.data.value,
    onSuccess(data) {
      if (data) {
        setCurrentCurrency({
          currency: data.currency.toLowerCase(),
          price: data.amount
        })
      }
    }
  })

  const submitPrice = () => {
    if (currentCurrency.currency && currentCurrency.price) {
      UpdatePriceMutation.mutate(
        {
          amount: currentCurrency.price,
          currency: currentCurrency.currency.toUpperCase()
        },
        {
          onSuccess() {
            toast.success('Update Course Price Successfully!')
          },
          onError(err) {
            console.log(err)
          }
        }
      )
    }
  }

  return (
    <div className='flex flex-col h-full'>
      <SystemNotification></SystemNotification>
      {(UpdatePriceMutation.isLoading || isLoading) && <SectionLoading></SectionLoading>}
      <div className='flex-grow p-6 mt-4 overflow-y-auto bg-white rounded-xl no-scrollbar text-neutral-black'>
        <div className='flex items-start bg-[#FFF5CC] p-3 text-neutral-black font-medium mb-6'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='25'
            height='25'
            viewBox='0 0 25 25'
            fill='none'
            className='mr-[18px]'
          >
            <g clipPath='url(#clip0_3294_8371)'>
              <path
                d='M11.5 7.79688H13.5V9.79688H11.5V7.79688ZM11.5 11.7969H13.5V17.7969H11.5V11.7969ZM12.5 2.79688C6.98 2.79688 2.5 7.27688 2.5 12.7969C2.5 18.3169 6.98 22.7969 12.5 22.7969C18.02 22.7969 22.5 18.3169 22.5 12.7969C22.5 7.27688 18.02 2.79688 12.5 2.79688ZM12.5 20.7969C8.09 20.7969 4.5 17.2069 4.5 12.7969C4.5 8.38688 8.09 4.79688 12.5 4.79688C16.91 4.79688 20.5 8.38688 20.5 12.7969C20.5 17.2069 16.91 20.7969 12.5 20.7969Z'
                fill='#588E58'
              />
            </g>
            <defs>
              <clipPath id='clip0_3294_8371'>
                <rect width='24' height='24' fill='white' transform='translate(0.5 0.796875)' />
              </clipPath>
            </defs>
          </svg>
          <div className='text-[18px] text-neutral-black'>
            <h3 className='mb-2 text-xl font-bold'>Please complete your enhanced application</h3>
            <p className='mb-[18px]'>
              You will be able to determine your pricing once your payout method has been approved
            </p>
            <Button variant='ghost' className='px-6 py-4 border border-neutral-black hover:bg-transparent'>
              Complete the enhanced application
            </Button>
          </div>
        </div>
        <div>
          <CourseTitle>Set a price for your course</CourseTitle>
          <div className='flex items-start gap-8 mb-8'>
            <div className='flex flex-col'>
              <div className='mb-[18px] text-xl font-bold'>Currency</div>
              <Select
                value={currentCurrency.currency || ''}
                onValueChange={(value) => {
                  setCurrentCurrency({ currency: value, price: undefined })
                }}
              >
                <SelectTrigger className='focus:outline-primary-1 w-[306px] !py-[30px] px-[18px]  rounded-lg border-neutral-black text-neutral-black text-base'>
                  <SelectValue placeholder='Currency' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className='text-base'>
                    <SelectLabel></SelectLabel>
                    {concurrency.map((item) => (
                      <SelectItem value={item.value} className='py-3 text-lg font-medium'>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-col'>
              <div className='mb-[18px] text-xl font-bold flex items-center'>
                <span>Price Tier</span>
                <Info className='ml-[18px] text-primary-1'></Info>
              </div>
              <Select
                value={currentCurrency.price?.toString() || undefined}
                onValueChange={(value) => setCurrentCurrency((prev) => ({ ...prev, price: Number(value) }))}
              >
                <SelectTrigger className='focus:outline-primary-1 w-[306px] !py-[30px] px-[18px]  rounded-lg border-neutral-black text-neutral-black text-base'>
                  <SelectValue placeholder='Choose a price' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className='text-base'>
                    {listPrice &&
                      listPrice?.length > 0 &&
                      listPrice.map((item) => (
                        <SelectItem value={item.toString()} className='py-3 text-lg font-medium'>
                          {formatPrice(item, currentCurrency.currency as string)}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CourseNote>
            If you’d like to offer your course is free , it must have a total video length of less 2 hours. Also,
            courses with practice tests can not be free.
          </CourseNote>
          <Button
            className='w-[250px] py-7'
            variant={'custom'}
            onClick={submitPrice}
            disabled={!currentCurrency.currency || !currentCurrency.price}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
