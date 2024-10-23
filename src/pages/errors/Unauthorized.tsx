import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Unauthorized() {
  const navigate = useNavigate()
  return (
    <div className='h-svh'>
      <div className='flex flex-col items-center justify-center w-full h-full gap-2 m-auto'>
        <h1 className='text-[7rem] font-bold leading-tight'>401</h1>
        <span className='font-medium'>Oops! You don't have permission to access this page.</span>
        <p className='text-center text-muted-foreground'>
          It looks like you tried to access a resource that requires proper authentication. <br />
          Please log in with the appropriate credentials.
        </p>
        <div className='flex gap-4 mt-6'>
          <Button onClick={() => navigate('/admin')}>Back to Home</Button>
        </div>
      </div>
    </div>
  )
}
