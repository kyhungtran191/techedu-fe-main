/* eslint-disable react-hooks/rules-of-hooks */
import CourseNote from '@/components/CourseNote'
import CourseTitle from '@/components/CourseTittle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
import Description from '@/pages/general/Courses/CourseDetail/components/Description'
import Instructor from '@/assets/instructor.jfif'
import { Plus, Trash } from 'lucide-react'
import ThreeDots from '@/icons/ThreeDots'
import Tiptap from '@/components/TipTap'
import SystemNotification from '../components/SystemNotification'
import AIButton from '@/components/AIButton'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useGetListCategories } from '@/queries/category'
import SectionLoading from '@/components/Loading/SectionLoading'
import { Category } from '@/@types/category.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { GetSubCategories, GetTopics } from '@/services/categories'
import VideoPromotion from './components/video-promotion'
import Thumbnail from './components/thumbnail'
import { GetCourseLandingPage, UpdateCourseLandingPage } from '@/services/instructor/manage/landing-page.service'
import { TAddUpdateCourseLandingPage, VideoLandingPageAsset } from '@/@types/instructor/course/landing-page'
import { MultiSelect, OptionType, SelectedType } from '@/components/MultiSelect'
import Notification from './components/notification'
import { toast } from 'react-toastify'

type FormData = {
  thumbnailFilePath?: string
  title: string
  shortDescription: string
  language: string
  category: string
  subcategory: string
  level: string
  description: string
}

