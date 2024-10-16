import React, { Dispatch, SetStateAction, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Input } from '@/components/ui/input'
import Upload from '@/icons/Upload'

interface ImageDropUploadProps {
  onUpload?: () => void
  onSetFile: Dispatch<SetStateAction<File | null>>
  className?: string
}

const ImageDropUpload: React.FC<ImageDropUploadProps> = ({ onUpload, onSetFile, className }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onSetFile(acceptedFiles[0])
      }
    },
    [onSetFile]
  )

  // Configure the dropzone to accept only image files
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [], // Accept JPEG images
      'image/png': [], // Accept PNG images
      'image/gif': [], // Accept GIF images
      'image/webp': [] // Accept WEBP images
    }
  })

  return (
    <div className={className}>
      <div
        {...getRootProps({ className: 'dropzone' })}
        className={`w-full transition-all duration-300 ease-in-out  h-[180px] opacity-100 border-dashed border rounded-lg bg-white border-neutral-silver-3 flex flex-col items-center justify-center text-neutral-silver-3`}
      >
        <Input {...getInputProps()} className='hidden' />
        <Upload className='w-12 h-12 mb-5' />
        <div className='mt-5 mb-3 text-xl font-medium'>Upload your image</div>
        <div className='text-[18px]'>
          {isDragActive ? (
            <p>Drop your image here...</p> // Message when dragging an image
          ) : (
            <p>
              Drag and drop your image here or <span className='font-light text-primary-1'>choose files</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageDropUpload
