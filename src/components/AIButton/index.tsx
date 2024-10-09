import React from 'react'
import { Button } from '../ui/button'
import Welcome from '@/assets/welcome-back.png'
export default function AIButton() {
  return (
    <Button className='flex items-center !py-6 text-white rounded-lg bg-primary-1'>
      <span>Use AI Writing</span>
      <img src={Welcome} alt='' className='object-cover w-6 h-6 ml-[10px]' />
    </Button>
  )
}
