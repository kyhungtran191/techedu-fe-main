import { useState } from 'react'

import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import Navigate from '@/icons/Navigate'
import { Button } from '@/components/ui/button'
import useCourseSetUp from '@/hooks/useCourseSetUp'
import { Check } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { CreateDraftCourse } from '@/services/instructor/draft-course.service'
import { TAddDraftCourse, TUploadData } from '@/@types/instructor/course/draft'
import { toast } from 'react-toastify'
import { initState, TCourseSetUpData } from '@/context/CourseSetUpContext'
import GlobalLoading from '@/components/Loading'
import { useNavigate } from 'react-router-dom'

const stepOptions = [
  {
    id: 1,
    value: "I'm currently very busy (less than 2 hours)"
  },
  {
    id: 2,
    value: "I'll work on this simultaneously with my other tasks (2-5 hours)"
  },
  {
    id: 3,
    value: 'I have plenty of flexibility (more than 5 hours)'
  },
  {
    id: 4,
    value: 'I’m not sure if I have the time yet'
  }
]

export default function Screen4() {
  const [option, setOption] = useState<string>('')
  const { setStep, setCourseData, setLocalStorageData, courseData, handleResetData } = useCourseSetUp()

  const navigate = useNavigate()

  const createCourseMutation = useMutation({
    mutationFn: (data: TAddDraftCourse) => CreateDraftCourse(data),
    async onSuccess() {
      toast.success(`Create course ${courseData.title} successfully!`)
      localStorage.removeItem('courseData')
    navigate('/teacher/courses')
    },
    onError(err) {
      console.log('Error when create draft course ' + err)
    }
  })

  const handleSubmitData = () => {
    // Clone Deep
    const courseDataDeepClone: TCourseSetUpData = JSON.parse(JSON.stringify(courseData))
    const dataUpload: TAddDraftCourse = {
      categoryId: courseDataDeepClone.categoryId,
      description: courseDataDeepClone.description,
      title: courseDataDeepClone.title,
      surveyAnswer: option,
      courseThumbnailFilePath: courseDataDeepClone.thumbnail.courseThumbnailFilePath
    }
    createCourseMutation.mutate(dataUpload)
  }

  return (
    <div className='flex flex-col h-full'>
      {createCourseMutation.isLoading && <GlobalLoading></GlobalLoading>}
      <div className='absolute inset-0 w-full h-full opacity-40 bg-gradient-to-b from-transparent via-primary-3 to-parent'></div>
      <div className='relative z-20 flex-grow pt-10 overflow-y-auto text-xl text-neutral-black'>
        <div className='mb-12 text-center'>
          <h2 className='mb-[18px] text-4xl font-medium text-primary-1'>
            How much time can you spend each week on your course?
          </h2>
          <p className='mx-auto'>
            There’s no wrong answer. Even with limited time, we’re here to help you reach your goals.
          </p>
        </div>
        <div className='max-w-[813px] w-full mx-auto text-neutral-black'>
          {stepOptions.map((item) => (
            <Label
              className='flex items-center p-6 mb-6 text-xl border rounded-lg cursor-pointer border-silver-3 group'
              htmlFor='skip'
              key={item.id}
              onClick={() => setOption(item.value)}
            >
              <div
                className={`w-6 h-6 rounded-full ${option == item?.value ? 'bg-primary-1 border-primary-1' : 'bg-white border-primary-2'} mr-5 border  flex items-center justify-center`}
              >
                <Check className='w-4 h-4 text-white'></Check>
              </div>
              <span>{item.value}</span>
            </Label>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className='z-10 flex items-center justify-between w-full py-8 mt-auto bg-white p container-fluid'>
        <div
          className='flex items-center px-3 py-2 border rounded-lg cursor-pointer'
          onClick={() => setStep((prev) => prev - 1)}
        >
          <Navigate />
          <span className='ml-[10px] text-neutral-black'>Previous</span>
        </div>
        <Button
          className={`${option === '' ? 'bg-neutral-silver-3 pointer-events-none cursor-not-allowed' : 'bg-primary-1 cursor-pointer pointer-events-auto'}`}
          onClick={handleSubmitData}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
