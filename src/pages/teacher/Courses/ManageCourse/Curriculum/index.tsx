import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Play from '@/icons/Play'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import AddSection from './components/AddSection'
import Section from './components/Section'
import { TSection } from '@/@types/course.type'
import { DropResult } from 'react-beautiful-dnd'
import SystemNotification from '../components/SystemNotification'

// Mock section Data
const mockSection: TSection[] = [
  {
    id: '0e2f0db1-5457-46b0-949e-8032d2f9997a',
    name: 'Section 1',
    lessons: [
      { id: '26fd50b3-3841-496e-8b32-73636f6f4197', name: 'Lesson 1', type: 'video' },
      { id: 'b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525', name: 'Lesson 2', type: 'video' }
    ]
  },
  {
    id: '487f68b4-1746-438c-920e-d67b7df46247',
    name: 'Section 2',
    lessons: [
      { id: '95ee6a5d-f927-4579-8c15-2b4eb86210ae', name: 'Lesson 1', type: 'video' },
      { id: '5bee94eb-6bde-4411-b438-1c37fa6af364', name: 'Lesson 2', type: 'video' }
    ]
  }
]
export default function Curriculum() {
  const [sections, setSections] = useState<TSection[]>(mockSection)
  // Get course id
  const params = useParams()
  
  const handleDragAndDrop = (results: DropResult) => {
    const { source, destination, type } = results

    if (!destination) return

    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    if (type === 'group') {
      const reorderedStores = [...sections]

      const storeSourceIndex = source.index
      const storeDestinatonIndex = destination.index

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1)
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore)

      return setSections(reorderedStores)
    }
    // In
    const itemSourceIndex = source.index
    const itemDestinationIndex = destination.index

    const storeSourceIndex = sections.findIndex((store) => store.id === source.droppableId)

    const storeDestinationIndex = sections.findIndex((store) => store.id === destination.droppableId)

    const newSourceItems = [...sections[storeSourceIndex].lessons]
    const newDestinationItems =
      source.droppableId !== destination.droppableId ? [...sections[storeDestinationIndex].lessons] : newSourceItems

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1)
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem)

    const newStores = [...sections]

    newStores[storeSourceIndex] = {
      ...sections[storeSourceIndex],
      lessons: newSourceItems
    }

    newStores[storeDestinationIndex] = {
      ...sections[storeDestinationIndex],
      lessons: newDestinationItems
    }
    setSections(newStores)
  }

  /**
   * AddSection Component ✅
   * Section Component ✅
   * Lesson Content Component
   *
   */

  /**
   *
   * Fetch Data here
   *
   *
   */

  return (
    <div className='flex flex-col h-full'>
      <SystemNotification></SystemNotification>
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
                  <DropdownMenuTrigger className='flex items-center text-white bg-primary-1 py-3 px-[18px] rounded-lg'>
                    <Play></Play>
                    <div className='ml-[10px]'>Preview</div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=''>
                    <DropdownMenuItem className='w-full px-2 py-3 cursor-pointer'>View as Student</DropdownMenuItem>
                    <DropdownMenuItem className='w-full px-2 py-3 cursor-pointer'>View as Instructor</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {/* Section List */}
              {sections &&
                sections.map((item, index) => (
                  <Draggable draggableId={item.id as string} index={index} key={item.id}>
                    {(provided) => (
                      <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                        <Section {...item}></Section>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
              {/* New Section Button */}
              <AddSection></AddSection>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
