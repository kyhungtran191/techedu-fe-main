import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription
} from '@/components/ui/alert-dialog'
import { formatErrorMessagesSubmitCourse } from '@/utils/course'
import { Button } from '../ui/button'

const ErrorAlertDialog = ({
  isOpen,
  onClose,
  errors
}: {
  isOpen: boolean
  onClose: () => void
  errors: Record<string, string[]>
}) => {
  const errorMessage = formatErrorMessagesSubmitCourse(errors)

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className='max-h-[90vh] overflow-y-auto'>
        <AlertDialogHeader>
          <AlertDialogTitle>Why you can not submit this course ?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <div className='font-medium text-black whitespace-pre-wrap'>{errorMessage}</div>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <Button onClick={onClose} variant={'custom'}>
            OK
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ErrorAlertDialog
