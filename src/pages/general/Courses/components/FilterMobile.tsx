import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import RatingStars from '@/components/RatingStars'
import Filter from '@/icons/Filter'
import Close from '@/icons/Close'
import { Button } from '@/components/ui/button'
import { CourseListConfig } from '@/@types/course.type'

interface IProps {
  className?: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  queryConfig: CourseListConfig
}
export default function FilterBar(props: IProps) {
  const { isOpen, setIsOpen, className, queryConfig } = props

  return createPortal(
    <div className={`${className}`}>
      <div
        className={`fixed inset-0 z-40 h-full w-full bg-black/40 ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`z-40 fixed bottom-0 right-0 w-[265px] h-screen px-3  bg-white rounded-xl  xl:block transition-all duration-300 ease-in-out ${
          isOpen ? 'right-0 translate-x-0' : 'translate-x-[264px]'
        }`}
      >
        <div className='h-full pb-20 overflow-y-auto no-scrollbar'>
          <div className='flex justify-end w-full mb-2'>
            <Close className='w-6 h-6' onClick={() => setIsOpen(false)}></Close>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3 text-neutral-black'>
              <Filter></Filter>
              <h3 className='text-2xl font-medium'>Filter</h3>
            </div>
            <div className='text-neutral-silver-3'>Clear</div>
          </div>
          <Separator className='w-full mt-3 bg-black' orientation='horizontal' />
          {/* End Header Filter */}
          <Accordion type='single' collapsible defaultValue='rating'>
            <AccordionItem value='rating' className='!border-b-0 pt-3'>
              <AccordionTrigger className='text-2xl hover:no-underline text-primary-1'>Rating</AccordionTrigger>
              <Separator className='w-full mb-4 bg-primary-2' orientation='horizontal' />
              <AccordionContent className='mt-0'>
                {/* On selection */}
                <RadioGroup defaultValue='option-one' className='' onValueChange={(value) => {}}>
                  <div className='flex items-center mb-4'>
                    <RadioGroupItem
                      value='4.5'
                      id='half-five'
                      className='w-6 h-6 border-2 border-primary-2 mr-[18px] focus:fill-primary-1'
                    />
                    <RatingStars count={5}></RatingStars>
                  </div>
                  <div className='flex items-center mb-4'>
                    <RadioGroupItem
                      value='4.5'
                      id='half-five'
                      className='w-6 h-6 border-2 border-primary-2 mr-[18px]'
                    />
                    <RatingStars count={4}></RatingStars>
                  </div>
                  <div className='flex items-center'>
                    <RadioGroupItem
                      value='4.5'
                      id='half-five'
                      className='w-6 h-6 border-2 border-primary-2 mr-[18px]'
                    />
                    <RatingStars count={3}></RatingStars>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* Duration */}
          <Accordion type='single' collapsible defaultValue='level'>
            <AccordionItem value='level' className='!border-b-0 pt-3'>
              <AccordionTrigger className='text-2xl hover:no-underline text-primary-1'>Video duration</AccordionTrigger>
              <Separator className='w-full mb-4 bg-primary-2' orientation='horizontal' />
              <AccordionContent className='mt-0'>
                <RadioGroup defaultValue='option-one' onValueChange={(value) => {}}>
                  <div className='flex items-center mb-4'>
                    <RadioGroupItem
                      value='4.5'
                      id='half-five'
                      className='w-6 h-6 border-2 border-primary-2 mr-[18px]'
                    />
                    <Label className='flex items-center text-xl'>
                      0-1 Hour
                      <span className='ml-2 text-base text-neutral-silver-3'>(10)</span>
                    </Label>
                  </div>
                  <div className='flex items-center mb-4'>
                    <RadioGroupItem
                      value='4.5'
                      id='half-five'
                      className='w-6 h-6 border-2 border-primary-2 mr-[18px]'
                    />
                    <Label className='flex items-center text-xl'>
                      0-1 Hour
                      <span className='ml-2 text-base text-neutral-silver-3'>(10)</span>
                    </Label>
                  </div>
                  <div className='flex items-center mb-4'>
                    <RadioGroupItem
                      value='4.5'
                      id='half-five'
                      className='w-6 h-6 border-2 border-primary-2 mr-[18px]'
                    />
                    <Label className='flex items-center text-xl'>
                      0-1 Hour
                      <span className='ml-2 text-base text-neutral-silver-3'>(10)</span>
                    </Label>
                  </div>
                  <div className='flex items-center '>
                    <RadioGroupItem
                      value='4.5'
                      id='half-five'
                      className='w-6 h-6 border-2 border-primary-2 mr-[18px]'
                    />
                    <Label className='flex items-center text-xl'>
                      0-1 Hour
                      <span className='ml-2 text-base text-neutral-silver-3'>(10)</span>
                    </Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* End Duration */}
          {/* Levels */}
          <Accordion type='single' collapsible defaultValue='level'>
            <AccordionItem value='level' className='!border-b-0 pt-3'>
              <AccordionTrigger className='text-2xl hover:no-underline text-primary-1'>Level</AccordionTrigger>
              <Separator className='w-full mb-4 bg-primary-2' orientation='horizontal' />
              <AccordionContent className='mt-0'>
                <RadioGroup defaultValue='option-one' className='' onValueChange={(value) => {}}>
                  <div className='flex items-center mb-4'>
                    <RadioGroupItem
                      value='4.5'
                      id='half-five'
                      className='w-6 h-6 border-2 border-primary-2 mr-[18px]'
                    />
                    <Label className='text-xl'>For all</Label>
                  </div>
                  <div className='flex items-center mb-4'>
                    <RadioGroupItem
                      value='4.5'
                      id='half-five'
                      className='w-6 h-6 border-2 border-primary-2 mr-[18px]'
                    />
                    <Label className='text-xl'>Beginner</Label>
                  </div>
                  <div className='flex items-center mb-4'>
                    <RadioGroupItem
                      value='4.5'
                      id='half-five'
                      className='w-6 h-6 border-2 border-primary-2 mr-[18px]'
                    />
                    <Label className='text-xl'>Senior</Label>
                  </div>
                  <div className='flex items-center'>
                    <RadioGroupItem
                      value='4.5'
                      id='half-five'
                      className='w-6 h-6 border-2 border-primary-2 mr-[18px]'
                    />
                    <Label className='text-xl'>Expert</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        {/* Header Filter */}
        <div className='fixed bottom-0 left-0 w-full p-3 bg-white '>
          <Button variant={'custom'} className='w-full'>
            Apply
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}
