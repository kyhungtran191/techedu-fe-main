import React, { useState } from 'react'

// ShadcnUI
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

// END ShadcnUI
import CourseImage from '@/assets/course-img2.png'
import { Progress } from '@/components/ui/progress'
import ThreeDots from '@/icons/ThreeDots'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import List from '@/icons/List'
import { Separator } from '@/components/ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Share from '@/icons/Share'
import { useAppContext } from '@/hooks/useAppContext'
import { useQuery } from '@tanstack/react-query'
import { getMyCourse } from '@/services/auth.services'
import SectionLoading from '@/components/Loading/SectionLoading'
import { useNavigate } from 'react-router-dom'

function DropDownMenuListCustom() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=''>
        <ThreeDots></ThreeDots>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='py-[18px] px-3 rounded-xl min-w-[242px]'>
        <DropdownMenuItem className='flex items-center text-lg gap-x-[19px] mb-2'>
          <List></List>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className='flex items-center text-lg gap-x-[19px] mb-2'>
          <List></List>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className='flex items-center text-lg gap-x-[19px] mb-2'>
          <List></List>
          Profile
        </DropdownMenuItem>
        <Separator className='mb-6'></Separator>
        <DropdownMenuItem className='flex items-center text-lg gap-x-[19px] mb-2'>
          <Share></Share>
          Share
        </DropdownMenuItem>
        <Dialog>
          <DialogTrigger className='flex items-center px-2 py-3 text-lg rounded-lg  gap-x-[19px]'>
            <Plus className='w-6 h-6'></Plus>
            Add new list
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Create new list</DialogTitle>
            </DialogHeader>
            <div className='py-4 '>
              <Input
                id='name'
                placeholder='Name your list e.g.HTML Skills'
                className='py-6 mb-3 outline-none border-neutral-black'
              />
              <Textarea
                id='name'
                placeholder='Why are you creating this list? e.g. To start a new business, To get a new job, To become a web developer'
                className='py-6 mb-3 outline-none focus:outline-none border-neutral-black min-h-[140px]'
              />
            </div>
            <DialogFooter>
              <Button type='submit' variant={'custom'} disabled>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function EnrolledCourses() {
  const { isAuthenticated } = useAppContext()
  const [viewMode, setViewMode] = useState<string>('list')
  const navigate = useNavigate()
  const myCourseQuery = useQuery({
    queryKey: ['my-enrolledCourses', isAuthenticated],
    queryFn: () => getMyCourse(),
    enabled: Boolean(isAuthenticated),
    select: (data)=>data.data.value
  })


  return (
    <div className='grid h-full grid-cols-12 overflow-y-auto  no-scrollbar rounded-xl gap-[10px] relative'>
      {myCourseQuery.isLoading && <SectionLoading className="z-30"></SectionLoading>}
      <div className='col-span-12 px-3 bg-white rounded-xl py-[18px]'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-medium'>All Course</h2>
          <div className='flex items-center gap-x-6'>
            <div className='flex items-center gap-x-4'>
              <Checkbox
                className='flex items-center justify-center w-6 h-6 rounded-full border-primary-2'
                checked={viewMode == 'list'}
                onClick={() => setViewMode('list')}
              ></Checkbox>
              <span className='text-lg'>List view</span>
            </div>
            <div className='flex items-center gap-x-4'>
              <Checkbox
                className='flex items-center justify-center w-6 h-6 rounded-full border-primary-2'
                checked={viewMode == 'grid'}
                onClick={() => setViewMode('grid')}
              ></Checkbox>
              <span className='text-lg'>Grid view</span>
            </div>
          </div>
        </div>
        {/* List */}
        <div className='mt-[12px]'>
          {/* List View */}
          <div className={`${viewMode == 'list' ? 'block' : 'hidden'}`}>
            <div className='grid grid-cols-3 gap-8 text-lg font-medium text-neutral-black'>
              <div>Course name</div>
              <div>Progress</div>
              <div></div>
            </div>
            <div className='mt-6'>
              {myCourseQuery?.data?.map((item,index)=>(

              <div key={`${item?.courseId}-index`} className='grid items-center w-full grid-cols-3 gap-8 p-3 mb-6 font-medium rounded-lg shadow-custom-shadow'>
                <div className='flex items-center gap-x-[18px] col-span-3  sm:col-span-1'>
                  <img
                    src={item?.courseThumbnailUrl}
                    alt='course-thumbnail'
                    className='w-[80px] h-[80px] object-cover rounded-xl'
                  />
                  <div className='flex-1 w-full'>
                    <h2 className='text-[18px]'>{item?.title}</h2>
                    <p className='text-sm font-light'>{item?.instructorName}</p>
                  </div>
                </div>

                <div className='col-span-3 sm:col-span-1'>
                  <Progress value={50} className='h-[20px]'></Progress>
                  <span className='block mt-2 text-sm font-light'>Completed 65%</span>
                </div>
                <div className='flex items-center justify-between col-span-3 sm:col-span-1 sm:justify-end gap-x-3'>
                  <Button variant={'custom'} className='w-full mr-8 sm:w-fit' onClick={()=>navigate(`/courses/${item?.courseId}/learn/${item?.instructorId}`,{
                    state:{
                      courseName:item?.title
                    }
                  })}>
                    Continue
                  </Button>
                  <DropDownMenuListCustom></DropDownMenuListCustom>
                </div>
              </div>
              ))}
             
            </div>
          </div>
          {/* Grid */}
          <div className={`${viewMode == 'grid' ? 'grid' : 'hidden'} grid-cols-3 gap-[18px]`}>
            {myCourseQuery?.data?.map((item,index)=>(
                <div className={`flex  flex-col w-full  bg-primary-3`} key={index}>
                <div className={` h-[200px] w-full relative `}>
                  <img src={item?.courseThumbnailUrl} alt='course-thumb' className={`h-full w-full object-cover rounded-xl`} />
                  <div className='absolute  hidden sm:flex items-center justify-center w-[38px] h-[38px] rounded-full bg-white shadow-md cursor-pointer right-[14px] top-4'>
                    <DropDownMenuListCustom></DropDownMenuListCustom>
                  </div>
                </div>
                <div className={`rounded-xl w-auto px-2 py-4`}>
                  <h2 className='text-ellipsis line-clamp-2 h-[45px] sm:h-[55px] font-medium text-base sm:text-lg tb:text-xl mt-3'>
                   {item?.title}
                  </h2>
                  <div className='my-3'>
                    <Progress className='h-4' value={65}></Progress>
                    <span className='mt-2 text-sm font-light'>Completed 65%</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Button className='px-2 py-2 sm:py-3 sm:px-[18px] ml-auto' variant={'custom'}>
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          
          </div>
        </div>
      </div>
      <div className='hidden col-span-2 p-3 bg-white rounded-xl'>
        <div>
          <h3 className='text-2xl font-medium'>List</h3>
          {/* List Item */}
          <div className={`flex items-center gap-[19px] mt-3 py-2 hover:bg-neutral-silver rounded-lg cursor-pointer`}>
            <List></List>
            <div className='text-lg font-medium'>
              All course <span className='font-normal text-neutral-silver-3'>(19)</span>
            </div>
          </div>
          <div className={`flex items-center gap-[19px] mt-3 py-2 hover:bg-neutral-silver rounded-lg cursor-pointer`}>
            <List></List>
            <div className='text-lg font-medium'>
              All course <span className='font-normal text-neutral-silver-3'>(19)</span>
            </div>
          </div>
          <div className={`flex items-center gap-[19px] mt-3 py-2 hover:bg-neutral-silver rounded-lg cursor-pointer`}>
            <List></List>
            <div className='text-lg font-medium'>
              All course <span className='font-normal text-neutral-silver-3'>(19)</span>
            </div>
          </div>
          <div className={`flex items-center gap-[19px] mt-3 py-2 hover:bg-neutral-silver rounded-lg cursor-pointer`}>
            <List></List>
            <div className='text-lg font-medium'>
              All course <span className='font-normal text-neutral-silver-3'>(19)</span>
            </div>
          </div>
        </div>
        <Separator className='my-6'></Separator>
        <div>
          <h3 className='text-2xl font-medium'>Sort</h3>

          <RadioGroup defaultValue='option-one' onValueChange={(value) => {}}>
            <div className='flex items-center py-2 mt-3'>
              <RadioGroupItem value='4.5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
              <Label className='text-lg '>Newest</Label>
            </div>
            <div className='flex items-center py-2 mt-3'>
              <RadioGroupItem value='4.5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
              <Label className='text-lg '>Oldest</Label>
            </div>
            <div className='flex items-center py-2 mt-3'>
              <RadioGroupItem value='4.5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
              <Label className='text-lg '>In Progress</Label>
            </div>
            <div className='flex items-center py-2 mt-3'>
              <RadioGroupItem value='4.5' id='half-five' className='w-6 h-6 border-2 border-primary-2 mr-[18px]' />
              <Label className='text-lg '>Completed</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}
