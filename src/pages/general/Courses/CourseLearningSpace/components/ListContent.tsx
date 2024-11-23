import React from 'react'
import LearningAccordion from './LearningAccordion'
import { SectionItem, TSectionCurriculum } from '@/@types/instructor/course/curriculumn'
import SectionLoading from '@/components/Loading/SectionLoading'

type TProps = {
  sections: TSectionCurriculum[]
  currentItem: SectionItem | undefined
  setCurrentItem: React.Dispatch<React.SetStateAction<SectionItem | undefined>>
  isLoading: boolean
}
export default function ListContent({ isLoading, setCurrentItem, currentItem, sections }: TProps) {
  return (
    <div className='relative min-h-[700px]'>
      {isLoading && <SectionLoading></SectionLoading>}
      <h2 className='px-3 text-2xl font-medium text-neutral-black'>Content</h2>
      <div className='mt-[18px]'>
        {sections.map((section) => (
          <LearningAccordion
            setCurrentItem={setCurrentItem}
            currentItem={currentItem}
            section={section}
            key={section?.id}
          ></LearningAccordion>
        ))}
      </div>
    </div>
  )
}
