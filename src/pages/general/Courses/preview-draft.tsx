import { Heart, Play } from 'lucide-react'
import React, { useState } from 'react'
import ReactPlayer from 'react-player'

// Swiper
import 'swiper/css'
import ListContent from './CourseLearningSpace/components/ListContent'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navigate from '@/icons/Navigate'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { GetPublishSections } from '@/services/publish-course'
import { SectionItem, TSectionCurriculum } from '@/@types/instructor/course/curriculumn'
import ContentLearningSpace from './components/ContentLearningSpace'
import SectionLoading from '@/components/Loading/SectionLoading'

export default function PreviewDraft() {
  const [currentItem, setCurrentItem] = useState<SectionItem | undefined>()
  // Toggle Playing Button

  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state
  if (!state.courseId || !state.instructorId) {
    toast.error('No courseID or instructorId found !')
  }
  const { data, isLoading } = useQuery({
    queryKey: ['publish-sections', state.courseId, state.instructorId],
    queryFn: () => GetPublishSections(state.courseId, state.instructorId),
    enabled: Boolean(state.courseId && state.instructorId),
    select: (data) => data.data.value,
    onSuccess(data) {
      if (data) {
        const firstSection = data && data[0]
        setCurrentItem(firstSection.sectionItems[0])
      }
    },
    onError(err) {
      toast.error('Error when fetch sections' + err)
    }
  })

  console.log(data)

  return (
    <>
      {isLoading && <SectionLoading className='z-30'></SectionLoading>}
      <div className='w-full transition-all duration-300 ease-in-out flex items-center justify-between h-[76px] text-black container-fluid z-50 relative'>
        <h1 className='text-3xl font-semibold'>Preview Course</h1>
        <div className='flex-1 text-2xl font-semibold text-center'>Course Name Of User</div>
        <div onClick={() => navigate(-1)} className='flex items-center gap-2 cursor-pointer'>
          <Navigate></Navigate>
          Back
        </div>
      </div>
      <div className='container-fluid relative z-0 grid h-full grid-cols-1 lg:grid-cols-[1fr_363px] gap-x-5 py-5'>
        <div className='relative w-full h-full overflow-y-auto bg-white rounded-xl no-scrollbar'>
          <ContentLearningSpace currentItem={currentItem}></ContentLearningSpace>
        </div>
        <div className='hidden w-full h-full py-3 overflow-y-auto bg-white lg:block no-scrollbar rounded-xl'>
          <ListContent
            isLoading={isLoading}
            setCurrentItem={setCurrentItem}
            currentItem={currentItem}
            sections={data || []}
          ></ListContent>
        </div>
      </div>
    </>
  )
}
