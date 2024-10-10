import ImageDropUpload from '@/components/ImageDropUpload'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useCourseSetUp from '@/hooks/useCourseSetUp'
import Navigate from '@/icons/Navigate'
import { Check } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function Screen3() {
  const [file, setFile] = useState<File | null>(null)
  const [previewURL, setPreviewURL] = useState<string | null>(null)
  const [checkedOption, setCheckedOption] = useState<number>(1)
  const { isHavingValues, step, setStep, setCourseData, setLocalStorageData, courseData } = useCourseSetUp()

  useEffect(() => {
    if (checkedOption == 2) {
      setPreviewURL(null)
      setFile(null)
    }
  }, [checkedOption])

  useEffect(() => {
    if (file) {
      const previewURL = URL.createObjectURL(file)
      setPreviewURL(previewURL)
    }
  }, [file])

  useEffect(() => {
    if (courseData.thumbnail) {
      setCheckedOption(1)
      setPreviewURL(courseData.thumbnail)
    } else {
      setCheckedOption(2)
    }
  }, [courseData.thumbnail])

  const handleSubmit = () => {
    if (checkedOption == 2) {
      setCourseData((prev) => ({ ...prev, thumbnail: null }))
      setStep((step) => step + 1)
      setLocalStorageData({
        courseData: { ...courseData, thumbnail: null },
        step: 4
      })
    } else {
      setCourseData((prev) => ({ ...prev, thumbnail: 'link-thumbnail' }))
      setStep((step) => step + 1)
      setLocalStorageData({
        courseData: { ...courseData, thumbnail: 'link-thumbnail' },
        step: 4
      })
    }
  }

  return (
    <form className='flex flex-col h-full'>
      <div className='absolute inset-0 w-full h-full opacity-40 bg-gradient-to-b from-transparent via-primary-3 to-parent'></div>
      <div className='relative z-20 flex-grow pt-10 overflow-y-auto text-xl text-neutral-black'>
        <div className='mb-12 text-center'>
          <h2 className='mb-[18px] text-4xl font-medium text-primary-1'>Capture Attention with thumbnail</h2>
          <p className='max-w-[570px] mx-auto'>Upload one now or choose one later</p>
        </div>
        <div className='max-w-[813px] mx-auto w-full'>
          {/* Upload option */}
          <div onClick={() => setCheckedOption(1)}>
            <div
              className={`flex text-xl items-center justify-between p-6 border ${checkedOption == 1 ? 'rounded-t-lg ' : 'rounded-lg'} cursor-pointer border-silver-3 group`}
            >
              <div className='flex items-center'>
                <div
                  className={`w-6 h-6 rounded-full ${checkedOption == 1 ? 'bg-primary-1 border-primary-1' : 'bg-white border-primary-2'} mr-5 border  flex items-center justify-center`}
                >
                  <Check className='w-4 h-4 text-white'></Check>
                </div>
                <span>Upload an image</span>
              </div>
              {file && previewURL && (
                <Label htmlFor='image' className='px-3 py-2 border rounded-lg cursor-pointer border-neutral-black'>
                  Change Image
                </Label>
              )}
            </div>
            <div
              className={`rounded-b-lg overflow-hidden  ${checkedOption == 1 ? 'p-6 border-x border-b' : 'p-0 border-0'}`}
            >
              <div
                className={`w-full border-2 border-dashed rounded-lg   ${checkedOption == 1 ? 'h-[180px]  opacity-100' : 'h-0  opacity-0'} transition-all duration-300`}
              >
                {file && previewURL ? (
                  <img src={previewURL} className='object-cover w-full h-full'></img>
                ) : (
                  <ImageDropUpload onSetFile={setFile}></ImageDropUpload>
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

          <div onClick={() => setCheckedOption(2)}>
            <div className='flex items-center p-6 mt-6 text-xl border rounded-lg cursor-pointer border-silver-3 group'>
              <div
                className={`w-6 h-6 rounded-full ${checkedOption == 2 ? 'bg-primary-1 border-primary-1' : 'bg-white border-primary-2'} mr-5 border  flex items-center justify-center`}
              >
                <Check className='w-4 h-4 text-white'></Check>
              </div>
              <span>Skip this step for now, I will add it later</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='z-10 flex items-center justify-between w-full py-8 mt-auto bg-white p container-fluid'>
        <div
          className='py-2 px-3 rounded-lg flex items-center cursor-pointer border'
          onClick={() => setStep((prev) => prev - 1)}
        >
          <Navigate />
          <span className='ml-[10px] text-neutral-black'>Previous</span>
        </div>
        <Button
          className={`${checkedOption === 1 && !file ? 'bg-neutral-silver-3 pointer-events-none cursor-not-allowed' : 'bg-primary-1 cursor-pointer pointer-events-auto'}`}
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </div>
    </form>
  )
}
