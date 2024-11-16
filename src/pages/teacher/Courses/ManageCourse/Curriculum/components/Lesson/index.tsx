/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import Navigate from '@/icons/Navigate'
import Drag from '@/icons/Drag'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// Shadcnui import
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import ThreeDots from '@/icons/ThreeDots'
import PlayBtn from '@/icons/CourseDetail/PlayBtn'
import Document from '@/icons/CourseDetail/Document2'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import VideoUpload from '../VideoUpload'
import axios, { CancelTokenSource } from 'axios'
import UploadStatus from '../VideoUpload/UploadStatus'
import Tiptap from '@/components/TipTap'

import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FileDropUpload from '@/components/FileUploads'
import { SectionItem } from '@/@types/instructor/course/curriculumn'
import { COURSE_TYPE } from '@/constants/course'
import VideoContent from './VideoContent'
import ArticleContent from './ArticleContent'

type TLesson = {
  items: SectionItem
  courseId: string
}

export default function Lesson({ courseId, items }: TLesson) {
  const [isAddNewContent, setIsAddNewContent] = useState(false)
  const [isAddFromLibrary, setIsAddFromLibrary] = useState(false)
  const { id, createdDateTime, itemType, position, primaryAsset, sectionId, supplementaryAssets, title } = items

  const [uploadSource, setUploadSource] = useState<File | null>(null)

  const [uploadResource, setUploadResource] = useState<boolean>(false)
  const [isAddDescription, setIsAddDescription] = useState(false)

  // Yup validate
  const schema = yup.object().shape({
    description: yup.string().required('Required_field')
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    getValues
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  // Handle Upload

  const handleSubmitDataDescription = () => {}

  const handleCancelDescription = () => {
    reset({
      description: ''
    })
    setIsAddDescription(false)
  }

  const handleCancelResource = () => {
    setUploadSource(null)
    setUploadResource(false)
  }

  return (
    <div className='pb-6 border-b border-neutral-black'>
      <div className='flex items-center justify-between mt-6'>
        <div className='flex items-center'>
          <Drag className='w-9 h-9 text-neutral-silver-3'></Drag>
          {primaryAsset.type == COURSE_TYPE.VIDEO ? (
            <PlayBtn className='ml-6 mr-3 w-9 h-9 text-neutral-silver-3'></PlayBtn>
          ) : primaryAsset.type == COURSE_TYPE.ARTICLE ? (
            <Document className='ml-6 mr-3 w-9 h-9 text-neutral-silver-3'></Document>
          ) : (
            <div>Quiz</div>
          )}
          <div className='text-[18px] text-neutral-black'>
            <span>Lesson {position ? position + 1 : 0}.</span> {title}
          </div>
        </div>
        <div className='flex items-center gap-x-6'>
          {primaryAsset.type == COURSE_TYPE.VIDEO && (
            <Button
              className={`${isAddNewContent ? 'flex' : 'hidden'} items-center border-neutral-black px-[18px] rounded-lg bg-transparent`}
              variant={'outline'}
              onClick={() => setIsAddFromLibrary(!isAddFromLibrary)}
            >
              {isAddFromLibrary ? 'Upload Video' : 'Add from library'}
            </Button>
          )}

          {primaryAsset.type == COURSE_TYPE.VIDEO && !primaryAsset.fileUrl && (
            <Button
              className={`${!isAddNewContent ? 'flex' : 'hidden'} items-center border-neutral-black px-[18px] rounded-lg bg-transparent`}
              variant={'outline'}
              onClick={() => setIsAddNewContent(true)}
            >
              <Plus className='w-6 h-6'></Plus>
              <div className='ml-[10px]'>Content</div>
            </Button>
          )}

          {primaryAsset.type == COURSE_TYPE.ARTICLE && !primaryAsset.body && (
            <Button
              className={`${!isAddNewContent ? 'flex' : 'hidden'} items-center border-neutral-black px-[18px] rounded-lg bg-transparent`}
              variant={'outline'}
              onClick={() => setIsAddNewContent(true)}
            >
              <Plus className='w-6 h-6'></Plus>
              <div className='ml-[10px]'>Content</div>
            </Button>
          )}

          <Navigate
            className={`cursor-pointer ${!isAddNewContent ? '-rotate-90' : 'rotate-90'}`}
            onClick={() => setIsAddNewContent(!isAddNewContent)}
          ></Navigate>
          <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center rounded-full data-[state=open]:bg-primary-1 data-[state=open]:text-white '>
              <ThreeDots></ThreeDots>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='' align='end'>
              <DropdownMenuItem className='w-full px-2 py-3 cursor-pointer'>Duplicate lesson</DropdownMenuItem>
              <DropdownMenuItem className='w-full px-2 py-3 cursor-pointer'>Edit lesson Name</DropdownMenuItem>
              <DropdownMenuItem className='w-full px-2 py-3 cursor-pointer'>Delete lesson</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Video section */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isAddNewContent ? 'h-auto py-6' : 'h-0 p-0'}`}
      >
        {primaryAsset.type == COURSE_TYPE.VIDEO ? (
          <VideoContent
            setIsAddNewContent={setIsAddNewContent}
            courseId={courseId}
            sectionId={sectionId}
            sectionItemId={id}
            isAddFromLibrary={isAddFromLibrary}
            isAddNewContent={isAddNewContent}
            primaryAsset={primaryAsset}
          ></VideoContent>
        ) : primaryAsset.type == COURSE_TYPE.ARTICLE ? (
          <ArticleContent
            setIsAddNewContent={setIsAddNewContent}
            courseId={courseId}
            sectionId={sectionId}
            sectionItemId={id}
            isAddNewContent={isAddNewContent}
            primaryAsset={primaryAsset}
          ></ArticleContent>
        ) : (
          <div>Quiz</div>
        )}

        <div className=''>
          <div>
            <Button
              className={`${!isAddDescription ? 'flex' : 'hidden'} items-center justify-center mt-3 border rounded-lg text-neutral-black border-neutral-black hover:bg-inherit hover:text-inherit `}
              variant={'ghost'}
              onClick={() => setIsAddDescription(true)}
            >
              <Plus className='mr-[10px]'></Plus>
              <span>Description</span>
            </Button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${isAddDescription ? 'h-auto py-6' : 'h-0 p-0 '}`}
            >
              <h2 className='text-lg font-semibold'>Description</h2>
              <Controller
                control={control}
                name='description'
                render={({ field }) => (
                  <Tiptap
                    className='my-3 min-h-[206px] w-full text-xl rounded-lg  py-[18px] px-3 outline-none placeholder:text-neutral-silver-3 bg-white cursor-text'
                    placeholder='Add a description that outlines what students will be able to do after finishing the '
                    description={''}
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className='flex items-center justify-end gap-x-3'>
                <Button onClick={handleCancelDescription} variant={'ghost'}>
                  Cancel
                </Button>
                <Button className='w-fit' disabled={!isValid} variant={'custom'}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
          <Button
            className={`${uploadResource ? 'hidden' : 'flex'} items-center justify-center mt-3 border rounded-lg text-neutral-black border-neutral-black hover:bg-inherit hover:text-inherit`}
            variant={'ghost'}
            onClick={() => setUploadResource(true)}
          >
            <Plus className='mr-[10px]'></Plus>
            <span>Resources</span>
          </Button>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${uploadResource ? 'h-auto py-6' : 'h-0 p-0 '}`}
          >
            <h2 className='text-lg font-semibold'>Resources</h2>
            <FileDropUpload onSetFile={setUploadSource} className='my-3'></FileDropUpload>
            <div className='flex items-center justify-end gap-x-3'>
              <Button onClick={handleCancelResource} variant={'ghost'}>
                Cancel
              </Button>
              <Button className='w-fit' disabled={!isValid} variant={'custom'}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* After uploading */}

      {/* End */}
    </div>
  )
}
