import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

import AuthCarousel from '@/components/AuthCarousel'

export default function SignUp() {
  return (
    <div className=' h-[80vh] max-h-[80vh] lg:h-[90.5vh] lg:max-h-[90.5vh] container-fluid'>
      <div className='grid w-full h-full grid-cols-1 lg:grid-cols-2'>
        <AuthCarousel></AuthCarousel>
        <div className='bg-primary-3 rounded-[20px] flex-col h-full flex p-5 sm:p-[40px] xl:p-[70px] justify-center sm:justify-normal'>
          <div className='flex justify-center'>
            <h1 className='text-2xl sm:text-[32px] font-medium'>Create your account</h1>
          </div>
          <form action=''>
            <div className='mt-3 sm:mt-6'>
              <Label className='text-lg sm:text-xl text-neutral-black'>Your email</Label>
              <Input
                className='h-[50px] sm:h-[65px] bg-transparent !p-4 !outline-none !focus:outline-none mt-[18px] text-lg sm:text-xl text-neutral-silver-3'
                placeholder='Enter your email'
              ></Input>
            </div>
            <div className='mt-3 sm:mt-6'>
              <Label className='text-lg sm:text-xl text-neutral-black'>Your password</Label>
              <Input
                type='password'
                className='h-[50px] sm:h-[65px] bg-transparent !p-4 !outline-none !focus:outline-none mt-[18px] text-lg sm:text-xl text-neutral-silver-3'
                placeholder='Enter your password'
              ></Input>
            </div>
            <Separator className='my-3 sm:my-12'></Separator>
            <div className='flex items-start space-x-2'>
              <Checkbox id='terms' className='w-8 h-8 mr-5' />
              <Label
                htmlFor='terms'
                className='text-sm sm:text-[18px] font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-[25px]'
              >
                I don’t want to receive news and coupons by email.
              </Label>
            </div>
            <Button className='w-full !px-6 !py-4 text-white bg-primary-1 text-lg sm:text-xl h-[50px] sm:h-[60px] sm:mt-6 mt-3'>
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
