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
import useParamsVariables from '@/hooks/useParamsVariable'
import { debounce, isUndefined, omit, omitBy } from 'lodash'
import { Input } from '@/components/ui/input'
import { CourseListConfig, CourseListParams } from '@/@types/course.type'
import { useQuery } from '@tanstack/react-query'
import { GetFilterCourses } from '@/services/publish-course'
import SkeletonCardVertical from '@/components/Courses/SkeletonCardVertical'
import { createSearchParams, useNavigate } from 'react-router-dom'

export default function Courses() {
  const [isFilter, setIsFilter] = useState<boolean>(false)

  const queryParams: CourseListParams = useParamsVariables()
  const navigate = useNavigate()
  const queryConfig: CourseListConfig = omitBy(
    {
      categoryId: queryParams.categoryId,
      subCategoryId: queryParams.subCategoryId,
      level: queryParams.level,
      language: queryParams.language,
      videoDurationInSeconds: queryParams.videoDurationInSeconds?.toString(),
      searchTerm: queryParams.searchTerm,
      pageIndex: (queryParams?.pageIndex || '1').toString(),
      pageSize: (queryParams?.pageSize || '8').toString(),
      rating: queryParams.rating?.toString(),
      sort_by: queryParams.sort_by
    },
    isUndefined
  ) as CourseListConfig

  const { data, isLoading } = useQuery({
    queryKey: ['courses-filter', queryConfig],
    queryFn: () => GetFilterCourses(queryConfig),
    select: (data) => data.data.value
  })

  const onSearchChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    if (searchValue) {
      return navigate({
        pathname: '/',
        search: createSearchParams({
          ...queryConfig,
          pageIndex: '1',
          searchTerm: searchValue
        }).toString()
      })
    } else {
      const updatedQuery = omit(queryConfig, ['searchTerm'])
      return navigate({
        pathname: '/',
        search: createSearchParams({
          ...updatedQuery
        }).toString()
      })
    }
  }, 300)

  return (
    <div className='relative z-0 grid h-full  grid-cols-1  xl:grid-cols-[1fr_265px] gap-x-5'>
      <div className='w-full h-full overflow-y-auto text-white bg-white rounded-xl no-scrollbar'>
        {/* Banner image */}
        <img loading='lazy' src={Banner} alt='' className='object-cover w-full height-40vw height-30vw' />
        <div className='px-3 text-neutral-black'>
          {/* Popular Section */}
          <CourseSection></CourseSection>
          {/* Skeleton Loading */}
          <div className='my-6 min-h-[300px]'>
            <div className='flex flex-wrap items-center justify-between'>
              <h4 className='text-2xl  mb-[18px] font-bold'>Explore</h4>
              <div className='flex items-center w-full gap-2 n sm:w-auto sm:justify-normal'>
                <Input
                  type='search'
                  placeholder='Search courses...'
                  className='md:w-[100px] lg:w-[300px] h-auto py-3 border-neutral-black outline-none'
                  onChange={onSearchChange}
                />
                {/* <Select>
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
                </Select> */}
                <div
                  className='py-3 px-[18px] rounded-lg flex items-center justify-center bg-primary-1 text-white cursor-pointer xl:hidden'
                  onClick={() => setIsFilter(true)}
                >
                  <Filter></Filter>
                </div>
              </div>
            </div>
            {!isLoading && (
              <div className=''>
                {data?.items && data?.items?.length > 0 ? (
                  data?.items.map((item) => (
                    <CourseCard vertical={false} wrapperClass='my-5' courseInfo={item}></CourseCard>
                  ))
                ) : (
                  <div className='h-full mt-10 font-semibold text-center'>No course found</div>
                )}
              </div>
            )}

            {isLoading &&
              Array(4)
                .fill(0)
                .map((item) => <SkeletonCardVertical></SkeletonCardVertical>)}
            {data?.items && data?.items?.length > 0 && (
              <PaginationCustom
                path='/'
                totalPage={data?.totalPage as number}
                queryConfig={queryConfig}
                className='justify-center mt-3 sm:justify-end'
              ></PaginationCustom>
            )}
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
