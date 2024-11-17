import FileDropUpload from '@/components/FileUploads'
import { Button } from '@/components/ui/button'
import Close from '@/icons/Close'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import UploadStatus from '../VideoUpload/UploadStatus'
import { FILE_CHUNK_SIZE } from '@/constants'
import { UploadSupplementaryResource } from '@/services/instructor/manage/curriculumn.service'

type TResourceUpload = {
  courseId: string
  sectionId: number
  sectionItemId: number
}
export default function ResourcesUpload({ courseId, sectionId, sectionItemId }: TResourceUpload) {
  const [resource, setResource] = useState<File | null>(null)

  const [uploadResource, setUploadResource] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)

  const handleCancelResource = () => {
    setResource(null)
    setUploadResource(false)
  }

  const uploadChunk = async (chunk: File, chunkIndex: number, totalChunks: number, controller: AbortController) => {
    const formData = new FormData()
    formData.append('file', chunk)
    formData.append('chunkIndex', chunkIndex.toString())
    formData.append('totalChunks', totalChunks.toString())
    formData.append('courseId', courseId)
    formData.append('sectionId', sectionId.toString())
    formData.append('sectionItemId', sectionItemId.toString())
    try {
      return await UploadSupplementaryResource(formData)
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        console.log(`Chunk ${chunkIndex + 1} upload aborted`)
      } else {
        console.error(`Error uploading chunk ${chunkIndex + 1}:`, error)
      }
    }
  }

  useEffect(() => {
    handleUpload()
  }, [resource])

  const handleUpload = async () => {
    if (!resource) return
    const totalChunks = Math.ceil(resource.size / FILE_CHUNK_SIZE)
    setIsLoading(true)
    if (totalChunks === 1) {
      const controller = new AbortController()
      await uploadChunk(resource, 0, totalChunks, controller)
        .then((data) => {
          setIsLoading(false)
          setUploadResource(false)
          setResource(null)
          console.log(data)
        })
        .catch((err) => {
          setIsLoading(false)
        })
    } else {
      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const controller = new AbortController()

        const start = chunkIndex * FILE_CHUNK_SIZE
        const end = Math.min(start + FILE_CHUNK_SIZE, resource.size)
        const chunkBlob = resource.slice(start, end)
        const chunk = new File([chunkBlob], resource.name, { type: resource.type, lastModified: resource.lastModified })
        const percentCompleted = Math.round((chunkIndex / totalChunks) * 100)
        setProgress(percentCompleted)
        await uploadChunk(chunk, chunkIndex, totalChunks, controller)
          .then(async (data) => {
            if (chunkIndex === totalChunks - 1) {
              setIsLoading(false)
              setUploadResource(false)
              setResource(null)
              console.log(data)
            }
          })
          .catch((error) => {
            setIsLoading(false)
            console.error(`Error uploading chunk ${chunkIndex + 1}:`, error)
          })
      }
    }
  }

  return (
    <div className='cursor-auto'>
      {!isLoading && (
        <>
          <Button
            className={`${uploadResource ? 'hidden' : 'flex'} items-center justify-center mt-3 border rounded-lg text-neutral-black border-neutral-black hover:bg-inherit hover:text-inherit `}
            variant={'ghost'}
            onClick={() => setUploadResource(true)}
          >
            <Plus className='mr-[10px]'></Plus>
            <span>Resources</span>
          </Button>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${uploadResource ? 'h-auto py-6' : 'h-0 p-0 '}`}
          >
            <h2 className='text-lg font-semibold'>Resources</h2>
            <FileDropUpload onSetFile={setResource} className='my-3'></FileDropUpload>
            <div className='flex items-center justify-end gap-x-3'>
              <Button onClick={handleCancelResource} variant={'custom'}>
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}
      {resource && isLoading && (
        <UploadStatus onRemove={() => {}} filename={resource?.name as string} progress={progress}></UploadStatus>
      )}
    </div>
  )
}
