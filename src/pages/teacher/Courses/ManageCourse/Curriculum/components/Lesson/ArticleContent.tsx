import { PrimaryAsset, TArticleResponse } from '@/@types/instructor/course/curriculumn'
import SectionLoading from '@/components/Loading/SectionLoading'
import Tiptap from '@/components/TipTap'
import { Button } from '@/components/ui/button'
import { UpdateContentArticle } from '@/services/instructor/manage/curriculumn.service'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  body: yup.string().required('Required_field')
})

interface IArticleContentSectionItem {
  isAddNewContent: boolean
  primaryAsset: PrimaryAsset
  courseId: string
  sectionId: number
  sectionItemId: number
  setIsAddNewContent: React.Dispatch<React.SetStateAction<boolean>>
  onUpdatePrimaryAsset: (updatedAsset: PrimaryAsset) => void
}

export default function ArticleContent({
  isAddNewContent,
  primaryAsset,
  courseId,
  sectionId,
  sectionItemId,
  onUpdatePrimaryAsset
}: IArticleContentSectionItem) {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    getValues,
    trigger
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const [isEdit, setIsEdit] = useState<boolean>(false)

  const updateContentArticleMutation = useMutation({
    mutationFn: (body: string) =>
      UpdateContentArticle({
        courseId,
        sectionId,
        sectionItemId,
        body
      })
  })

  const onUpdateContentArticle = ({ body }: { body: string }) => {
    updateContentArticleMutation.mutate(body, {
      onSuccess(data) {
        if (data) {
          const { articleAsset } = data.data.value as TArticleResponse
          if (articleAsset) {
            onUpdatePrimaryAsset(articleAsset)
            setIsEdit(false)
          }
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onUpdateContentArticle)} className='relative'>
      {updateContentArticleMutation.isLoading && <SectionLoading className='z-30'></SectionLoading>}
      {primaryAsset?.body && !isEdit && (
        <div className='p-5'>
          <div
            className='flex items-center justify-end font-medium cursor-pointer text-primary-1'
            onClick={() => {
              setIsEdit((prev) => !prev)
            }}
          >
            {isEdit ? 'Cancel' : 'Edit'}
          </div>
          <p dangerouslySetInnerHTML={{ __html: primaryAsset?.body }}></p>
        </div>
      )}

      {(!primaryAsset?.body || isEdit) && (
        <div>
          <Controller
            control={control}
            name='body'
            render={({ field }) => (
              <Tiptap
                className='my-3 min-h-[206px] w-full text-xl rounded-lg  py-[18px] px-3 outline-none placeholder:text-neutral-silver-3 bg-white cursor-text'
                placeholder='Add a description that outlines what students will be able to do after finishing the '
                description={primaryAsset?.body || ''}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
          <div className='flex items-center justify-end gap-x-3'>
            <Button
              onClick={() => {
                setIsEdit(false)
              }}
              variant={'ghost'}
            >
              Cancel
            </Button>
            <Button type={'submit'} className='w-fit' disabled={!isValid} variant={'custom'}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}
