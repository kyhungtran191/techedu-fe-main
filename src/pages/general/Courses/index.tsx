import Banner from '@/assets/banner-home.png'
import CourseCard from '@/components/Courses/CourseCard'

import Filter from '@/icons/Filter'
import { useRef, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import FilterBar from './components/FilterMobile'

import CourseSection from './components/CourseSection'
import FilterMain from './components/FilterMain'
import PaginationCustom from '@/components/Pagination'
import CourseListSkeleton from './components/CourseListSkeleton'
import SectionLoading from '@/components/Loading/SectionLoading'
import { QueryConfig } from '@/@types/course.type'
import useParamsVariables from '@/hooks/useParamsVariable'
import { isUndefined, omitBy } from 'lodash'

export default function Courses() {
  const [isFilter, setIsFilter] = useState<boolean>(false)

  const queryParams: QueryConfig = useParamsVariables()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '8',
      category: queryParams.category,
      search: queryParams.search,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      ratings: queryParams.ratings,
      sort_by: queryParams.sort_by,
      duration: queryParams.duration,
      level: queryParams.level
    },
    isUndefined
  )

  
  return (
    <div className='relative z-0 grid h-full  grid-cols-1  xl:grid-cols-[1fr_265px] gap-x-5'>
      <div className='w-full h-full overflow-y-auto text-white bg-white rounded-xl no-scrollbar'>
        {/* Banner image */}
        <img loading='lazy' src={Banner} alt='' className='object-cover w-full height-40vw height-30vw' />
        <div className='px-3 text-neutral-black'>
          {/* Popular Section */}
          <CourseSection></CourseSection>
          {/* Skeleton Loading */}
          {/* <CourseListSkeleton></CourseListSkeleton> */}
          <div className='my-6'>
            <div className='flex flex-wrap items-center justify-between'>
              <h4 className='text-2xl  mb-[18px] font-bold'>Explore</h4>
              <div className='flex items-center justify-between w-full gap-2 sm:w-auto sm:justify-normal'>
                <Select>
                  <SelectTrigger className=' max-w-fit min-w-[200px] py-3 px-[18px] h-[47px] rounded-lg border-neutral-black text-neutral-black text-base'>
                    <SelectValue placeholder='Sort by' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className='text-base'>
                      <SelectLabel></SelectLabel>
                      <SelectItem value='popular'>Popular</SelectItem>
                      <SelectItem value='highest-rated'>Highest rated</SelectItem>
                      <SelectItem value='newest'>Newest</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div
                  className='py-3 px-[18px] rounded-lg flex items-center justify-center bg-primary-1 text-white cursor-pointer xl:hidden'
                  onClick={() => setIsFilter(true)}
                >
                  <Filter></Filter>
                </div>
              </div>
            </div>
            <div className=''>
              <CourseCard vertical={false} wrapperClass='my-5'></CourseCard>
              <CourseCard vertical={false} wrapperClass='my-5'></CourseCard>
              <CourseCard vertical={false} wrapperClass='my-5'></CourseCard>
            </div>
            <PaginationCustom
              path='/courses'
              totalPage={100}
              queryConfig={queryConfig}
              className='justify-center sm:justify-end'
            ></PaginationCustom>
          </div>
        </div>
      </div>
      <FilterMain queryConfig={queryConfig}></FilterMain>
      <FilterBar
        queryConfig={queryConfig}
        isOpen={isFilter}
        setIsOpen={setIsFilter}
        className='block xl:hidden'
      ></FilterBar>
    </div>
  )
}
