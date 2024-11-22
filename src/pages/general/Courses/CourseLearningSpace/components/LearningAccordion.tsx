import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Folder from '@/icons/CourseDetail/Folder'
import { Checkbox } from '@/components/ui/checkbox'
import PlayBtn from '@/icons/CourseDetail/PlayBtn'
import Document2 from '@/icons/CourseDetail/Document2'
import { Separator } from '@/components/ui/separator'
import { SectionItem, TSectionCurriculum } from '@/@types/instructor/course/curriculumn'
import { COURSE_TYPE } from '@/constants/course'
import { useEffect, useState } from 'react'
import { createZipFromFile, formatSecondsToTime } from '@/utils'
import { Link, useNavigate } from 'react-router-dom'

type TProps = {
  section: TSectionCurriculum
  currentItem: SectionItem | undefined
  setCurrentItem: React.Dispatch<React.SetStateAction<SectionItem | undefined>>
}
export default function LearningAccordion({ currentItem, setCurrentItem, section }: TProps) {
  const handleClickDownloadItem = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.stopPropagation()
  }

  const handleOnClickItem = (item: SectionItem) => {
    window.scrollTo(0, 0)
    setCurrentItem(item)
  }

  return (
    <Accordion type='single' collapsible className='mb-4'>
      <AccordionItem value='section-1' className='!border-b-0'>
        <AccordionTrigger className='px-3 py-6 text-xl font-medium text-primary-1 hover:no-underline'>
          {section.title}
        </AccordionTrigger>
        <Separator className='bg-primary-1'></Separator>
        {section?.sectionItems &&
          section?.sectionItems.length > 0 &&
          section.sectionItems.map((lesson) => (
            <AccordionContent className=''>
              <div
                onClick={() => handleOnClickItem(lesson)}
                className={`px-3 py-6 cursor-pointer ${currentItem?.id == lesson.id ? 'bg-neutral-silver' : ''} `}
              >
                <div className='flex items-start'>
                  <Checkbox className='border-neutral-black data-[state=checked]:bg-primary-1 data-[state=checked]:text-white w-6 h-6'></Checkbox>
                  <h3 className='ml-3 text-[18px] font-medium text-neutral-black line-clamp-2 text-ellipsis leading-6'>
                    Lesson {lesson.position}. {lesson.title}
                  </h3>
                </div>
                <div className='flex items-center justify-between mt-5'>
                  <div className='flex items-center text-neutral-silver-3'>
                    {lesson.primaryAsset.type === COURSE_TYPE.VIDEO ? <PlayBtn></PlayBtn> : <Document2></Document2>}
                    {lesson.primaryAsset.type === COURSE_TYPE.VIDEO && (
                      <span className='ml-3'>{formatSecondsToTime(lesson.primaryAsset.timeEstimation)}</span>
                    )}
                  </div>
                  {lesson.supplementaryAssets.length > 0 && (
                    <DropdownMenu>
                      <DropdownMenuTrigger className='flex items-center justify-center p-3 ml-auto text-white rounded-xl bg-primary-1'>
                        <Folder></Folder>
                        <span className='ml-5'>Resources</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {lesson.supplementaryAssets.map((item) => (
                          <DropdownMenuItem className='cursor-pointer hover:bg-slate-100'>
                            <Link to={item?.fileUrl} className='w-full' onClick={(e) => handleClickDownloadItem(e)}>
                              {item.title}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </AccordionContent>
          ))}
      </AccordionItem>
    </Accordion>
  )
}
