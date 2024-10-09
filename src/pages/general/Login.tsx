import React from 'react'
import StarIcon from '@/assets/welcome-back.png'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

import AuthCarousel from '@/components/AuthCarousel'
export default function Login() {
  return (
    <div className='h-[80vh] max-h-[80vh] lg:h-[90.5vh] lg:max-h-[90.5vh] container-fluid '>
      <div className='grid w-full h-full grid-cols-1 lg:grid-cols-2'>
        <AuthCarousel></AuthCarousel>
        <div className='justify-center sm:justify-normal flex-1 bg-primary-3 rounded-[20px] flex-col h-full flex p-5 sm:p-[40px] xl:p-[70px]'>
          <div className='flex justify-center'>
            <h1 className='text-2xl sm:text-[32px] font-medium'>Welcome back</h1>
            <img src={StarIcon} alt='' className='w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] ml-2 sm:ml-6' />
          </div>
          <form action=''>
            <div className='mt-3 sm:mt-6'>
              <Label className='text-lg sm:text-xl text-neutral-black'>Your email</Label>
              <Input
                className='h-[50px] sm:h-[65px] bg-transparent sm:!p-4 !outline-none !focus:outline-none mt-[18px] text-lg sm:text-xl text-neutral-silver-3'
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
            <Separator className='my-4 sm:my-12'></Separator>
            <div className='flex items-center space-x-2'>
              <Checkbox id='terms' className='mr-2 sm:mr-5 sm:h-8 sm:w-8' />
              <Label
                htmlFor='terms'
                className='text-sm sm:text-[18px] font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 max-w-[357px] leading-[25px]'
              >
                Remember this account
              </Label>
            </div>
            <Button className='w-full !px-6 !py-4 text-white bg-primary-1 text-lg sm:text-xl h-[50px] sm:h-[60px] mt-3 sm:mt-6'>
              Log in
            </Button>
            <Link to='/forgot-password' className='inline-block mt-6 underline text-primary-1'>
              Forgot password?
            </Link>
            <div className='mt-4 sm:mt-12 py-3 sm:py-[18px] px-4 xl:px-6 bg-neutral-silver text-neutral-silver-3 text-center text-lg sm:text-xl rounded-lg'>
              Don’t have an account?
              <Link to='/signup' className='ml-1 text-sm underline sm:text-base sm:ml-3 text-primary-1'>
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
