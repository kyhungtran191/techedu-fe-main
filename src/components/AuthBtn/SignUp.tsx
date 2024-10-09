import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const navigate = useNavigate()
  return (
    <Button variant={'outline'} className='border-neutral-black text-neutral-black' onClick={() => navigate('/signup')}>
      Sign up
    </Button>
  )
}
