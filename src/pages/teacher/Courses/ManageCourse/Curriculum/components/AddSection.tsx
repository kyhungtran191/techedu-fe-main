import React, { useEffect, useState } from 'react'
// Icon
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// validate RHF
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TSectionCurriculum } from '@/@types/instructor/course/curriculumn'
import { useMutation } from '@tanstack/react-query'
import { CreateSection } from '@/services/instructor/manage/curriculumn.service'
import SectionLoading from '@/components/Loading/SectionLoading'
// End validate

type AddSection = {
  updateSections: (updatedSections: TSectionCurriculum[]) => void
  sections: TSectionCurriculum[]
  courseId: string
}
export default function AddSection({ updateSections, courseId, sections }: AddSection) {
  const [isAddSection, setIsAddSection] = useState(false)

  // Yup validate
  const schema = yup.object().shape({
    title: yup.string().required('Required_field').max(80, 'Max is 80')
  })

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
    reset,
    setError
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      title: ''
    }
  })
  // End Yup validate

  // Trigger validate for the first time react hook form
  useEffect(() => {
    trigger()
  }, [trigger])

  // Add new Section
  const addNewSectionMutation = useMutation({
    mutationFn: (title: string) => CreateSection(courseId, title)
  })

  const handleAddNewSection = ({ title }: { title: string }) => {
    addNewSectionMutation.mutate(title, {
      async onSuccess(data) {
        reset({
          title: ''
        })
        if (data.data.value?.id) {
          const newSections = [...sections]
          newSections.push({
            id: data.data.value?.id as any,
            isPublished: false,
            sectionItems: [],
            title: title
          })
          updateSections(newSections)
          setIsAddSection(false)
        }
      }
    })
  }

  return (
    <div className='relative'>
      {addNewSectionMutation.isLoading && <SectionLoading></SectionLoading>}
      <div
        className={`${isAddSection ? 'hidden' : 'flex'} items-center p-6 mt-6 shadow-md cursor-pointer bg-neutral-silver rounded-xl`}
        onClick={() => setIsAddSection(true)}
      >
        <Plus></Plus>
        <span className='ml-[10px] text-xl'>New section</span>
      </div>

      {/* Section Name */}
      <form
        onSubmit={handleSubmit(handleAddNewSection)}
        className={`${isAddSection ? 'flex' : 'hidden'} items-center justify-between p-6 mt-6 border rounded-lg bg-neutral-silver border-neutral-black`}
      >
        <Controller
          control={control}
          name='title'
          render={({ field }) => (
            <Input
              className='w-full outline-none focus:border-primary-1 max-w-[400px] py-6 text-xl text-neutral-black'
              placeholder='Section tittle'
              defaultValue={''}
              {...field}
            ></Input>
          )}
        />

        <div className='flex items-center'>
          <div className='py-3 px-[18px] cursor-pointer' onClick={() => setIsAddSection(false)}>
            Cancel
          </div>
          <Button
            disabled={Boolean(errors?.title?.message)}
            className={` text-white ${errors.title?.message ? ' bg-neutral-black' : 'bg-primary-1'}`}
          >
            Apply
          </Button>
        </div>
      </form>
    </div>
  )
}
