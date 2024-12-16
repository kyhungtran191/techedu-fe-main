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

  const myCourseQuery = useQuery({
    queryKey: ['my-enrolledCourses', isAuthenticated],
    queryFn: () => getMyCourse(),
    enabled: Boolean(isAuthenticated)
  })

  return (
    <div className='grid h-full grid-cols-12 overflow-y-auto  no-scrollbar rounded-xl gap-[10px]'>
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
        <div className='mt-[12px]'>
          {/* List View */}
          <div className={`${viewMode == 'list' ? 'block' : 'hidden'}`}>
            <div className='grid grid-cols-3 gap-8 text-lg font-medium text-neutral-black'>
              <div>Course name</div>
              <div>Progress</div>
              <div></div>
            </div>
            <div className='mt-6'>
              <div className='grid items-center w-full grid-cols-3 gap-8 p-3 mb-6 font-medium rounded-lg shadow-custom-shadow'>
                <div className='flex items-center gap-x-[18px] col-span-3  sm:col-span-1'>
                  <img
                    src={'https://letdiv.com/wp-content/uploads/2024/04/khoa-hoc-html-css.jpg'}
                    alt=''
                    className='w-[80px] h-[80px] object-cover rounded-xl'
                  />
                  <div className='flex-1 w-full'>
                    <h2 className='text-[18px]'>HTML CSS Advance</h2>
                    <p className='text-sm font-light'>Tran Hung</p>
                  </div>
                </div>

                <div className='col-span-3 sm:col-span-1'>
                  <Progress value={50} className='h-[20px]'></Progress>
                  <span className='block mt-2 text-sm font-light'>Completed 65%</span>
                </div>
                <div className='flex items-center justify-between col-span-3 sm:col-span-1 sm:justify-end gap-x-3'>
                  <Button variant={'custom'} className='w-full mr-8 sm:w-fit'>
                    Continue
                  </Button>
                  <DropDownMenuListCustom></DropDownMenuListCustom>
                </div>
              </div>
              <div className='grid items-center w-full grid-cols-3 gap-8 p-3 mb-6 font-medium rounded-lg shadow-custom-shadow'>
                <div className='flex items-center gap-x-[18px] col-span-3  sm:col-span-1'>
                  <img
                    src={
                      'data:image/jpeg;base64,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'
                    }
                    alt=''
                    className='w-[80px] h-[80px] object-cover rounded-xl'
                  />
                  <div className='flex-1 w-full'>
                    <h2 className='text-[18px]'>Js Basic</h2>
                    <p className='text-sm font-light'>Tran Hung</p>
                  </div>
                </div>

                {/* <div className='col-span-3 sm:col-span-1'>
                  <Progress value={50} className='h-[20px]'></Progress>
                  <span className='block mt-2 text-sm font-light'>Completed 65%</span>
                </div> */}
                <div className='flex items-center justify-between col-span-3 sm:col-span-1 sm:justify-end gap-x-3'>
                  <Button variant={'custom'} className='w-full mr-8 sm:w-fit'>
                    Continue
                  </Button>
                  <DropDownMenuListCustom></DropDownMenuListCustom>
                </div>
              </div>
            </div>
          </div>
          {/* Grid */}
          <div className={`${viewMode == 'grid' ? 'grid' : 'hidden'} grid-cols-3 gap-[18px]`}>
            <div className={`flex  flex-col w-full  bg-primary-3`}>
              {/* Call data here */}
              <div className={` h-[200px] w-full relative `}>
                <img src={CourseImage} alt='course-thumb' className={`h-full w-full object-cover rounded-xl`} />
                <div className='absolute  hidden sm:flex items-center justify-center w-[38px] h-[38px] rounded-full bg-white shadow-md cursor-pointer right-[14px] top-4'>
                  <DropDownMenuListCustom></DropDownMenuListCustom>
                </div>
              </div>
              <div className={`rounded-xl w-auto px-2 py-4`}>
                <h2 className='text-ellipsis line-clamp-2 h-[45px] sm:h-[55px] font-medium text-base sm:text-lg tb:text-xl mt-3'>
                  Rapid prototyping in the Chrome Browser Rapid prototyping in the Chrome Browser Rapid prototyping in
                  the Chrome Browser Rapid prototyping in the Chrome Browser
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
