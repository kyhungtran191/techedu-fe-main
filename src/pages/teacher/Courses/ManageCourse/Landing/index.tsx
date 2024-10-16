import CourseNote from '@/components/CourseNote'
import CourseTitle from '@/components/CourseTittle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Welcome from '@/assets/welcome-back.png'
// Lib UI
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Language from '@/icons/CourseDetail/Language'
import Info from '@/icons/Info'
import Image from '@/icons/Image'
import PlayBtn from '@/icons/CourseDetail/PlayBtn'
import Description from '@/pages/general/Courses/CourseDetail/components/Description'
import Instructor from '@/assets/instructor.jfif'
import { Plus, Trash } from 'lucide-react'
import ThreeDots from '@/icons/ThreeDots'
import Tiptap from '@/components/TipTap'
import SystemNotification from '../components/SystemNotification'
import AIButton from '@/components/AIButton'
import { Label } from '@/components/ui/label'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { MAX_VIDEO_SIZE } from '@/constants'

export default function LandingPage() {
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [previewThumbnailURL, setPreviewThumbnailURL] = useState<string | null>(null)

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message = 'You have not save data, you wanna save it ?'

      event.returnValue = message // Trình duyệt sẽ hiển thị cảnh báo này
      return message // Một số trình duyệt yêu cầu trả về giá trị
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const schema = yup.object().shape({
    thumbnail: yup.mixed().required('Please choose image video'),
    title: yup.string().required('Course title is require').max(180, 'Course title limit 180 characters'),
    subtitle: yup.string().required('Course title is require').max(180, 'Course subtitle limit 180 characters'),
    language: yup.string().required('Please choose course language'),
    category: yup.string().required('Please choose course category'),
    subcategory: yup.string().required('Please choose course subcategory'),
    level: yup.string().required('Please choose course level'),
    description: yup
      .string()
      .required('Course description is required')
      .max(180, 'Course subtitle limit 180 characters'),
    video: yup.mixed().test('fileSize', 'Video size must be less than 4GB', (value) => {
      if (!value) return false
      return (value as File).size <= MAX_VIDEO_SIZE
    })
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    watch,
    getValues,
    setValue
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  // Clear image
  const clearThumbnail = () => {
    setThumbnail(null)
    setPreviewThumbnailURL(null)
  }

  // Change image Function
  const onThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    setThumbnail(file)
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewThumbnailURL(url)
    } else {
      setPreviewThumbnailURL(null)
    }
  }

  // Handle submit form function
  const submitForm = (data: unknown) => {
    console.log(data)
  }

  // Watch have video file or not
  const videoFile = watch('video')

  return (
    <div className='flex flex-col h-full'>
      <SystemNotification></SystemNotification>
      <div className='flex-grow p-6 mt-4 overflow-y-auto bg-white rounded-xl no-scrollbar text-neutral-black'>
        <div className='flex items-start bg-[#FFF5CC] p-3 text-neutral-black font-medium mb-6'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='25'
            height='25'
            viewBox='0 0 25 25'
            fill='none'
            className='mr-[18px]'
          >
            <g clipPath='url(#clip0_3294_8371)'>
              <path
                d='M11.5 7.79688H13.5V9.79688H11.5V7.79688ZM11.5 11.7969H13.5V17.7969H11.5V11.7969ZM12.5 2.79688C6.98 2.79688 2.5 7.27688 2.5 12.7969C2.5 18.3169 6.98 22.7969 12.5 22.7969C18.02 22.7969 22.5 18.3169 22.5 12.7969C22.5 7.27688 18.02 2.79688 12.5 2.79688ZM12.5 20.7969C8.09 20.7969 4.5 17.2069 4.5 12.7969C4.5 8.38688 8.09 4.79688 12.5 4.79688C16.91 4.79688 20.5 8.38688 20.5 12.7969C20.5 17.2069 16.91 20.7969 12.5 20.7969Z'
                fill='#588E58'
              />
            </g>
            <defs>
              <clipPath id='clip0_3294_8371'>
                <rect width='24' height='24' fill='white' transform='translate(0.5 0.796875)' />
              </clipPath>
            </defs>
          </svg>
          <div className='text-[18px]'>
            Your course landing page is essential for your success on Udemy. If executed well, it can also enhance your
            visibility on search engines like Google. Learn more about{' '}
            <span className='underline text-primary-1'>the standards for creating your course landing page</span>
          </div>
        </div>
        <form className='grid grid-cols-12 gap-3' onSubmit={handleSubmit(submitForm)}>
          <div className='col-span-7 '>
            <div className='px-3 py-6 bg-white shadow-custom-shadow rounded-xl'>
              <CourseTitle>Course title</CourseTitle>
              <div className='flex items-center justify-between border rounded-lg border-neutral-black max-w-[916px] p-3 text-neutral-silver-3 text-xl mb-6'>
                <Input
                  className='flex-1 p-0 text-xl border-none outline-none'
                  placeholder={`Ex: No prior coding experience necessary. We'll teach `}
                />
                <span className='pl-6'>160</span>
              </div>
              <CourseNote>
                Your title should be a mix of attention-grabbing, informative, and optimized for search
              </CourseNote>
              {/* Course Subtitle */}
              <CourseTitle>Course subtitle</CourseTitle>
              <div className='flex items-center justify-between border rounded-lg border-neutral-black max-w-[916px] p-3 text-neutral-silver-3 text-xl mb-6'>
                <Input
                  className='flex-1 p-0 text-xl border-none outline-none'
                  placeholder={`Ex: No prior coding experience necessary. We'll teach `}
                />
                <span className='pl-6'>160</span>
              </div>
              <CourseNote>
                Use 1 or 2 related keywords, and mention 3-4 of the most important areas that you've covered during your
                course.
              </CourseNote>
              <div className='flex items-start justify-between'>
                <CourseTitle>Course description</CourseTitle>
                <AIButton></AIButton>
              </div>
              <Tiptap
                description='This is your content'
                onChange={(e) => console.log('e' + e)}
                className='my-6'
              ></Tiptap>
              <CourseNote>Description should have minimum 200 words.</CourseNote>
            </div>
            <div className='px-3 py-6 mt-6 bg-white shadow-custom-shadow rounded-xl'>
              <CourseTitle>Basic infomation</CourseTitle>
              <div className='mt-[14px] mb-8'>
                <h3 className='text-xl font-medium'>Language</h3>
                <Select>
                  <SelectTrigger className='flex items-center px-8 py-7 text-xl rounded-lg w-fit mt-[18px] min-w-[306px] focus:outline-none'>
                    <Language className='mr-5'></Language>
                    <SelectValue placeholder='Select Language' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='apple' className='!px-8 py-3 text-xl font-medium border-b'>
                      <div>Viet Nam</div>
                    </SelectItem>
                    <SelectItem value='english' className='!px-8 py-3 text-xl font-medium border-b'>
                      <div>English</div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='mb-8'>
                <h3 className='text-xl font-medium'>Level</h3>
                <Select>
                  <SelectTrigger className='flex items-center px-8 py-7 text-xl rounded-lg mt-[18px] w-full focus:outline-none '>
                    <SelectValue placeholder='-- Choose category --' className='!text-neutral-silver-3' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='cat-1' className='!px-8 py-3 text-xl font-medium border-b'>
                      <div>Category 1</div>
                    </SelectItem>
                    <SelectItem value='cat-2' className='!px-8 py-3 text-xl font-medium border-b'>
                      <div>Category 2</div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='mb-8'>
                <h3 className='text-xl font-medium'>Category</h3>
                <Select>
                  <SelectTrigger className='flex items-center px-8 py-7 text-xl rounded-lg mt-[18px] w-full focus:outline-none'>
                    <SelectValue placeholder='-- Choose category --' className='!text-neutral-silver-3' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='cat-1' className='!px-8 py-3 text-xl font-medium border-b'>
                      <div>Category 1</div>
                    </SelectItem>
                    <SelectItem value='cat-2' className='!px-8 py-3 text-xl font-medium border-b'>
                      <div>Category 2</div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='mb-8'>
                <h3 className='text-xl font-medium'>Subcategory</h3>
                <Select>
                  <SelectTrigger className='flex items-center px-8 py-7 text-xl rounded-lg mt-[18px] w-full focus:outline-none '>
                    <SelectValue placeholder='-- Choose Sub Category --' className='!text-neutral-silver-3' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='subcat-1' className='!px-8 py-3 text-xl font-medium border-b'>
                      <div>SubCategory 1</div>
                    </SelectItem>
                    <SelectItem value='subcat-2' className='!px-8 py-3 text-xl font-medium border-b'>
                      <div>SubCategory 2</div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='mb-8'>
                <div className='flex items-center justify-between mb-[18px]'>
                  <h3 className='text-xl font-medium'>Topics</h3>
                  <Info className='text-primary-1'></Info>
                </div>
                <div className='flex items-center justify-between border rounded-lg border-neutral-black max-w-[916px] p-3 text-neutral-silver-3 text-xl mb-6'>
                  <Input
                    className='flex-1 p-0 text-xl border-none outline-none'
                    placeholder={`Ex: No prior coding experience necessary. We'll teach `}
                  />
                  <span className='pl-6'>160</span>
                </div>
              </div>
              <Button
                className={`min-w-[300px] py-8 text-xl mt-4 bg-neutral-silver-3`}
                variant={'custom'}
                disabled={Object.keys(errors).length > 0}
              >
                Save
              </Button>
            </div>
          </div>
          <div className='col-span-5'>
            {/* Block 1 */}
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
              <div className='h-[200px] my-[18px] bg-primary-3 rounded-lg  w-full'>
                <div
                  className={`${previewThumbnailURL ? 'hidden' : 'flex'} flex-col items-center justify-center h-full`}
                >
                  <Image className='text-neutral-silver-3 mb-[18px]'></Image>
                  <Input
                    className='hidden'
                    id='thumbnail'
                    type='file'
                    accept='image/*'
                    onChange={onThumbnailChange}
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
            {/* Block 2 */}
            <div className='px-3 py-6 bg-white shadow-custom-shadow rounded-xl mt-[18px]'>
              <div className='flex items-center justify-between'>
                <h3 className='text-xl font-medium'>Promotional video</h3>
                {videoFile && !errors.video && (
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
                  name='video'
                  control={control}
                  render={({ field }) => (
                    <Input
                      className='hidden'
                      id='promotion-video'
                      type='file'
                      accept='video/mp4'
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setValue('video', file)
                          field.onChange(file)
                        }
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
                {errors.video?.message ? (
                  <p className='font-medium text-red-500'>{errors.video.message}</p>
                ) : (
                  <>
                    <span className='font-normal'>Note:</span> a quick and compelling way for students to preview what
                    they’ll learn in your course.
                    <Link className='font-medium underline text-primary-1' to='/'>
                      How to make your promo video awesome?
                    </Link>
                  </>
                )}
              </div>
            </div>
            {/* Block 3 */}
            <div className='px-3 py-6 bg-white shadow-custom-shadow rounded-xl mt-[18px]'>
              <h3 className='text-xl font-medium'>Instructors</h3>
              <div className='my-[18px]'>
                <div className='flex items-start justify-between'>
                  <div className='flex flex-wrap items-start'>
                    <img
                      className='w-[50px] h-[50px] rounded-xl object-cover'
                      src={Instructor}
                      alt='instructor-avatar'
                    />
                    <div className='ml-3 '>
                      <h2 className='text-xl font-medium text-neutral-black'>Rowan Kenelm</h2>
                      <div>15-year UX + Design Veteran</div>
                    </div>
                  </div>
                  <ThreeDots className='cursor-pointer'></ThreeDots>
                </div>
                <Description lineclamp={2} height='50px' wrapperClass='mt-3'></Description>
              </div>
              <div className='flex items-center cursor-pointer w-fit text-primary-1'>
                <Plus className='mr-[10px]'></Plus>
                <p>Add instructor</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
