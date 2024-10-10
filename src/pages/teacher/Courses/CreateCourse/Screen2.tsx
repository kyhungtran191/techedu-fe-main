import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import useCourseSetUp from '@/hooks/useCourseSetUp'
import Navigate from '@/icons/Navigate'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

export default function Screen2() {
  const { isHavingValues, step, setStep, setCourseData, setLocalStorageData, courseData } = useCourseSetUp()

  type FormData = {
    field: string
  }

  const schema = yup.object().shape({
    field: yup.string().required('Course field is required')
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver<FormData>(schema),
    defaultValues: {
      field: courseData.field || ''
    }
  })

  const handleUpdateField = (data: FormData) => {
    setCourseData((prev) => ({ ...prev, ...data }))
    setLocalStorageData({
      courseData: { ...courseData, ...data },
      step: 3
    })
    setStep((step) => step + 1)
  }

  return (
    <form className='flex flex-col h-full' onSubmit={handleSubmit(handleUpdateField)}>
      <div className='absolute inset-0 w-full h-full opacity-40 bg-gradient-to-b from-transparent via-primary-3 to-parent'></div>
      <div className='relative z-20 flex-grow pt-10 overflow-y-auto text-xl text-neutral-black'>
        <div className='mb-12 text-center'>
          <h2 className='mb-[18px] text-4xl font-medium text-primary-1'>
            Which field best matches the knowledge you share?
          </h2>
          <p className='max-w-[570px] mx-auto'>
            If you aren’t sure about the appropriate field, you can change it later.
          </p>
        </div>
        <Controller
          name='field'
          control={control}
          render={({ field }) => (
            <Select onValueChange={(value) => field.onChange(value)} defaultValue={courseData.field || ''}>
              <SelectTrigger className='max-w-[813px] mx-auto w-full py-6 outline-none text-xl text-neutral-black border-neutral-black'>
                <SelectValue placeholder='Choose A Field' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Choose A Field</SelectLabel>
                  <SelectItem className='!px-8 py-3 text-xl font-medium cursor-pointer' value='designer'>
                    Designer
                  </SelectItem>
                  <SelectItem className='!px-8 py-3 text-xl font-medium  cursor-pointer' value='it'>
                    IT
                  </SelectItem>
                  <SelectItem className='!px-8 py-3 text-xl font-medium  cursor-pointer' value='marketing'>
                    Marketing
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        ></Controller>
      </div>
      {/* Footer */}
      <div className='z-10 flex items-center justify-between w-full py-8 mt-auto bg-white p container-fluid'>
        <div
          className='py-2 px-3 rounded-lg flex items-center cursor-pointer border'
          onClick={() => setStep((prev) => prev - 1)}
        >
          <Navigate />
          <span className='ml-[10px] text-neutral-black'>Previous</span>
        </div>
        <Button
          type='submit'
          className={`${!isValid ? 'bg-neutral-silver-3 pointer-events-none cursor-not-allowed' : 'bg-primary-1 cursor-pointer pointer-events-auto'}`}
        >
          Continue
        </Button>
      </div>
    </form>
  )
}
