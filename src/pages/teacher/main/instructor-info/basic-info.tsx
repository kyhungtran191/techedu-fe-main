/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Tiptap from '@/components/TipTap'
import { useAppContext } from '@/hooks/useAppContext'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateMe } from '@/services/auth.services'
import { toast } from 'react-toastify'
import SectionLoading from '@/components/Loading/SectionLoading'

type FormData = {
  firstName: string
  lastName: string
  headline: string
  biography: string
}

const schema = yup.object().shape({
  firstName: yup.string().required('first name is require'),
  lastName: yup.string().required('lastName is require'),
  headline: yup.string().required('headline is require').max(60, 'headline max length is 60'),
  biography: yup.string().required('biography is required')
})

export default function BasicInfo() {
  const { profile, isAuthenticated } = useAppContext()
  if (!profile) return

  useEffect(() => {
    if (profile) {
      const { firstName, lastName, bio, headline } = profile
      reset({
        firstName,
        biography: bio,
        headline,
        lastName
      })
    }
  }, [profile])

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid, dirtyFields },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver<FormData>(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      headline: '',
      biography: ''
    }
  })

  const updateMeMutation = useMutation({
    mutationFn: (data: { firstName: string; lastName: string; headline: string; bio: string }) => updateMe(data)
  })

  const queryClient = useQueryClient()

  const handleSubmitValue = (data: FormData) => {
    const newData = {
      bio: data.biography,
      firstName: data.firstName,
      lastName: data.lastName,
      headline: data.headline
    }
    updateMeMutation.mutate(newData, {
      onSuccess(data) {
        console.log('update me data ', data)
        toast.success('Update profile success')
        queryClient.invalidateQueries(['me', isAuthenticated])
      }
    })
  }

  console.log(errors.headline)

  return (
    <form className='' onSubmit={handleSubmit(handleSubmitValue)}>
      {updateMeMutation.isLoading && <SectionLoading className='z-30'></SectionLoading>}
      <div className='relative z-20 flex-grow w-full mx-auto overflow-y-auto text-xl text-neutral-black no-scrollbar '>
        <div className=''>
          <div className='flex items-center justify-between gap-x-[64px] mb-6'>
            <div className='flex-1'>
              <Label className='mb-[18px] block text-xl'>First name</Label>
              <div className='relative w-full p-3 border rounded-lg border-neutral-black'>
                {/* Title input */}
                <Controller
                  control={control}
                  name='firstName'
                  render={({ field }) => (
                    <Input
                      placeholder='Enter your first name'
                      className='px-0 py-0 text-xl border-none focus:outline-none text-neutral-black pr-[30px] placeholder:text-neutral-silver-3'
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            <div className='flex-1'>
              <Label className='mb-[18px] block text-xl'>Last name </Label>
              <div className='relative w-full p-3 border rounded-lg border-neutral-black'>
                {/* Title input */}
                <Controller
                  control={control}
                  name='lastName'
                  render={({ field }) => (
                    <Input
                      placeholder='Enter your last name'
                      className='px-0 py-0 text-xl border-none focus:outline-none text-neutral-black pr-[30px] placeholder:text-neutral-silver-3'
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className='mb-6'>
            <Label className='mb-[18px] block text-xl'>Headline</Label>
            <div className='relative w-full p-3 border rounded-lg border-neutral-black'>
              {/* Title input */}
              <Controller
                control={control}
                name='headline'
                render={({ field }) => (
                  <Input
                    placeholder='Ex: Visual Design for UX '
                    className='px-0 py-0 text-xl border-none focus:outline-none text-neutral-black pr-[30px] placeholder:text-neutral-silver-3'
                    {...field}
                  />
                )}
              />
              <div className='absolute -translate-y-1/2 right-3 top-1/2 text-neutral-silver-3'>60</div>
            </div>
          </div>
          <div>
            <Label className='mb-[18px] block text-xl'>Biography</Label>
            <Controller
              control={control}
              name='biography'
              render={({ field }) => (
                <Tiptap
                  placeholder='Introduce yourself to the students.To help learners connect with you on a deeper level, your bio should showcase your Credibility, Empathy, Passion, and Personality.'
                  className='min-h-[206px] w-full text-xl rounded-lg border border-neutral-black py-[18px] px-3 outline-none placeholder:text-neutral-silver-3'
                  {...field}
                  description={profile?.bio || field?.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </div>
      <Button variant={'custom'} disabled={!isValid} className='w-full mt-5 p-7'>
        Save
      </Button>
    </form>
  )
}
