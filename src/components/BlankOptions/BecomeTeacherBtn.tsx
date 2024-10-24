import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

export default function BecomeTeacherBtn({ className }: { className: string }) {
  const navigate = useNavigate()
  return (
    <Button
      onClick={() => navigate('/teacher/courses')}
      className={`text-white bg-primary-1 !px-[18px] !py-3 xl:w-[174px] h-[47px] ${className}`}
    >
      Become a teacher
    </Button>
  )
}
