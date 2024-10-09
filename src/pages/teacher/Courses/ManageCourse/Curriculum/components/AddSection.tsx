import React, { useEffect, useState } from 'react'
// Icon
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// validate RHF
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// End validate
export default function AddSection() {
  const [isAddSection, setIsAddSection] = useState(false)

  const schema = yup.object().shape({
    section_name: yup.string().required('Required_field').max(80, 'Max is 80')
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
    resolver: yupResolver(schema)
  })

  // Trigger validate for the first time react hook form
  useEffect(() => {
    trigger()
  }, [trigger])

  const handleAddNewSection = (data: unknown) => {
    // Call api to add new section
    console.log(data)
  }

  return (
    <>
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
          name='section_name'
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
            disabled={Boolean(errors?.section_name?.message)}
            className={` text-white ${errors.section_name?.message ? ' bg-neutral-black' : 'bg-primary-1'}`}
          >
            Apply
          </Button>
        </div>
      </form>
    </>
  )
}
