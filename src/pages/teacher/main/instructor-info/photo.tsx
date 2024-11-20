import ImageDropUpload from '@/components/ImageDropUpload'
import SectionLoading from '@/components/Loading/SectionLoading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FILE_CHUNK_SIZE } from '@/constants'
import { useAppContext } from '@/hooks/useAppContext'
import { UploadAvatar } from '@/services/user.services'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

export default function Photo() {
  const { profile, isAuthenticated } = useAppContext()
  const [previewURL, setPreviewURL] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (profile?.avatar) {
      setPreviewURL(profile?.avatar)
    }
  }, [profile])

  const uploadChunk = async (chunk: File, chunkIndex: number, totalChunks: number) => {
    const formData = new FormData()

    formData.append('file', chunk)
    formData.append('chunkIndex', chunkIndex.toString())
    formData.append('totalChunks', totalChunks.toString())
    try {
      return await UploadAvatar(formData)
    } catch (error) {
      console.error(`Error uploading chunk ${chunkIndex + 1}:`, error)
    }
  }

  const queryClient = useQueryClient()

  useEffect(() => {
    if (file) {
      handleUpload()
    }
  }, [file])

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    const totalChunks = Math.ceil(file.size / FILE_CHUNK_SIZE)
    if (totalChunks === 1) {
      await uploadChunk(file, 0, totalChunks)
        .then((data) => {
          queryClient.prefetchQuery(['me', isAuthenticated])
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
        await uploadChunk(chunk, chunkIndex, totalChunks)
          .then((data) => {
            if (chunkIndex === totalChunks - 1) {
              queryClient.prefetchQuery(['me', isAuthenticated])
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
    <div>
      <div className='mb-2 font-bold'>Image preview </div>
      <div className='text-sm font-light'>Minimum 200x200 pixels, Maximum 6000x6000 pixels</div>
      <div className={`mt-5 w-full  rounded-lg  h-[180px] opacity-100 transition-all duration-300 bg-white`}>
        {loading && <SectionLoading></SectionLoading>}
        {previewURL ? (
          <div className='flex flex-col items-center justify-center w-full h-full rounded-lg'>
            <div className='relative p-2'>
              <div className='absolute inset-0 border-2 border-dashed rounded-full border-primary-1 animate-spin-slow'></div>
              <img src={previewURL} className='relative object-cover w-[120px] h-[120px] rounded-full' />
            </div>
            {previewURL && (
              <Label htmlFor='image' className='px-3 py-2 mt-5 border rounded-lg cursor-pointer border-neutral-black'>
                Change Image
              </Label>
            )}
          </div>
        ) : (
          <ImageDropUpload onSetFile={setFile} className='w-full'></ImageDropUpload>
        )}
        <Input
          type='file'
          id='image'
          accept='image/png'
          onChange={(e) => {
            const file = e?.target?.files && e?.target?.files[0]
            if (file) {
              setFile(file)
            }
          }}
          className='hidden'
        ></Input>
      </div>
    </div>
  )
}
