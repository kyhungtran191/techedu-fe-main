import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Input } from '@/components/ui/input'
import Upload from '@/icons/Upload'

interface VideoUploadProps {
  onUpload: () => void
  onSetFile: Dispatch<SetStateAction<File | null>>
  isAddNewContent: boolean
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onUpload, onSetFile, isAddNewContent }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onSetFile(acceptedFiles[0])
      }
    },
    [onSetFile]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': []
    }
  })

  return (
    <div>
      <div
        {...getRootProps({ className: 'dropzone' })}
        className={`w-full transition-all duration-300 ease-in-out ${isAddNewContent ? 'h-[180px] opacity-100' : 'h-0 opacity-0 border-0'} border-dashed border rounded-lg bg-white border-neutral-silver-3 flex flex-col items-center justify-center text-neutral-silver-3`}
      >
        <Input {...getInputProps()} className='hidden' />
        <Upload className='w-12 h-12 mb-5'></Upload>
        <div className='mt-5 mb-3 text-xl font-medium'>Upload your file</div>
        <div className='text-[18px]'>
          {isDragActive ? (
            <p>Drag you video in here</p>
          ) : (
            <p>
              Drag and drop your file here or <span className='font-light text-primary-1'>choose files</span>
            </p>
          )}
        </div>
      </div>

      {/* {file && (
        <div>
          <p>Selected file: {file.name}</p>
          <button onClick={handleUpload} disabled={uploading}>
            Upload Video
          </button>
          <button onClick={handleCancel} disabled={!uploading}>
            Cancel Upload
          </button>
          {uploading && <div>Uploading... {progress}%</div>}
        </div>
      )} */}
    </div>
  )
}

export default VideoUpload
