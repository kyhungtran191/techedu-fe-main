import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import Image from '@/icons/Image'
import { Input } from '@/components/ui/input'
import { Trash } from 'lucide-react'
import { UploadThumbnail } from '@/services/instructor/draft-course.service'
import { FILE_CHUNK_SIZE } from '@/constants'
import SectionLoading from '@/components/Loading/SectionLoading'
import { UseFormSetValue } from 'react-hook-form'

type TThumbnailUpload = {
  setValue: UseFormSetValue<{
    title: string
    thumbnailFilePath: string
    shortDescription: string
    language: string
    category: string
    subcategory: string
    level: string
    description: string
    videoPromotionFilePath: string
  }>
}

export default function Thumbnail({ setValue }: TThumbnailUpload) {
  const [previewThumbnailURL, setPreviewThumbnailURL] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setLoading] = useState(false)
  // Clear image
  const clearThumbnail = () => {
    setValue('thumbnailFilePath', '')
    setFile(null)
    setPreviewThumbnailURL(null)
  }

  const uploadChunk = async (chunk: File, chunkIndex: number, totalChunks: number, fileId?: string) => {
    const formData = new FormData()
    if (fileId) {
      formData.append('fileId', fileId)
    }
    formData.append('file', chunk)
    formData.append('chunkIndex', chunkIndex.toString())
    formData.append('totalChunks', totalChunks.toString())
    try {
      return await UploadThumbnail(formData)
    } catch (error) {
      console.error(`Error uploading chunk ${chunkIndex + 1}:`, error)
    }
  }

  useEffect(() => {
    if (file) {
      handleUpload()
    }
  }, [file])

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    const totalChunks = Math.ceil(file.size / FILE_CHUNK_SIZE)
    let responseFileId = ''
    if (totalChunks === 1) {
      await uploadChunk(file, 0, totalChunks)
        .then((data) => {
          if (data && data?.data?.value) {
            if (data && data?.data?.value) {
              setPreviewThumbnailURL(data?.data?.value?.courseThumbnailFileUrl)
              setValue('thumbnailFilePath', data?.data?.value?.courseThumbnailFilePath)
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
        // Maybe Occur Error
        await uploadChunk(chunk, chunkIndex, totalChunks, responseFileId)
          .then((data) => {
            if (chunkIndex == 0) {
              if (data && data?.data?.value && data?.data?.value?.fileId) {
                responseFileId = data?.data?.value?.fileId
              }
            }
            if (chunkIndex === totalChunks - 1) {
              if (data && data?.data?.value) {
                setPreviewThumbnailURL(data?.data?.value?.courseThumbnailFileUrl)
                setValue('thumbnailFilePath', data?.data?.value?.courseThumbnailFilePath)
              }
            }
          })
          .catch((error) => {
            console.error(`Error uploading chunk ${chunkIndex + 1}:`, error)
          })
      }
    }
    setLoading(false)
  }

  return (
    <div className='px-3 py-6 bg-white shadow-custom-shadow rounded-xl'>
      <div className='flex items-center justify-between'>
        <h3 className='text-xl font-medium'>Thumbnail</h3>
        {previewThumbnailURL && (
          <Label
            className='bg-transparent border py-3 px-[18px] rounded-lg cursor-pointer block border-neutral-black text-neutral-black hover:text-inherit hover:bg-inherit'
            htmlFor='thumbnail'
          >
            Change thumbnail
          </Label>
        )}
      </div>
      <div className='h-[200px] my-[18px] bg-primary-3 rounded-lg  w-full relative'>
        {isLoading && <SectionLoading className='z-30'></SectionLoading>}
        <div className={`${previewThumbnailURL ? 'hidden' : 'flex'} flex-col items-center justify-center h-full`}>
          <Image className='text-neutral-silver-3 mb-[18px]'></Image>
          <Input
            className='hidden'
            id='thumbnail'
            type='file'
            accept='image/*'
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setFile(file)
              }
            }}
          ></Input>
          <Label
            htmlFor='thumbnail'
            className='bg-transparent border py-3 px-[18px] rounded-lg cursor-pointer block border-neutral-black text-neutral-black hover:text-inherit hover:bg-inherit'
          >
            Upload thumbnail
          </Label>
        </div>
        <div className={`${previewThumbnailURL ? 'block' : 'hidden'} h-full`}>
          {previewThumbnailURL && (
            <div className='relative w-full h-full group'>
              <img src={previewThumbnailURL} alt='' className='relative object-cover w-full h-full ' />
              <div
                onClick={clearThumbnail}
                className='absolute items-center justify-center hidden p-3 transition-all -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg cursor-pointer group-hover:flex left-1/2 top-1/2 hover:bg-red-500 hover:text-white'
              >
                <Trash></Trash>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
