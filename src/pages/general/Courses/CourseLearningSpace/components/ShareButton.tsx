import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import Share from '@/icons/Share'

interface ShareDialogProps {
  courseId: string
  isOpen: boolean
  onClose: () => void
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ShareButton({ courseId, isOpen, onClose, onOpenChange }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)

  const courseLink = `https://localhost:3000/courses/${courseId}`

  const handleCopy = () => {
    navigator.clipboard.writeText(courseLink).then(() => {
      setCopied(true)
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger className='mx-3'>
        <Button variant={'custom'} className='flex items-center outline-none gap-x-3'>
          <Share></Share>
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Course</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <label htmlFor='course-link' className='text-sm font-medium'>
              Course Link
            </label>
            <Input id='course-link' value={courseLink} readOnly className='w-full mt-2' />
          </div>
          <Button variant='outline' onClick={handleCopy} className='w-full'>
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
        </div>
        <DialogFooter>
          <Button variant='secondary' onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
