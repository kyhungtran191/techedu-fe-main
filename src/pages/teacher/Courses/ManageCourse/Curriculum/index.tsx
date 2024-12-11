/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Play from '@/icons/Play'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import AddSection from './components/AddSection'
import Section from './components/Section'
import { DropResult } from 'react-beautiful-dnd'
import SystemNotification from '../components/SystemNotification'
import { TSectionCurriculum } from '@/@types/instructor/course/curriculumn'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { GetSections } from '@/services/instructor/manage/curriculumn.service'
import SectionLoading from '@/components/Loading/SectionLoading'
import { handleFormatReorderCurriculum } from '@/utils/course'
import { useHandleOrderSectionItemMutation } from '@/mutations/useHandleOrderSectionItemMutation'
import { useAppContext } from '@/hooks/useAppContext'

// Mock section Data

export default function Curriculum() {
  const [sections, setSections] = useState<TSectionCurriculum[]>([])
  
  const {profile} = useAppContext()
  // Get course id
  const { id } = useParams()
  if (!id) {
    toast.error('course ID not exist')
    return
  }

  const orderCurriculumItemMutation = useHandleOrderSectionItemMutation()

  const handleDragAndDrop = async (results: DropResult) => {
    const { source, destination, type } = results

    if (!destination) return

    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    if (type === 'group') {
      const reorderedSections = [...sections]
      const sourceIndex = source.index
      const destIndex = destination.index

      const [removedSection] = reorderedSections.splice(sourceIndex, 1)
      reorderedSections.splice(destIndex, 0, removedSection)

      console.log('reorderedSections:', reorderedSections)

      const newOrderItemsList = handleFormatReorderCurriculum(reorderedSections)

      orderCurriculumItemMutation.mutate({ courseId: id, sectionItems: newOrderItemsList })
      setSections(reorderedSections)

      return
    }

    // Handle drag-and-drop for sectionItems (lessons)
    const itemSourceIndex = source.index
    const itemDestinationIndex = destination.index

    const sourceSectionIndex = sections.findIndex((section) => `sectionList-${section.id}` === source.droppableId)
    const destinationSectionIndex = sections.findIndex(
      (section) => `sectionList-${section.id}` === destination.droppableId
    )

    if (sourceSectionIndex === -1 || destinationSectionIndex === -1) return

    const sourceItems = [...sections[sourceSectionIndex].sectionItems]
    const destinationItems =
      source.droppableId !== destination.droppableId ? [...sections[destinationSectionIndex].sectionItems] : sourceItems

    const [movedItem] = sourceItems.splice(itemSourceIndex, 1)
    movedItem.sectionId = sections[destinationSectionIndex].id
    destinationItems.splice(itemDestinationIndex, 0, movedItem)

    const updatedSections = [...sections]
    updatedSections[sourceSectionIndex] = {
      ...sections[sourceSectionIndex],
      sectionItems: sourceItems
    }

    updatedSections[destinationSectionIndex] = {
      ...sections[destinationSectionIndex],
      sectionItems: destinationItems
    }

    const newOrderItemsList = handleFormatReorderCurriculum(updatedSections)

    try {
      orderCurriculumItemMutation.mutate({ courseId: id, sectionItems: newOrderItemsList })
      setSections([...updatedSections])
    } catch (error) {
      console.error('Error updating section items:', error)
    }
  }

  const navigate = useNavigate()

  const querySectionData = useQuery({
    queryKey: ['course-sections', id],
    queryFn: (_) => GetSections(id),
    enabled: Boolean(id) == true,
    select: (data) => data.data.value,
    onSuccess(data) {
      if (data) {
        setSections(data)
      }
    }
  })

  const handleUpdateSections = (updatedSections: TSectionCurriculum[]) => {
    setSections(updatedSections)
  }

  return (
    <div className='flex flex-col h-full'>
      <SystemNotification></SystemNotification>
      {(querySectionData.isFetching || querySectionData.isLoading) && (
        <SectionLoading className='z-30'></SectionLoading>
      )}
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <Droppable droppableId='ROOT' type='group'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='flex-grow p-6 mt-4 overflow-y-auto bg-white rounded-xl no-scrollbar'
            >
              <div className='flex items-center justify-between'>
                <p>0 min of video content uploaded</p>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    onClick={() => navigate(`/preview-draft-course`, {
                      state:{
                        courseId:id,
                        instructorId: profile?.userId
                      }
                    })}
                    className='flex items-center text-white bg-primary-1 py-3 px-[18px] rounded-lg'
                  >
                    <Play></Play>
                    <div className='ml-[10px]'>Preview</div>
                  </DropdownMenuTrigger>
                  {/* <DropdownMenuContent className=''>
                    <DropdownMenuItem className='w-full px-2 py-3 cursor-pointer'>View as Student</DropdownMenuItem>
                    <DropdownMenuItem className='w-full px-2 py-3 cursor-pointer'>View as Instructor</DropdownMenuItem>
                  </DropdownMenuContent> */}
                </DropdownMenu>
              </div>
              {/* Section List */}
              {sections &&
                sections.map((item, index) => (
                  <Draggable key={`item-${item.id}`} draggableId={`item-${item.id}`} index={index}>
                    {(provided) => (
                      <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                        <Section
                          courseId={id}
                          sections={sections}
                          updateSections={handleUpdateSections}
                          items={item}
                        ></Section>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
              {/* New Section Button */}
              <AddSection updateSections={handleUpdateSections} sections={sections} courseId={id}></AddSection>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
