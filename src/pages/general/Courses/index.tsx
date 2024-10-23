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

export default function Courses() {
  const [isFilter, setIsFilter] = useState<boolean>(false)
  return (
    <div className='relative z-0 grid h-full  grid-cols-1  xl:grid-cols-[1fr_265px] gap-x-5'>
      <div className='w-full h-full overflow-y-auto text-white bg-white rounded-xl no-scrollbar'>
        {/* Banner image */}
        <img src={Banner} alt='' className='object-cover w-full height-40vw height-30vw' />
        <div className='px-3 text-neutral-black'>
          {/* Popular Section */}
          <CourseSection></CourseSection>
          <CourseListSkeleton></CourseListSkeleton>
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
            <PaginationCustom totalPage={100} className='justify-center sm:justify-end'></PaginationCustom>
          </div>
        </div>
      </div>
      <FilterMain></FilterMain>
      <FilterBar isOpen={isFilter} setIsOpen={setIsFilter} className='block xl:hidden'></FilterBar>
    </div>
  )
}
