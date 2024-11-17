import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PlayBtn from '@/icons/CourseDetail/PlayBtn'
import Quiz from '@/icons/Quiz'
import Document2 from '@/icons/CourseDetail/Document2'
import Close from '@/icons/Close'
import { Input } from '@/components/ui/input'

// validate RHF
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { COURSE_TYPE } from '@/constants/course'
import { SectionItem, TSectionCurriculum } from '@/@types/instructor/course/curriculumn'
import SectionLoading from '@/components/Loading/SectionLoading'
import { useMutation } from '@tanstack/react-query'
import { AddLessonItem } from '@/services/instructor/manage/curriculumn.service'
import { useHandleOrderSectionItemMutation } from '@/mutations/useHandleOrderSectionItemMutation'
import { handleFormatReorderCurriculum } from '@/utils/course'

type TAddLessonProps = {
  courseId: string
  sectionId: number
  updateSections: (updatedSections: TSectionCurriculum[]) => void
  sections: TSectionCurriculum[]
}
export default function AddLesson({ courseId, sectionId, sections, updateSections }: TAddLessonProps) {
  const [isAddLesson, setIsAddLesson] = useState(false)
  const [isApplyLesson, setApplyLesson] = useState(false)

  const schema = yup.object().shape({
    title: yup.string().required('Required_field').max(80, 'Max is 80')
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    getValues
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      title: ''
    }
  })

  const handleCancelCreateLesson = () => {
    reset({
      title: ''
    })
    setIsAddLesson(false)
    setApplyLesson(false)
  }

  const handleSubmitLessonName = () => {
    setApplyLesson(true)
  }

  const addNewLessonMutation = useMutation({
    mutationFn: ({ title, type }: { title: string; type: string }) => AddLessonItem(type, title, courseId, sectionId)
  })

  const updateMutation = useHandleOrderSectionItemMutation()

  const handleSelectSubmitData = (type: string) => {
    const title = getValues('title')
    addNewLessonMutation.mutate(
      { type, title },
      {
        onSuccess(data) {
          const dataRes = data.data.value
          const cloneSections: TSectionCurriculum[] = [...sections]
          const newSections = cloneSections.map((section) => {
            if (section.id === dataRes?.sectionId) {
              const cloneSection: TSectionCurriculum = { ...section }
              cloneSection.sectionItems.push({
                id: dataRes.primaryAsset.sectionItemId,
                itemType: 'Lectures',
                primaryAsset: dataRes.primaryAsset,
                sectionId: dataRes?.sectionId,
                supplementaryAssets: [],
                position: cloneSection.sectionItems.length,
                title
              })
              return cloneSection
            }
            return section
          })

          const newOrderItemsList = handleFormatReorderCurriculum(newSections)
          if (newOrderItemsList) {
            updateMutation.mutate(
              { courseId, sectionItems: newOrderItemsList },
              {
                onSuccess(data) {
                  updateSections(newSections)
                  setIsAddLesson(false)
                  setApplyLesson(false)
                  reset({
                    title: ''
                  })
                },
                onError(err) {
                  console.log('error when update order data', err)
                }
              }
            )
          }
        },
        onError(err) {
          console.log('Add new Lessons Err', err)
        }
      }
    )
  }

  return (
    <div className='relative mt-8'>
      {(addNewLessonMutation.isLoading || updateMutation.isLoading) && <SectionLoading></SectionLoading>}
      <Button
        className={`${isAddLesson ? 'hidden' : 'flex'} items-center px-6 py-6 bg-white shadow-md text-neutral-black`}
        variant={'secondary'}
        onClick={() => setIsAddLesson(true)}
      >
        <Plus></Plus>
        <div className='ml-[10px] text-[18px]'>New lesson</div>
      </Button>
      <form
        className={`${!isAddLesson || isApplyLesson ? 'hidden' : 'flex'} items-center justify-between  mt-6 bg-neutral-silver border-neutral-black`}
        onSubmit={handleSubmit(handleSubmitLessonName)}
      >
        <Controller
          control={control}
          name='title'
          render={({ field }) => (
            <Input
              className='w-full outline-none focus:border-primary-1 max-w-[400px] py-6 text-xl text-neutral-black'
              placeholder='Lesson tittle'
              defaultValue={''}
              {...field}
            ></Input>
          )}
        />

        <div className='flex items-center'>
          <div
            className='py-3 px-[18px] cursor-pointer border border-neutral-black mr-3 rounded-lg'
            onClick={handleCancelCreateLesson}
          >
            Cancel
          </div>
          <Button
            disabled={!isValid}
            className={` text-white p-6 ${errors?.title?.message ? 'bg-neutral-black' : 'bg-primary-1'}`}
            variant={'custom'}
          >
            Apply
          </Button>
        </div>
      </form>
      {isApplyLesson && (
        <div className='flex items-center justify-between px-6 py-4 mt-6 bg-white rounded-lg shadow-lg'>
          <div className='flex items-center gap-x-12'>
            <div
              className='flex items-center cursor-pointer text-neutral-black group hover:text-primary-1'
              onClick={() => handleSelectSubmitData(COURSE_TYPE.VIDEO)}
            >
              <PlayBtn className='w-8 h-8 text-neutral-silver-3 group-hover:text-primary-1'></PlayBtn>
              <span className='ml-1 text-[18px]'>Video</span>
            </div>
            <div
              className='flex items-center cursor-pointer text-neutral-black group hover:text-primary-1'
              onClick={() => handleSelectSubmitData(COURSE_TYPE.QUIZ)}
            >
              <Quiz className='w-8 h-8 text-neutral-silver-3 group-hover:text-primary-1'></Quiz>
              <span className='ml-1 text-[18px]'>Quiz</span>
            </div>
            <div
              className='flex items-center cursor-pointer text-neutral-black group hover:text-primary-1'
              onClick={() => handleSelectSubmitData(COURSE_TYPE.ARTICLE)}
            >
              <Document2 className='w-8 h-8 text-neutral-silver-3 group-hover:text-primary-1'></Document2>
              <span className='ml-1 text-[18px]'>Article</span>
            </div>
          </div>
          <Close className='cursor-pointer' onClick={handleCancelCreateLesson}></Close>
        </div>
      )}
    </div>
  )
}
