import ImageDropUpload from '@/components/ImageDropUpload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useInstructorSetup from '@/hooks/useInstructorSetup'
import Navigate from '@/icons/Navigate'
import React, { useEffect, useState } from 'react'

export default function Screen2() {
  const [previewURL, setPreviewURL] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const { instructorData, setStep, setLocalStorageData, setInstructorData } = useInstructorSetup()

  useEffect(() => {
    if (file) {
      const previewURL = URL.createObjectURL(file)
      setPreviewURL(previewURL)
    }
  }, [file])

  const handleSubmit = () => {
    setInstructorData((prev) => ({ ...prev, image: 'link-thumbnail' }))
    setStep((step) => step + 1)
    setLocalStorageData({
      instructorInfo: { ...instructorData, image: 'link-thumbnail' },
      step: 3
    })
  }

  return (
    <form className='flex flex-col h-full'>
      <div className='absolute inset-0 w-full h-full opacity-40 bg-gradient-to-b from-transparent via-primary-3 to-parent'></div>
      <div
        className='relative z-20 flex-grow pt-10 overflow-y-auto text-xl text-neutral-black no-scrollbar
      w-full max-w-[1008px] mx-auto
      '
      >
        <h2 className='text-4xl font-medium text-center text-primary-1'>Add your profile image</h2>
        <div className='px-3 py-6 mt-8'>
          <div className='flex items-center justify-between'>
            <Label className='mb-[18px] block text-xl'>Profile image</Label>
            {file && previewURL && (
              <Label htmlFor='image' className='px-3 py-2 border rounded-lg cursor-pointer border-neutral-black'>
                Change Image
              </Label>
            )}
          </div>
          <div className={`w-full  rounded-lg  h-[180px] opacity-100 transition-all duration-300 bg-white`}>
            {file && previewURL ? (
              <div className='flex items-center justify-center w-full h-full rounded-lg'>
                <div className='relative p-2'>
                  <div className='absolute inset-0 border-2 border-dashed rounded-full border-primary-1 animate-spin-slow'></div>
                  <img src={previewURL} className='relative object-cover w-[120px] h-[120px] rounded-full' />
                </div>
              </div>
            ) : (
              <ImageDropUpload onSetFile={setFile} className='w-full'></ImageDropUpload>
            )}
            <Input
              type='file'
              id='image'
              accept='image/*'
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
      </div>
      <div className='z-10 flex items-center justify-between w-full py-8 mt-auto bg-white p container-fluid'>
        <div
          className='flex items-center px-3 py-2 rounded-lg cursor-pointer'
          onClick={() => setStep((prev) => prev - 1)}
        >
          <Navigate />
          <span className='ml-[10px] text-neutral-black'>Previous</span>
        </div>
        <Button
          className={`${!file ? 'bg-neutral-silver-3 pointer-events-none cursor-not-allowed' : 'bg-primary-1 cursor-pointer pointer-events-auto'}`}
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </div>
    </form>
  )
}
