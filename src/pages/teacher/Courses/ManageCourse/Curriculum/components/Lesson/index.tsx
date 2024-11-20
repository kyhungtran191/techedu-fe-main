/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import Navigate from '@/icons/Navigate'
import Drag from '@/icons/Drag'

// Shadcnui import
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import ThreeDots from '@/icons/ThreeDots'
import PlayBtn from '@/icons/CourseDetail/PlayBtn'
import Document from '@/icons/CourseDetail/Document2'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'

import {
  PrimaryAsset,
  SectionItem,
  SupplementaryAssetItem,
  TSectionCurriculum
} from '@/@types/instructor/course/curriculumn'
import { COURSE_TYPE } from '@/constants/course'
import VideoContent from './VideoContent'
import ArticleContent from './ArticleContent'
import ResourcesUpload from './ResourcesUpload'
import Close from '@/icons/Close'
import DescriptionContent from './DescriptionContent'
import { useMutation } from '@tanstack/react-query'
import { DeleteAsset, DeleteSectionItem } from '@/services/instructor/manage/curriculumn.service'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { useHandleOrderSectionItemMutation } from '@/mutations/useHandleOrderSectionItemMutation'
import { handleFormatReorderCurriculum } from '@/utils/course'
import { toast } from 'react-toastify'
import SectionLoading from '@/components/Loading/SectionLoading'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

type TLesson = {
  items: SectionItem
  courseId: string
  updateSection: (updatedSections: TSectionCurriculum[]) => void
  sections: TSectionCurriculum[]
}

export default function Lesson({ courseId, items, sections, updateSection }: TLesson) {
  const [isAddNewContent, setIsAddNewContent] = useState(false)
  const [isAddFromLibrary, setIsAddFromLibrary] = useState(false)

  const [sectionItem, setSectionItem] = useState<SectionItem>(items)
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  // Update Order Item
  const orderCurriculumItemMutation = useHandleOrderSectionItemMutation()
  // Handle Upload

  const handleUpdatePrimaryAsset = (updatedAsset: PrimaryAsset) =>
    setSectionItem({ ...sectionItem, primaryAsset: updatedAsset })

  const handleUpdateSupplementAssets = (updatedAsset: SupplementaryAssetItem[]) =>
    setSectionItem({ ...sectionItem, supplementaryAssets: updatedAsset })

  const deleteSectionItemMutation = useMutation({
    mutationFn: (_) => DeleteSectionItem(courseId, sectionItem.sectionId, sectionItem.id)
  })

  const handleAlertWarningDeleteSectionItem = (e: any) => {
    e.preventDefault()
    deleteSectionItemMutation.mutate(undefined, {
      onSuccess(data) {
        const filterSection = sections.find((section) => section.id === sectionItem.sectionId)

        if (filterSection) {
          filterSection.sectionItems = filterSection.sectionItems.filter((lesson) => lesson.id != sectionItem.id)
          console.log(filterSection.sectionItems)
        }

        const newSections = sections.map((section) => {
          if (section.id === sectionItem.sectionId) {
            return { ...section, sectionItems: section.sectionItems.filter((lesson) => lesson.id != sectionItem.id) }
          }
          return section
        })
        const newOrderItemsList = handleFormatReorderCurriculum(newSections)
        orderCurriculumItemMutation.mutate({ courseId: courseId, sectionItems: newOrderItemsList })
        updateSection(newSections)
        toast.success(`Delete section item- ${sectionItem.title} success!`)
        setOpenDialog(false)
      },
      onError(err) {
        console.log(err)
      }
    })
  }

  const deleteAssetMutation = useMutation({
    mutationFn: (id: number) => DeleteAsset(courseId, items?.sectionId, items?.id, id)
  })

  // const handleOnDelete
  const handleOnDeleteAsset = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DeleteAsset(courseId, items?.sectionId, items?.id, id)
          .then(() => {
            setSectionItem((prev) => {
              const newSectionsItem = { ...prev }
              newSectionsItem.supplementaryAssets = newSectionsItem.supplementaryAssets.filter((item) => item.id != id)
              return newSectionsItem
            })
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success'
            })
          })
          .catch((err) => {
            toast.error('Something wrong when delete ' + err)
          })
      }
    })
  }
  return (
    <>
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          {(deleteSectionItemMutation.isLoading || orderCurriculumItemMutation.isLoading) && (
            <SectionLoading></SectionLoading>
          )}
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this section item and remove from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {}}>Cancel</AlertDialogCancel>
            <AlertDialogAction className='text-white bg-primary-1' onClick={handleAlertWarningDeleteSectionItem}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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

            {sectionItem?.primaryAsset?.type == COURSE_TYPE.VIDEO && !sectionItem?.primaryAsset.fileUrl && (
              <Button
                className={`${!isAddNewContent ? 'flex' : 'hidden'} items-center border-neutral-black px-[18px] rounded-lg bg-transparent`}
                variant={'outline'}
                onClick={() => setIsAddNewContent(true)}
              >
                <Plus className='w-6 h-6'></Plus>
                <div className='ml-[10px]'>Content</div>
              </Button>
            )}

            {sectionItem?.primaryAsset?.type == COURSE_TYPE.ARTICLE && !sectionItem?.primaryAsset.body && (
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
                <DropdownMenuItem className='w-full px-2 py-3 cursor-pointer' onClick={() => setOpenDialog(true)}>
                  Delete lesson
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Video section */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${isAddNewContent ? 'h-auto py-6' : 'h-0 p-0'}`}
        >
          {sectionItem?.primaryAsset?.type == COURSE_TYPE.VIDEO ? (
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
          ) : (
            <ArticleContent
              onUpdatePrimaryAsset={handleUpdatePrimaryAsset}
              setIsAddNewContent={setIsAddNewContent}
              courseId={courseId}
              sectionId={sectionItem?.sectionId}
              sectionItemId={sectionItem.id}
              isAddNewContent={isAddNewContent}
              primaryAsset={sectionItem?.primaryAsset}
            ></ArticleContent>
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
              handleUpdateSupplementAssets={handleUpdateSupplementAssets}
            ></ResourcesUpload>
          </div>

          <div className='flex flex-col gap-3 my-6 cursor-auto justify-item'>
            <h2 className='font-semibold'>Material Resources</h2>
            {sectionItem.supplementaryAssets.map((item) => (
              <div className='flex items-end text-base font-medium '>
                <div>{item?.title}</div>
                <Close className='w-5 h-5 ml-3 cursor-pointer' onClick={() => handleOnDeleteAsset(item.id)}></Close>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
