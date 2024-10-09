import React from 'react'
import { Link } from 'react-router-dom'

export default function SystemNotification() {
  return (
    <div className='text-center py-[18px] px-6 bg-primary-3 rounded-lg'>
      <span>Have questions? </span>
      <span>
        Learn more about creating your course in the{' '}
        <Link to='/' className='underline text-primary-1'>
          Teaching center
        </Link>
      </span>
    </div>
  )
}
