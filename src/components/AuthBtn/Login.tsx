import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <Link className='inline-block text-base sm:text-lg text-primary-1' to='/login'>
      Login
    </Link>
  )
}
