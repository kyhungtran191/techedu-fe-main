import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import RatingStars from '@/components/RatingStars'
import Filter from '@/icons/Filter'
export default function FilterMain() {
  return (
    <div className='hidden w-full h-full px-3 py-6 overflow-y-auto bg-white rounded-xl no-scrollbar xl:block'>
      {/* Header Filter */}
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
                <RadioGroupItem value='4.5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <RatingStars count={5}></RatingStars>
              </div>
              <div className='flex items-center mb-4'>
                <RadioGroupItem value='4.5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <RatingStars count={4}></RatingStars>
              </div>
              <div className='flex items-center'>
                <RadioGroupItem value='4.5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
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
                <RadioGroupItem value='4.5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <Label className='flex items-center text-xl'>
                  0-1 Hour
                  <span className='ml-2 text-base text-neutral-silver-3'>(10)</span>
                </Label>
              </div>
              <div className='flex items-center mb-4'>
                <RadioGroupItem value='4.5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <Label className='flex items-center text-xl'>
                  0-1 Hour
                  <span className='ml-2 text-base text-neutral-silver-3'>(10)</span>
                </Label>
              </div>
              <div className='flex items-center mb-4'>
                <RadioGroupItem value='4.5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <Label className='flex items-center text-xl'>
                  0-1 Hour
                  <span className='ml-2 text-base text-neutral-silver-3'>(10)</span>
                </Label>
              </div>
              <div className='flex items-center '>
                <RadioGroupItem value='4.5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
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
                <RadioGroupItem value='4.5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <Label className='text-xl'>For all</Label>
              </div>
              <div className='flex items-center mb-4'>
                <RadioGroupItem value='4.5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <Label className='text-xl'>Beginner</Label>
              </div>
              <div className='flex items-center mb-4'>
                <RadioGroupItem value='4.5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <Label className='text-xl'>Senior</Label>
              </div>
              <div className='flex items-center'>
                <RadioGroupItem value='4.5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <Label className='text-xl'>Expert</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
