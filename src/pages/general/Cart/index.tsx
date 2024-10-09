import CourseCard from '@/components/Courses/CourseCard'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

export default function Cart() {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  return (
    <div className='relative z-0 grid h-full grid-cols-1 lg:grid-cols-[1fr_30vw] gap-x-4 overflow-auto no-scrollbar'>
      <div className='min-h-[400px] w-full xl:min-h-auto h-full px-3 pb-6 overflow-y-auto bg-white rounded-xl no-scrollbar '>
        <div className='sticky top-0 z-10 flex items-center justify-between pt-6 bg-white pb-[18px]'>
          <div className='text-[32px] font-medium text-neutral-black '>
            Cart <span className='ml-1 text-2xl'>(5)</span>
          </div>
          <div
            className='text-xl transition-all duration-300 ease-in-out cursor-pointer text-primary-1 hover:font-medium'
            onClick={() => setIsEdit((prev) => !prev)}
          >
            {isEdit ? 'Complete' : 'Edit'}
          </div>
        </div>
        <div className=''>
          {/* Cart Item */}
          {Array(5)
            .fill(0)
            .map((item) => (
              <div className='flex items-center mb-[18px]'>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isEdit ? 'w-0 h-0 opacity-0 mr-0' : 'w-9 h-9 opacity-100 mr-[15px]'
                  } flex-shrink-0`}
                >
                  <Checkbox className={`w-full h-full rounded-xl `} />
                </div>
                <div className='flex flex-1'>
                  <CourseCard
                    vertical={false}
                    isCartItem
                    wrapperClass='transition-all duration-300 ease-in-out'
                  ></CourseCard>
                  <div
                    className={`${isEdit ? 'w-[100px] px-6 opacity-100' : 'w-0 px-0 opacity-0'} transition-all duration-300 ease-in-out h-auto  rounded-tr-xl rounded-br-xl bg-secondary-1 flex items-center justify-center text-white text-xl cursor-pointer overflow-hidden`}
                  >
                    Delete
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className=''>
        <div className='fixed bottom-0 lg:relative flex flex-col px-3 py-6 bg-white rounded-xl min-h-[600px]'>
          <div className='text-neutral-black'>
            <h3 className='text-[32px] font-medium'>Total</h3>
            <div className='text-5xl font-medium text-primary-1 my-[18px]'>$64</div>
            <div className='flex items-center'>
              <div className='text-2xl line-through text-neutral-silver-3'>$98.99</div>
              <div className='p-[8px] rounded-lg flex items-center justify-center bg-secondary-1 text-white ml-[22px]'>
                35% OFF
              </div>
            </div>
            <Button className='w-full px-4 text-xl text-white rounded-lg py-7 bg-primary-1 my-[18px]'>Payment</Button>
            <span className='text-sm underline'>Refund policy within 14 days</span>
          </div>
          <Separator className='my-6 bg-neutral-silver-3'></Separator>
          <div className='text-neutral-black'>
            <h3 className='text-[32px] font-medium mb-2'>Discount</h3>
            <div className='p-3 border-2 border-dashed border-primary-2 rounded-xl'>
              <div className='flex items-center justify-between'>
                <div className='text-primary-1 text-[18px]'>Applied</div>
                <div className='text-sm'>Valid until October 10, 2024</div>
              </div>
              {/* Code Apply */}
              <div className='my-3 text-xl font-medium'>YOUCANDOIT</div>
              <div className='text-secondary-2 text-[18px]'>$2 off for orders with more than 2 courses</div>
            </div>
          </div>
          <div className='flex items-center py-3 px-[18px] rounded-xl bg-neutral-silver-2 mt-[18px]'>
            <Input
              className='bg-transparent border-none outline-none text-neutral-silver-3'
              placeholder='Enter another coupon code'
            ></Input>
            <Button className='px-[18px] py-3 bg-neutral-silver-3'>Apply</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
