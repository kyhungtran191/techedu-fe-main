import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginBtn() {
  return (
    <Link className='inline-block text-lg text-primary-1' to='/login'>
      Login
    </Link>
  )
}
