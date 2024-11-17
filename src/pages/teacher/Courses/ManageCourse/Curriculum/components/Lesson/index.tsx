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
import { PrimaryAsset, SectionItem } from '@/@types/instructor/course/curriculumn'
import { COURSE_TYPE } from '@/constants/course'
import VideoContent from './VideoContent'
import ArticleContent from './ArticleContent'
import ResourcesUpload from './ResourcesUpload'
import Close from '@/icons/Close'
import DescriptionContent from './DescriptionContent'

type TLesson = {
  items: SectionItem
  courseId: string
}

export default function Lesson({ courseId, items }: TLesson) {
  const [isAddNewContent, setIsAddNewContent] = useState(false)
  const [isAddFromLibrary, setIsAddFromLibrary] = useState(false)

  const [sectionItem, setSectionItem] = useState<SectionItem>(items)

  // Handle Upload

  const handleUpdatePrimaryAsset = (updatedAsset: PrimaryAsset) =>
    setSectionItem({ ...sectionItem, primaryAsset: updatedAsset })

  return (
    <div className='pb-6 border-b border-neutral-black'>
      <div className='flex items-center justify-between mt-6'>
        <div className='flex items-center'>
          <Drag className='w-9 h-9 text-neutral-silver-3'></Drag>
          {sectionItem?.primaryAsset?.type == COURSE_TYPE.VIDEO ? (
            <PlayBtn className='ml-6 mr-3 w-9 h-9 text-neutral-silver-3'></PlayBtn>
          ) : sectionItem?.primaryAsset?.type == COURSE_TYPE.ARTICLE ? (
            <Document className='ml-6 mr-3 w-9 h-9 text-neutral-silver-3'></Document>
          ) : (
            <div>Quiz</div>
          )}
          <div className='text-[18px] text-neutral-black'>
            <span>Lesson {sectionItem?.position ? sectionItem?.position + 1 : 0}.</span> {sectionItem?.title}
          </div>
        </div>
        <div className='flex items-center gap-x-6'>
          {/* {primaryAsset.type == COURSE_TYPE.VIDEO && (
            <Button
              className={`${isAddNewContent ? 'flex' : 'hidden'} items-center border-neutral-black px-[18px] rounded-lg bg-transparent`}
              variant={'outline'}
              onClick={() => setIsAddFromLibrary(!isAddFromLibrary)}
            >
              Upload Video
            </Button>
          )} */}

          {sectionItem?.primaryAsset.type == COURSE_TYPE.VIDEO && !sectionItem?.primaryAsset.fileUrl && (
            <Button
              className={`${!isAddNewContent ? 'flex' : 'hidden'} items-center border-neutral-black px-[18px] rounded-lg bg-transparent`}
              variant={'outline'}
              onClick={() => setIsAddNewContent(true)}
            >
              <Plus className='w-6 h-6'></Plus>
              <div className='ml-[10px]'>Content</div>
            </Button>
          )}

          {sectionItem?.primaryAsset.type == COURSE_TYPE.ARTICLE && !sectionItem?.primaryAsset.body && (
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
            <DropdownMenuTrigger className='flex items-center rounded-full data-[state=open]:bg-primary-1 data-[state=open]:text-white'>
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
        {sectionItem?.primaryAsset.type == COURSE_TYPE.VIDEO ? (
          <VideoContent
            onUpdatePrimaryAsset={handleUpdatePrimaryAsset}
            setIsAddNewContent={setIsAddNewContent}
            courseId={courseId}
            sectionId={sectionItem?.sectionId}
            sectionItemId={sectionItem.id}
            isAddFromLibrary={isAddFromLibrary}
            isAddNewContent={isAddNewContent}
            primaryAsset={sectionItem.primaryAsset}
          ></VideoContent>
        ) : sectionItem?.primaryAsset.type == COURSE_TYPE.ARTICLE ? (
          <ArticleContent
            onUpdatePrimaryAsset={handleUpdatePrimaryAsset}
            setIsAddNewContent={setIsAddNewContent}
            courseId={courseId}
            sectionId={sectionItem?.sectionId}
            sectionItemId={sectionItem.id}
            isAddNewContent={isAddNewContent}
            primaryAsset={sectionItem?.primaryAsset}
          ></ArticleContent>
        ) : (
          <div>Quiz</div>
        )}

        <div className=''>
          <DescriptionContent
            courseId={courseId}
            sectionId={sectionItem?.sectionId}
            sectionItemId={sectionItem.id}
            updateItems={setSectionItem}
            content={sectionItem?.description}
          ></DescriptionContent>
          <ResourcesUpload
            courseId={courseId}
            sectionId={sectionItem.sectionId}
            sectionItemId={sectionItem.id}
          ></ResourcesUpload>
        </div>

        <div className='flex flex-col gap-3 my-6 justify-item'>
          <h2 className='font-semibold'>Material Resources</h2>
          <div className='flex items-end text-base font-medium '>
            Resources1.pptx
            <Close className='w-5 h-5 ml-3 cursor-pointer'></Close>
          </div>
        </div>
      </div>
    </div>
  )
}
