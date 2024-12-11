import React, { useEffect } from 'react'
import Logo from '@/assets/logo.png'
import Ads from '@/assets/benefits.png'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Language from '@/icons/CourseDetail/Language'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import Stripe from '@/assets/stripe.png'
import { Separator } from '@/components/ui/separator'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Item } from '@radix-ui/react-menubar'
import { CartItem } from '@/@types/cart.type'

export default function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const pageState = location.state

  useEffect(() => {
    if (!pageState?.totalPrice || !pageState?.orderItems) {
      toast.error('Invalid Basket')
      return navigate('/my-cart')
    }
  }, [pageState?.totalPrice, pageState?.orderItems])
  return (
    <div className='w-screen grid sm:grid-cols-[357px_1fr] h-screen max-h-screen'>
      <div className='flex flex-col h-screen px-6 py-12 overflow-y-auto no-scrollbar bg-primary-3'>
        <img srcSet={`${Logo} 2x`} alt='' className='w-[220px] h-[52px] object-cover' />
        <div className='mt-9 text-neutral-black'>
          <h2 className='text-[32px] font-medium'>Premium Account</h2>
          <div className='my-6 text-lg max-w-[300px]'>
            Upgrade to premium for great savings and personalized learning experiences on{' '}
            <span className='font-medium text-primary-1'>Project Name</span>
          </div>
          <Button variant={'custom'} className='px-6 mb-12 text-lg py-7'>
            Upgrade Account
          </Button>
          <div className='flex flex-col items-center justify-center mt-12 responsive-margin'>
            <img src={Ads} alt='ads' className='object-cover w-full h-auto max-h-[30vh]' />
          </div>
        </div>
      </div>

      <div className='pt-[100px] pb-[60px] px-[70px] w-full h-full overflow-y-auto no-scrollbar responsive-padding'>
        <h2 className='text-[32px] font-medium'>Billing Information</h2>
        {/* <div className='my-6'>
          <h3 className='text-xl font-medium'>Country</h3>
          <Select>
            <SelectTrigger className='flex items-center px-8 py-7 text-xl rounded-lg w-fit mt-[18px] min-w-[306px] focus:outline-none border-neutral-black'>
              <Language className=''></Language>
              <SelectValue placeholder='Select Language' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='apple' className='!px-8 py-3 text-xl font-medium border-b'>
                <div>Viet Nam</div>
              </SelectItem>
              <SelectItem value='english' className='!px-8 py-3 text-xl font-medium border-b'>
                <div>English</div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        <div className='my-6'>
          <h3 className='text-xl font-semibold'>Payment method</h3>
          <RadioGroup defaultValue='option-one'>
            <div className='flex items-center max-w-[618px] border border-neutral-silver-3 py-[18px] px-8 rounded-lg mt-6 justify-between'>
              <div>
                <RadioGroupItem value='option-one' id='option-one' className='w-6 h-6' />
                <Label htmlFor='option-one' className='ml-5 text-xl'>
                  Stripe
                </Label>
              </div>
              <div className='flex p-2 border rounded-lg border-neutral-silver-3'>
                <img src={Stripe} alt='' className='w-[80px] h-auto rounded-xl' />
              </div>
            </div>
          </RadioGroup>
        </div>
        <div>
          <h3 className='my-6 text-xl font-semibold'>
            Order details
            <span className='font-light'> ({pageState?.orderItems?.length} courses)</span>{' '}
          </h3>
          <div className='max-h-[300px]  overflow-y-auto max-w-[640px]'>
            {pageState?.orderItems.map((item: CartItem) => (
              <div className='flex items-start max-w-[600px] py-2'>
                <div className='flex items-start flex-1'>
                  <img src={item.courseThumbnailFileUrl} alt='' className='flex-shrink-0 object-cover w-12 h-12 mr-2' />
                  <h2 className='text-sm font-semibold max-w-[400px]'>{item.courseName}</h2>
                </div>
                <div className='font-medium'>${item.currentPrice.amount}</div>
              </div>
            ))}
          </div>
        </div>
        <Separator className='my-4'></Separator>
        <div className='text-xl underline text-primary-1'>Review order details</div>
        <div className='flex items-center my-8'>
          <span className='text-[32px] font-medium'>Total:</span>
          <span className='ml-6 text-4xl font-medium text-primary-1'>${pageState?.totalPrice}</span>
        </div>
        <Button variant={'custom'} className='w-full !py-7 text-xl max-w-[500px]'>
          Checkout
        </Button>
      </div>
    </div>
  )
}
