import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Drag from '@/icons/Drag'
import ThreeDots from '@/icons/ThreeDots'
import { Separator } from '@/components/ui/separator'

import AddLesson from './AddLesson'
import Lesson from './Lesson'
// Type
// Drag n Drop Import
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { TSectionCurriculum } from '@/@types/instructor/course/curriculumn'

type TSectionItemProps = {
  updateSections: (updatedSections: TSectionCurriculum[]) => void
  sections: TSectionCurriculum[]
  items: TSectionCurriculum
  courseId: string
}



export default function Section({ courseId, items, sections, updateSections }: TSectionItemProps) {
  const { id, sectionItems, title, isPublished, position } = items
  return (
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
                  <DropdownMenuItem className='w-full px-2 py-3 cursor-pointer'>Delete Section</DropdownMenuItem>
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
                        <Lesson courseId={courseId} items={item} key={item.id}></Lesson>
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
  )
}
