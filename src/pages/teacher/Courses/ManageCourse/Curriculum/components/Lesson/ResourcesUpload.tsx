import FileDropUpload from '@/components/FileUploads'
import { Button } from '@/components/ui/button'
import Close from '@/icons/Close'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import UploadStatus from '../VideoUpload/UploadStatus'
import { FILE_CHUNK_SIZE } from '@/constants'
import { getAssets, UploadSupplementaryResource } from '@/services/instructor/manage/curriculumn.service'
import { toast } from 'react-toastify'
import { PrimaryAsset, SupplementaryAssetItem } from '@/@types/instructor/course/curriculumn'

type TResourceUpload = {
  courseId: string
  sectionId: number
  sectionItemId: number
  handleUpdateSupplementAssets: (updatedAsset: SupplementaryAssetItem[]) => void
}
export default function ResourcesUpload({
  courseId,
  sectionId,
  sectionItemId,
  handleUpdateSupplementAssets
}: TResourceUpload) {
  const [file, setFile] = useState<File | null>(null)

  const [uploadResource, setUploadResource] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)

  const handleCancelResource = () => {
    setFile(null)
    setUploadResource(false)
  }

  useEffect(() => {
    if (file) {
      handleUpload()
    }
  }, [file])

  const uploadChunk = async (chunk: File, chunkIndex: number, totalChunks: number, fileId?: string) => {
    const formData = new FormData()
    if (fileId) {
      formData.append('fileId', fileId)
    }
    formData.append('file', chunk)
    formData.append('chunkIndex', chunkIndex.toString())
    formData.append('totalChunks', totalChunks.toString())
    formData.append('courseId', courseId)
    formData.append('sectionId', sectionId.toString())
    formData.append('sectionItemId', sectionItemId.toString())
    try {
      return await UploadSupplementaryResource(formData)
    } catch (error) {
      console.error(`Error uploading chunk ${chunkIndex + 1}:`, error)
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setIsLoading(true)
    const totalChunks = Math.ceil(file.size / FILE_CHUNK_SIZE)
    let responseFileId = ''
    if (totalChunks === 1) {
      await uploadChunk(file, 0, totalChunks)
        .then(async (data) => {
          if (data && data?.data?.value) {
            const res = await getAssets(courseId, sectionId, sectionItemId)
            if (res && res.data && res?.data?.value) {
              const filtered = res?.data?.value.filter((item) => !item.isPrimary)
              handleUpdateSupplementAssets(filtered as SupplementaryAssetItem[])
            }
          }
        })
        .catch((err) => {
          console.log('err' + err)
        })
    } else {
      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const start = chunkIndex * FILE_CHUNK_SIZE
        const end = Math.min(start + FILE_CHUNK_SIZE, file.size)
        const chunkBlob = file.slice(start, end)
        const chunk = new File([chunkBlob], file.name, { type: file.type, lastModified: file.lastModified })
        const percentCompleted = Math.round((chunkIndex / totalChunks) * 100)
        setProgress(percentCompleted)
        await uploadChunk(chunk, chunkIndex, totalChunks, responseFileId)
          .then(async (data) => {
            if (chunkIndex == 0) {
              if (data && data?.data?.value && data?.data?.value?.fileId) {
                responseFileId = data?.data?.value?.fileId
              }
            }
            if (chunkIndex === totalChunks - 1) {
              if (data && data?.data?.value) {
                const res = await getAssets(courseId, sectionId, sectionItemId)
                if (res && res.data && res?.data?.value) {
                  const filtered = res?.data?.value.filter((item) => !item.isPrimary)
                  handleUpdateSupplementAssets(filtered as SupplementaryAssetItem[])
                  setUploadResource(false)
                }
              }
            }
          })
          .catch((error) => {
            console.error(`Error uploading chunk ${chunkIndex + 1}:`, error)
            toast.error('Error when uploading file')
          })
      }
    }
    setIsLoading(false)
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
            <FileDropUpload onSetFile={setFile} className='my-3'></FileDropUpload>
            <div className='flex items-center justify-end gap-x-3'>
              <Button onClick={handleCancelResource} variant={'custom'}>
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}
      {file && isLoading && (
        <UploadStatus onRemove={() => {}} filename={file?.name as string} type={file.type} progress={progress}></UploadStatus>
      )}
    </div>
  )
}
