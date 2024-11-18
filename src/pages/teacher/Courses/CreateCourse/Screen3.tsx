import { ResponseData } from '@/@types/response.type'
import ImageDropUpload from '@/components/ImageDropUpload'
import SectionLoading from '@/components/Loading/SectionLoading'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FILE_CHUNK_SIZE } from '@/constants'
import useCourseSetUp from '@/hooks/useCourseSetUp'
import Navigate from '@/icons/Navigate'
import { UploadThumbnail } from '@/services/instructor/draft-course.service'
import { Check } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function Screen3() {
  const [file, setFile] = useState<File | null>(null)
  const [previewURL, setPreviewURL] = useState<string | null>(null)
  const [checkedOption, setCheckedOption] = useState<number>(1)
  const { setStep, setCourseData, setLocalStorageData, courseData, step } = useCourseSetUp()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (checkedOption == 2) {
      setFile(null)
    }
  }, [checkedOption])

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
    try {
      return await UploadThumbnail(formData)
    } catch (error) {
      console.error(`Error uploading chunk ${chunkIndex + 1}:`, error)
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    const totalChunks = Math.ceil(file.size / FILE_CHUNK_SIZE)
    let responseFileId = ''
    if (totalChunks === 1) {
      await uploadChunk(file, 0, totalChunks)
        .then((data) => {
          if (data && data?.data?.value) {
            setCourseData((prev) => ({
              ...prev,
              thumbnail: {
                courseThumbnailFilePath: data?.data?.value?.courseThumbnailFilePath as string,
                courseThumbnailFileUrl: data?.data?.value?.courseThumbnailFileUrl as string
              }
            }))
            setLocalStorageData({
              courseData: {
                ...courseData,
                thumbnail: {
                  courseThumbnailFilePath: data?.data?.value?.courseThumbnailFilePath as string,
                  courseThumbnailFileUrl: data?.data?.value?.courseThumbnailFileUrl as string
                }
              },
              step: step
            })
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
                setCourseData((prev) => ({
                  ...prev,
                  thumbnail: {
                    courseThumbnailFilePath: data?.data?.value?.courseThumbnailFilePath as string,
                    courseThumbnailFileUrl: data?.data?.value?.courseThumbnailFileUrl as string
                  }
                }))

                setLocalStorageData({
                  courseData: {
                    ...courseData,
                    thumbnail: {
                      courseThumbnailFilePath: data?.data?.value?.courseThumbnailFilePath as string,
                      courseThumbnailFileUrl: data?.data?.value?.courseThumbnailFileUrl as string
                    }
                  },
                  step: step
                })
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

  useEffect(() => {
    console.log(courseData.thumbnail.courseThumbnailFileUrl)
    if (courseData.thumbnail.courseThumbnailFileUrl) {
      setCheckedOption(1)
      setPreviewURL(courseData?.thumbnail?.courseThumbnailFileUrl)
    } else {
      setCheckedOption(2)
    }
  }, [courseData.thumbnail])

  const handleSubmit = () => {
    if (checkedOption == 2) {
      setCourseData((prev) => ({
        ...prev,
        thumbnail: {
          courseThumbnailFilePath: '',
          courseThumbnailFileUrl: ''
        }
      }))
      setStep((step) => step + 1)
      setLocalStorageData({
        courseData: {
          ...courseData,
          thumbnail: {
            courseThumbnailFilePath: '',
            courseThumbnailFileUrl: ''
          }
        },
        step: 4
      })
    } else {
      setStep((step) => step + 1)
      setLocalStorageData({
        courseData: courseData,
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
              {previewURL && (
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
                {previewURL ? (
                  <img src={previewURL} className='object-cover w-full h-full'></img>
                ) : (
                  <div className='relative'>
                    {loading && <SectionLoading></SectionLoading>}
                    <ImageDropUpload onSetFile={setFile}></ImageDropUpload>
                  </div>
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
          className='flex items-center px-3 py-2 border rounded-lg cursor-pointer'
          onClick={() => setStep((prev) => prev - 1)}
        >
          <Navigate />
          <span className='ml-[10px] text-neutral-black'>Previous</span>
        </div>
        <Button
          className={`${checkedOption === 1 && !previewURL ? 'bg-neutral-silver-3 pointer-events-none cursor-not-allowed' : 'bg-primary-1 cursor-pointer pointer-events-auto'}`}
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </div>
    </form>
  )
}
