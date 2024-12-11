import { VideoLandingPageAsset } from '@/@types/instructor/course/landing-page'
import SectionLoading from '@/components/Loading/SectionLoading'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FILE_CHUNK_SIZE } from '@/constants'
import PlayBtn from '@/icons/CourseDetail/PlayBtn'
import { UploadVideoPromotion } from '@/services/instructor/manage/landing-page.service'
import React, { useEffect, useState } from 'react'
import { Controller, UseFormSetValue } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'

type TUploadPromotionVideo = {
  control: any
  watch: any
  setVideoPromotion: React.Dispatch<React.SetStateAction<VideoLandingPageAsset | null>>
  videoPromotion: VideoLandingPageAsset | null
}

export default function VideoPromotion({ videoPromotion, setVideoPromotion }: TUploadPromotionVideo) {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { id } = useParams()
  console.log('videoPromotionFilePath' + videoPromotion?.videoPromotionFilePath)
  useEffect(() => {
    if (file) {
      setVideoPromotion(null)
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
    try {
      return await UploadVideoPromotion(id as string, formData)
    } catch (error: any) {
      console.log('Error when upload chunk file')
    }
  }

  const handleUpload = async () => {
    if (!file) return

    const totalChunks = Math.ceil(file.size / FILE_CHUNK_SIZE)
    let responseFileId = ''
    setIsLoading(true)
    if (totalChunks === 1) {
      await uploadChunk(file, 0, totalChunks)
        .then(async (data) => {
          if (data && data?.data?.value) {
            const res = data?.data?.value
            setVideoPromotion({
              videoPromotionFilePath: res.videoPromotionFilePath,
              videoPromotionFileSize: res.videoPromotionFileSize,
              videoPromotionFileUrl: res.videoPromotionFileUrl
            })
          }
          setIsLoading(false)
        })
        .catch((err) => {
          setIsLoading(false)
        })
    } else {
      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const start = chunkIndex * FILE_CHUNK_SIZE
        const end = Math.min(start + FILE_CHUNK_SIZE, file.size)
        const chunkBlob = file.slice(start, end)
        const chunk = new File([chunkBlob], file.name, { type: file.type, lastModified: file.lastModified })
        await uploadChunk(chunk, chunkIndex, totalChunks, responseFileId)
          .then(async (data) => {
            if (chunkIndex == 0) {
              console.log(data)
              if (data && data?.data?.value && data?.data?.value?.fileId) {
                responseFileId = data?.data?.value?.fileId
              }
            }
            if (chunkIndex === totalChunks - 1) {
              console.log('Upload success with data', data)
              setIsLoading(false)
              if (data && data?.data?.value) {
                const res = data?.data?.value
                setVideoPromotion({
                  videoPromotionFilePath: res.videoPromotionFilePath,
                  videoPromotionFileSize: res.videoPromotionFileSize,
                  videoPromotionFileUrl: res.videoPromotionFileUrl
                })
              }
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
    <div className='px-3 py-6 bg-white shadow-custom-shadow rounded-xl mt-[18px] relative'>
      {isLoading && <SectionLoading></SectionLoading>}
      <div className='flex items-center justify-between'>
        <h3 className='text-xl font-medium'>Promotional video</h3>
        {videoPromotion?.videoPromotionFileUrl && (
          <Label
            className='bg-transparent border py-3 px-[18px] rounded-lg cursor-pointer block border-neutral-black text-neutral-black hover:text-inherit hover:bg-inherit'
            htmlFor='promotion-video'
          >
            Change Video
          </Label>
        )}
      </div>
      <div
        className={`my-[18px] w-full  ${videoPromotion?.videoPromotionFileUrl ? 'h-[300px]' : 'h-[185px]'}   flex flex-col items-center justify-center bg-primary-3 rounded-lg`}
      >
        {!videoPromotion?.videoPromotionFileUrl && (
          <PlayBtn className='w-12 h-12 text-neutral-silver-3 mb-[18px]'></PlayBtn>
        )}
        <Input
          className='hidden'
          id='promotion-video'
          type='file'
          accept='video/mp4'
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setFile(file)
            }
          }}
        />
        {!videoPromotion?.videoPromotionFileUrl && (
          <Label
            htmlFor='promotion-video'
            className='bg-transparent border py-3 px-[18px] rounded-lg cursor-pointer block border-neutral-black text-neutral-black hover:text-inherit hover:bg-inherit'
          >
            Upload video
          </Label>
        )}
        {videoPromotion?.videoPromotionFileUrl && (
          <video src={videoPromotion?.videoPromotionFileUrl} controls className='w-full h-full'></video>
        )}
      </div>
    </div>
  )
}
