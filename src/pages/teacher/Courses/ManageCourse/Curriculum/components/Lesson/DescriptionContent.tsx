import { SectionItem } from '@/@types/instructor/course/curriculumn'
import SectionLoading from '@/components/Loading/SectionLoading'
import Tiptap from '@/components/TipTap'
import { Button } from '@/components/ui/button'
import { UpdateDescriptionSectionItem } from '@/services/instructor/manage/curriculumn.service'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import * as yup from 'yup'

interface IDescriptionContent {
  courseId: string
  sectionId: number
  sectionItemId: number
  updateItems: React.Dispatch<React.SetStateAction<SectionItem>>
  content?: string
}

export default function DescriptionContent({
  courseId,
  sectionId,
  sectionItemId,
  content,
  updateItems
}: IDescriptionContent) {
  const [isAddDescription, setIsAddDescription] = useState(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  // Yup validate
  const schema = yup.object().shape({
    description: yup.string().required('Required_field')
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      description: content || ''
    }
  })

  const handleCancelDescription = () => {
    reset({
      description: ''
    })
    setIsAddDescription(false)
  }

  console.log('content', content)

  const updateLessonDescriptionMutation = useMutation({
    mutationFn: (description: string) => UpdateDescriptionSectionItem(courseId, sectionId, sectionItemId, description)
  })

  const onSubmitUpdateDescription = ({ description }: { description: string }) => {
    updateLessonDescriptionMutation.mutate(description, {
      onSuccess(data) {
        const description = data.data.value?.description
        console.log(description)
        updateItems((prev) => {
          prev = { ...prev, description: description as string }
          return prev
        })
        setIsEdit(false)
        handleCancelDescription()
      }
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmitUpdateDescription)} className='my-5'>
      {!content && (
        <Button
          className={`${!isAddDescription ? 'flex' : 'hidden'} items-center justify-center mt-3 border rounded-lg text-neutral-black border-neutral-black hover:bg-inherit hover:text-inherit `}
          variant={'ghost'}
          onClick={() => setIsAddDescription(true)}
        >
          <Plus className='mr-[10px]'></Plus>
          <span>Description</span>
        </Button>
      )}
      {content && !isEdit && (
        <div>
          <div
            className='flex items-center justify-end font-medium cursor-pointer text-primary-1'
            onClick={() => {
              setIsEdit((prev) => !prev)
            }}
          >
            {isEdit ? 'Cancel' : 'Edit'}
          </div>
          <h2 className='text-lg font-semibold'>Description</h2>
          <p dangerouslySetInnerHTML={{ __html: content }}></p>
        </div>
      )}
      {(isEdit || isAddDescription) && (
        <div
          className={`relative transition-all duration-300 ease-in-out overflow-hidden ${isEdit || isAddDescription ? 'h-auto py-6' : 'h-0 p-0 '}`}
        >
          {updateLessonDescriptionMutation.isLoading && <SectionLoading className='z-30'></SectionLoading>}
          <h2 className='text-lg font-semibold'>Description</h2>
          <Controller
            control={control}
            name='description'
            render={({ field }) => (
              <Tiptap
                className='my-3 min-h-[206px] w-full text-xl rounded-lg  py-[18px] px-3 outline-none placeholder:text-neutral-silver-3 bg-white cursor-text'
                placeholder='Add a description that outlines what students will be able to do after finishing the '
                description={content || ''}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
          <div className='flex items-center justify-end gap-x-3'>
            {!isEdit && (
              <Button onClick={handleCancelDescription} variant={'ghost'}>
                Cancel
              </Button>
            )}
            <Button className='w-fit' type='submit' disabled={!isValid} variant={'custom'}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}
