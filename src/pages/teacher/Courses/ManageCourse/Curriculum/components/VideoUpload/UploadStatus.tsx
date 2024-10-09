import { Progress } from '@/components/ui/progress'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table'
import Close from '@/icons/Close'
import React from 'react'

interface UploadStatusProps {
  filename: string
  type?: string
  progress: number // Progress as a percentage
  uploadDate?: string
  onRemove: () => void // Callback for removing the upload item
}

const UploadStatus: React.FC<UploadStatusProps> = ({
  filename,
  type = 'Video',
  progress = 100,
  uploadDate,
  onRemove
}) => {
  console.log('upload status rerender')

  return (
    <div className='max-h-[200px] relative overflow-auto'>
      <Table>
        <TableHeader className='sticky top-0 bg-neutral-silver'>
          <TableRow className=''>
            <TableHead className='w-[377px] text-primary-1'>Filename</TableHead>
            <TableHead className='w-[120px] text-primary-1'>Type</TableHead>
            <TableHead className='w-[120px] text-primary-1 text-center'>Status</TableHead>
            <TableHead className='w-[120px] text-primary-1 text-center'>Upload date</TableHead>
            <TableHead className='text-right w-[120px]'></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className=''>
          <TableRow>
            <TableCell className='font-bold'>{filename}</TableCell>
            <TableCell>{type}</TableCell>
            <TableCell className='text-center'>
              {filename && progress < 100 ? <Progress value={progress}></Progress> : 'Processing'}
            </TableCell>
            <TableCell className='text-center'>{uploadDate || Date.now()}</TableCell>
            <TableCell className='text-center'>
              {progress == 100 && <div className=''>Replace</div>}
              {filename && progress != 100 && (
                <div className='' onClick={onRemove}>
                  <Close className='w-6 h-6'></Close>
                </div>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default UploadStatus
