import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import RatingStars from '@/components/RatingStars'
import Filter from '@/icons/Filter'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { isUndefined, omit, omitBy } from 'lodash'
import { CourseListConfig } from '@/@types/course.type'

interface IProps {
  queryConfig: CourseListConfig
}
export default function FilterMain({ queryConfig }: IProps) {
  const navigate = useNavigate()

  const handleSelectFilter = (key: string, value: string) => {
    if (key === 'level' && value == 'all') {
      value = ''
    }
    return navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        [key]: value
      }).toString()
    })
  }

  const handleClearFilters = () => {
    const defaultPage = '1'
    const defaultLimit = '8'

    // Use lodash to omit the specific filters
    const updatedQuery = omit(queryConfig, ['rating', 'level', 'videoDurationInSeconds', 'categoryId', 'subCategoryId'])

    return navigate({
      pathname: '/',
      search: createSearchParams({
        ...updatedQuery,
        pageIndex: defaultPage,
        pageSize: defaultLimit
      }).toString()
    })
  }

  return (
    <div className='hidden w-full h-full px-3 py-6 overflow-y-auto bg-white rounded-xl no-scrollbar xl:block'>
      {/* Header Filter */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3 text-neutral-black'>
          <Filter></Filter>
          <h3 className='text-2xl font-medium'>Filter</h3>
        </div>
        <div className='cursor-pointer text-neutral-silver-3' onClick={handleClearFilters}>
          Clear
        </div>
      </div>
      <Separator className='w-full mt-3 bg-black' orientation='horizontal' />
      {/* End Header Filter */}
      <Accordion type='single' collapsible defaultValue='rating'>
        <AccordionItem value='rating' className='!border-b-0 pt-3'>
          <AccordionTrigger className='text-2xl hover:no-underline text-primary-1'>Rating</AccordionTrigger>
          <Separator className='w-full mb-4 bg-primary-2' orientation='horizontal' />
          <AccordionContent className='mt-0'>
            {/* On selection */}
            <RadioGroup
              value={queryConfig.rating || ''}
              className=''
              onValueChange={(value) => handleSelectFilter('rating', value)}
            >
              <div className='flex items-center mb-4'>
                <RadioGroupItem value='5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <RatingStars count={5}></RatingStars>
              </div>
              <div className='flex items-center mb-4'>
                <RadioGroupItem value='4.5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <RatingStars count={4}></RatingStars>
              </div>
              <div className='flex items-center'>
                <RadioGroupItem value='3.5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
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
            <RadioGroup
              value={queryConfig.videoDurationInSeconds || ''}
              onValueChange={(value) => handleSelectFilter('videoDurationInSeconds', value)}
            >
              <div className='flex items-center mb-4'>
                <RadioGroupItem value='3600' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <Label className='flex items-center text-xl'>
                  0-1 Hour
                  <span className='ml-2 text-base text-neutral-silver-3'>(10)</span>
                </Label>
              </div>
              <div className='flex items-center mb-4'>
                <RadioGroupItem value='7200' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <Label className='flex items-center text-xl'>
                  0-2 Hours
                  <span className='ml-2 text-base text-neutral-silver-3'>(10)</span>
                </Label>
              </div>
              <div className='flex items-center mb-4'>
                <RadioGroupItem value='10800' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <Label className='flex items-center text-xl'>
                  0-3 Hours
                  <span className='ml-2 text-base text-neutral-silver-3'>(10)</span>
                </Label>
              </div>
              <div className='flex items-center mb-0'>
                <RadioGroupItem value='14400' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <Label className='flex items-center text-xl'>
                  0-4 Hours
                  <span className='ml-2 text-base text-neutral-silver-3'>(10)</span>
                </Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* End Duration */}
      {/* Levels */}
      <Accordion type='single' collapsible>
        <AccordionItem value='level' className='!border-b-0 pt-3'>
          <AccordionTrigger className='text-2xl hover:no-underline text-primary-1'>Level</AccordionTrigger>
          <Separator className='w-full mb-4 bg-primary-2' orientation='horizontal' />
          <AccordionContent className='mt-0'>
            <RadioGroup
              value={queryConfig.level || ''}
              className=''
              onValueChange={(value) => handleSelectFilter('level', value)}
            >
              <div className='flex items-center mb-4'>
                <RadioGroupItem value='' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <Label className='text-xl'>For all</Label>
              </div>
              <div className='flex items-center mb-4'>
                <RadioGroupItem
                  value='Beginner'
                  id='half-five'
                  className='w-6 h-6 border-2 border-primary-2 mr-[18px]'
                />
                <Label className='text-xl'>Beginner</Label>
              </div>
              <div className='flex items-center mb-4'>
                <RadioGroupItem
                  value='Immediately'
                  id='half-five'
                  className='w-6 h-6 border-2 border-primary-2 mr-[18px]'
                />
                <Label className='text-xl'>Immediately</Label>
              </div>
              <div className='flex items-center mb-4'>
                <RadioGroupItem value='Senior' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <Label className='text-xl'>Senior</Label>
              </div>
              <div className='flex items-center'>
                <RadioGroupItem value='Expert' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
                <Label className='text-xl'>Expert</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
