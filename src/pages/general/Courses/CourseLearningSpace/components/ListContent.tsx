import React from 'react'
import LearningAccordion from './LearningAccordion'

export default function ListContent() {
  return (
    <>
      <h2 className='px-3 text-2xl font-medium text-neutral-black'>Content</h2>
      <div className='mt-[18px]'>
        <LearningAccordion></LearningAccordion>
        <LearningAccordion></LearningAccordion>
        <LearningAccordion></LearningAccordion>
        <LearningAccordion></LearningAccordion>
      </div>
    </>
  )
}
