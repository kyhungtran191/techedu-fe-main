import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FILE_CHUNK_SIZE } from '@/constants'
import PlayBtn from '@/icons/CourseDetail/PlayBtn'
import React, { useState } from 'react'
import { Controller, UseFormSetValue } from 'react-hook-form'
import { Link } from 'react-router-dom'

type TUploadPromotionVideo = {
  control: any
  errors: any
  watch: any
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

export default function VideoPromotion({ control, errors }: TUploadPromotionVideo) {
  const [file, setFile] = useState<File | null>(null)
  const [videoURl, setProfileUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const uploadChunk = async (chunk: File, chunkIndex: number, totalChunks: number) => {
    const formData = new FormData()
    formData.append('file', chunk)
    formData.append('chunkIndex', chunkIndex.toString())
    formData.append('totalChunks', totalChunks.toString())
    // formData.append('courseId', courseId)
    // formData.append('sectionId', sectionId.toString())
    // formData.append('sectionItemId', sectionItemId.toString())
    try {
      // return await UpdateContentVideo(formData)
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        console.log(`Chunk ${chunkIndex + 1} upload aborted`)
      } else {
        console.error(`Error uploading chunk ${chunkIndex + 1}:`, error)
      }
    }
  }

  const handleUpload = async () => {
    if (!file) return
    const totalChunks = Math.ceil(file.size / FILE_CHUNK_SIZE)
    setIsLoading(true)
    if (totalChunks === 1) {
      await uploadChunk(file, 0, totalChunks)
        .then(async (data) => {
          setIsLoading(false)
        })
        .catch((err) => {
          setIsLoading(false)
        })
    } else {
      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const controller = new AbortController()

        const start = chunkIndex * FILE_CHUNK_SIZE
        const end = Math.min(start + FILE_CHUNK_SIZE, file.size)
        const chunkBlob = file.slice(start, end)
        const chunk = new File([chunkBlob], file.name, { type: file.type, lastModified: file.lastModified })

        await uploadChunk(chunk, chunkIndex, totalChunks)
          .then(async (data) => {
            if (chunkIndex === totalChunks - 1) {
              setIsLoading(false)
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
    <div className='px-3 py-6 bg-white shadow-custom-shadow rounded-xl mt-[18px]'>
      <div className='flex items-center justify-between'>
        <h3 className='text-xl font-medium'>Promotional video</h3>
        {videoURl && (
          <Label
            className='bg-transparent border py-3 px-[18px] rounded-lg cursor-pointer block border-neutral-black text-neutral-black hover:text-inherit hover:bg-inherit'
            htmlFor='promotion-video'
          >
            Change Video
          </Label>
        )}
      </div>
      <div className='my-[18px] w-full h-[185px] flex flex-col items-center justify-center bg-primary-3 rounded-lg'>
        <PlayBtn className='w-12 h-12 text-neutral-silver-3 mb-[18px]'></PlayBtn>
        <Controller
          name='videoPromotionFilePath'
          control={control}
          render={({ field }) => (
            <Input
              className='hidden'
              id='promotion-video'
              type='file'
              accept='video/mp4'
              {...field}
              onChange={(e) => {
                const file = e.target.files?.[0]
              }}
            />
          )}
        />
        <Label
          htmlFor='promotion-video'
          className='bg-transparent border py-3 px-[18px] rounded-lg cursor-pointer block border-neutral-black text-neutral-black hover:text-inherit hover:bg-inherit'
        >
          Upload video
        </Label>
      </div>
      <div className='font-light'>
        {errors.videoPromotionFilePath?.message ? (
          <p className='font-medium text-red-500'>{errors.videoPromotionFilePath.message}</p>
        ) : (
          <>
            <span className='font-normal'>Note:</span> a quick and compelling way for students to preview what they’ll
            learn in your course.
            <Link className='font-medium underline text-primary-1' to='/'>
              How to make your promo video awesome?
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