export default function LandingPage() {
  const [videoPromotion, setVideoPromotion] = useState<VideoLandingPageAsset | null>(null)
  const [selected, setSelected] = useState<SelectedType[]>([])
  const [options, setOptions] = useState<OptionType[]>([])

  const { id } = useParams()
  if (!id) {
    return
  }

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message = 'You have not save data, you wanna save it ?'
      event.returnValue = message
      return message
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const schema = yup.object().shape({
    thumbnailFilePath: yup.string(),
    title: yup.string().required('Course title is require').max(180, 'Course title limit 180 characters'),
    shortDescription: yup.string().required('Course title is require').max(180, 'Course subtitle limit 180 characters'),
    language: yup.string().required('Please choose course language'),
    category: yup.string().required('Please choose course category'),
    subcategory: yup.string().required('Please choose course subcategory'),
    level: yup.string().required('Please choose course level'),
    description: yup
      .string()
      .required('Course description is required')
      .max(180, 'Course subtitle limit 180 characters')
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    getValues,
    setValue,
    reset
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  // Handle submit form function

  const { data: categoryData, isLoading: categoryLoading } = useGetListCategories({
    select: (data) => data.data.value
  })

  // Get subcategories
  const categoryId = watch('category')
  const subCategoriesData = useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: () => GetSubCategories(categoryId),
    select: (data) => data.data.value,
    enabled: Boolean(categoryId)
  })

  const landingPageData = useQuery({
    queryKey: ['landing-page', id],
    queryFn: () => GetCourseLandingPage(id),
    select: (data) => data.data.value,
    onSuccess(res) {
      reset({
        category: res?.primaryCategory?.primaryId,
        description: res?.description,
        language: res?.language,
        level: res?.level,
        shortDescription: res?.shortDescription,
        title: res?.title,
        subcategory: res?.subCategory?.subcategoryId
      })
      setSelected(() => {
        return res?.topics.map((item: any) => ({ label: item.name, value: item.name })) as SelectedType[]
      })
      setVideoPromotion({
        videoPromotionFilePath: res?.videoPromotionFilePath || ' ',
        videoPromotionFileUrl: res?.videoPromotionUrl || '',
        videoPromotionFileSize: res?.videoPromotionFileSize || 0
      })
    }
  })

  const updateLandingPageMutation = useMutation({
    mutationFn: (data: TAddUpdateCourseLandingPage) => UpdateCourseLandingPage(id, data)
  })

  const topicsQuery = useQuery({
    queryKey: ['topics'],
    queryFn: GetTopics,
    select: (data) => data.data.value,
    onSuccess: (data) => {
      if (data) {
        const optionsList: OptionType[] = data.map((item) => ({
          label: item.name,
          value: item.name
        }))
        setOptions(optionsList)
      }
    }
  })

  const currentValue = watch()
  const submitForm = (data: FormData) => {
    if (selected.length < 4) {
      toast.error('Must have at least 4 topics')
      return
    }
    const landingPageAddData: TAddUpdateCourseLandingPage = {
      categoryId: data.category,
      description: data.description,
      languge: data.language,
      level: data.level,
      shortDescription: data.shortDescription,
      subcategoryId: data.subcategory.toLowerCase(),
      thumbnailFilePath: data.thumbnailFilePath || '',
      title: data.title,
      topicNames: selected.map((item) => item.value as string),
      videoPromotionFilePath: videoPromotion?.videoPromotionFilePath || '',
      videoPromotionFileSize: videoPromotion?.videoPromotionFileSize || 0
    }
    updateLandingPageMutation.mutate(landingPageAddData, {
      onSuccess: () => {
        toast.success('Update landing page successfully!')
      },
      onError: (err) => {
        console.log('Error when update landing page data', err)
      }
    })
  }
  return (
    <div className='flex flex-col h-full'>
      <SystemNotification></SystemNotification>
      {landingPageData?.isLoading || updateLandingPageMutation.isLoading ? (
        <SectionLoading></SectionLoading>
      ) : (
        <div className='flex-grow p-6 mt-4 overflow-y-auto bg-white rounded-xl no-scrollbar text-neutral-black'>
          <Notification></Notification>
          <form className='grid grid-cols-12 gap-3' onSubmit={handleSubmit(submitForm)}>
            <div className='col-span-7 '>
              <div className='px-3 py-6 bg-white shadow-custom-shadow rounded-xl'>
                <CourseTitle>Course title</CourseTitle>
                <Controller
                  control={control}
                  name='title'
                  render={({ field }) => (
                    <div className='flex items-center justify-between border rounded-lg border-neutral-black max-w-[916px] p-3 [placeholder]:text-neutral-silver-3 text-xl mb-6'>
                      <Input
                        className='flex-1 p-0 text-xl border-none outline-none'
                        placeholder={`Ex: No prior coding experience necessary. We'll teach `}
                        {...field}
                      />
                      <span className='pl-6'>160</span>
                    </div>
                  )}
                />

                <CourseNote>
                  Your title should be a mix of attention-grabbing, informative, and optimized for search
                </CourseNote>
                {/* Course Subtitle */}
                <CourseTitle>Course subtitle</CourseTitle>
                <Controller
                  control={control}
                  name='shortDescription'
                  render={({ field }) => (
                    <div className='flex items-center justify-between border rounded-lg border-neutral-black max-w-[916px] p-3 [placeholder]:text-neutral-silver-3 text-xl mb-6'>
                      <Input
                        className='flex-1 p-0 text-xl border-none outline-none'
                        placeholder={`Ex: No prior coding experience necessary. We'll teach `}
                        {...field}
                      />
                      <span className='pl-6'>160</span>
                    </div>
                  )}
                />

                <CourseNote>
                  Use 1 or 2 related keywords, and mention 3-4 of the most important areas that you've covered during
                  your course.
                </CourseNote>
                <div className='flex items-start justify-between'>
                  <CourseTitle>Course description</CourseTitle>
                  <AIButton></AIButton>
                </div>
                <Controller
                  control={control}
                  name='description'
                  render={({ field }) => (
                    <Tiptap
                      className='my-6'
                      placeholder='Description'
                      description={landingPageData?.data?.description || field.value}
                      {...field}
                      onChange={field.onChange}
                    />
                  )}
                />

                <CourseNote>Description should have minimum 200 words.</CourseNote>
              </div>
              <div className='px-3 py-6 mt-6 bg-white shadow-custom-shadow rounded-xl'>
                <CourseTitle>Basic information</CourseTitle>
                <div className='mt-[14px] mb-8'>
                  <h3 className='text-xl font-medium'>Language</h3>

                  <Select value={currentValue.language} onValueChange={(value) => setValue('language', value)}>
                    <SelectTrigger className='flex items-center px-8 py-7 text-xl rounded-lg w-fit mt-[18px] min-w-[306px] focus:outline-none'>
                      <Language className='mr-5'></Language>
                      <SelectValue placeholder='Select Language' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Vietnamese' className='!px-8 py-3 text-xl font-medium border-b'>
                        <div>Vietnamese</div>
                      </SelectItem>
                      <SelectItem value='English' className='!px-8 py-3 text-xl font-medium border-b'>
                        <div>English</div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='mb-8'>
                  <h3 className='text-xl font-medium'>Level</h3>
                  <Select value={currentValue.level} onValueChange={(value) => setValue('level', value)}>
                    <SelectTrigger className='flex items-center px-8 py-7 text-xl rounded-lg mt-[18px] w-full focus:outline-none'>
                      <SelectValue placeholder='-- Choose Level --' className='!text-neutral-silver-3' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Beginner' className='!px-8 py-3 text-xl font-medium border-b'>
                        <div>Beginner</div>
                      </SelectItem>
                      <SelectItem value='Immediately' className='!px-8 py-3 text-xl font-medium border-b'>
                        <div>Immediately</div>
                      </SelectItem>
                      <SelectItem value='Senior' className='!px-8 py-3 text-xl font-medium border-b'>
                        <div>Senior</div>
                      </SelectItem>
                      <SelectItem value='Expert' className='!px-8 py-3 text-xl font-medium border-b'>
                        <div>Expert</div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='mb-8'>
                  <h3 className='text-xl font-medium'>Category</h3>
                  <Select
                    value={currentValue?.category?.toUpperCase()}
                    onValueChange={(value) => setValue('category', value)}
                  >
                    <SelectTrigger className='flex items-center px-8 py-7 text-xl rounded-lg mt-[18px] w-full focus:outline-none '>
                      <SelectValue placeholder='-- Choose category --' className='!text-neutral-silver-3' />
                    </SelectTrigger>
                    <SelectContent className='relative'>
                      {categoryLoading && <SectionLoading></SectionLoading>}
                      {categoryData &&
                        categoryData.map((item: Category) => (
                          <SelectItem
                            value={item.primaryId}
                            key={item.primaryId}
                            className='!px-8 py-3 text-xl font-medium border-b'
                          >
                            <div>{item.displayName}</div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='mb-8'>
                  <h3 className='text-xl font-medium'>Subcategory</h3>
                  <Select
                    value={currentValue?.subcategory?.toUpperCase()}
                    onValueChange={(value) => setValue('subcategory', value)}
                  >
                    <SelectTrigger className='flex items-center px-8 py-7 text-xl rounded-lg mt-[18px] w-full focus:outline-none '>
                      <SelectValue placeholder='-- Choose Sub Category --' className='!text-neutral-silver-3' />
                    </SelectTrigger>
                    <SelectContent className='relative min-h-[100px]'>
                      {subCategoriesData.isLoading && <SectionLoading className='z-30 h-[100px]'></SectionLoading>}
                      {subCategoriesData?.data &&
                        subCategoriesData.data?.map((item: Category) => (
                          <SelectItem value={item.primaryId} className='!px-8 py-3 text-xl font-medium border-b'>
                            <div>{item.displayName}</div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='mb-8'>
                  <div className='flex items-center justify-between mb-[18px]'>
                    <h3 className='text-xl font-medium'>Topics</h3>
                    <Info className='text-primary-1'></Info>
                  </div>
                  <MultiSelect
                    classNameWrapper='px-8 text-xl rounded-lg py-7'
                    name='Topics'
                    options={options}
                    selected={selected}
                    onChange={setSelected}
                  ></MultiSelect>
                </div>
                <Button
                  className={`min-w-[300px] py-8 text-xl mt-4`}
                  variant={'custom'}
                  type='submit'
                  disabled={!isValid}
                >
                  Save
                </Button>
              </div>
            </div>
            <div className='col-span-5'>
              {/* Block 1 */}
              <Thumbnail setValue={setValue} thumbnailUrl={landingPageData?.data?.thumbnailUrl}></Thumbnail>
              {/* Block 2 */}
              <VideoPromotion
                videoPromotion={videoPromotion}
                setVideoPromotion={setVideoPromotion}
                watch={watch}
                control={control}
              ></VideoPromotion>
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
      )}
    </div>
  )
}
