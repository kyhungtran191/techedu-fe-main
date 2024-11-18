import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Drag from '@/icons/Drag'
import ThreeDots from '@/icons/ThreeDots'
import { Separator } from '@/components/ui/separator'
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
import AddLesson from './AddLesson'
import Lesson from './Lesson'
// Type
// Drag n Drop Import
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { TSectionCurriculum } from '@/@types/instructor/course/curriculumn'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { DeleteSection } from '@/services/instructor/manage/curriculumn.service'
import { handleFormatReorderCurriculum } from '@/utils/course'
import { useHandleOrderSectionItemMutation } from '@/mutations/useHandleOrderSectionItemMutation'
import { toast } from 'react-toastify'
import SectionLoading from '@/components/Loading/SectionLoading'

type TSectionItemProps = {
  updateSections: (updatedSections: TSectionCurriculum[]) => void
  sections: TSectionCurriculum[]
  items: TSectionCurriculum
  courseId: string
}

export default function Section({ courseId, items, sections, updateSections }: TSectionItemProps) {
  const { id, sectionItems, title, isPublished, position } = items
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  // deleteSectionMutation
  const deleteSectionMutation = useMutation({
    mutationFn: () => DeleteSection(courseId, id),
    onSuccess(data) {
      console.log('dataDeleteSection', data)
      const newSections = sections.filter((section) => section.id !== id)
      const newOrderItemsList = handleFormatReorderCurriculum(newSections)
      orderCurriculumItemMutation.mutate({ courseId: courseId, sectionItems: newOrderItemsList })
      updateSections(newSections)
      toast.success(`Delete section item- ${title} success!`)
      setOpenDialog(false)
    },
    onError(err) {
      console.log('dataDeleteSection', err)
    }
  })

  const orderCurriculumItemMutation = useHandleOrderSectionItemMutation()

  const handleAlertWarningDeleteSectionItem = (e: any) => {
    e.preventDefault()
    if (sectionItems.length > 0) {
      toast.error('You should delete all items to delete this section')
      setOpenDialog(false)
      return
    }
    deleteSectionMutation.mutate(undefined)
  }

  return (
    <>
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          {(deleteSectionMutation.isLoading || orderCurriculumItemMutation.isLoading) && (
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
      <Droppable droppableId={`sectionList-${id}`}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='flex w-full mt-6 border rounded-lg border-neutral-black'
          >
            <div className='flex items-start justify-center h-auto p-6 rounded-l-lg bg-neutral-silver-2'>
              <Drag className='text-neutral-silver-3'></Drag>
            </div>
            <div className='flex-1 rounded-r-lg bg-neutral-silver'>
              <div className='flex items-center justify-between p-6'>
                <h3 className='text-xl text-primary-1'>{title}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger className='flex items-center rounded-full data-[state=open]:bg-primary-1 data-[state=open]:text-white '>
                    <ThreeDots></ThreeDots>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='' align='end'>
                    <DropdownMenuItem className='w-full px-2 py-3 cursor-pointer'>Duplicate Section</DropdownMenuItem>
                    <DropdownMenuItem className='w-full px-2 py-3 cursor-pointer'>Edit Section Name</DropdownMenuItem>
                    <DropdownMenuItem
                      className='w-full px-2 py-3 cursor-pointer'
                      onClick={() => {
                        setOpenDialog(true)
                      }}
                    >
                      Delete Section
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Separator className='bg-neutral-black'></Separator>
              {/* Section List */}
              <div className='px-6 py-4'>
                {sectionItems?.length > 0 &&
                  sectionItems.map((item, index) => (
                    <Draggable draggableId={`lesson-${item.id}`} index={index} key={item.id}>
                      {(provided) => (
                        <div
                          className=''
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <Lesson
                            sections={sections}
                            updateSection={updateSections}
                            courseId={courseId}
                            items={item}
                            key={item.id}
                          ></Lesson>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
                <AddLesson
                  courseId={courseId}
                  sectionId={id}
                  sections={sections}
                  updateSections={updateSections}
                ></AddLesson>
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </>
  )
}
