import { Link, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CompleteRegister, ConfirmEmailUser } from '@/services/user.services'
import SectionLoading from '@/components/Loading/SectionLoading'
import * as yup from 'yup'
import { PASSWORD_REG, PHONE_REG } from '@/constants/validate-rules'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ConfirmSuccess from '@/components/confirm-success-email'

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  phoneNumber: yup
    .string()
    .required('Phone Number is required')
    .matches(PHONE_REG, 'Invalid phone number. Please ensure the  phone number meets format.')
})
export default function ConfirmEmail() {
  const { userId, token } = useParams()

  // const []
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['confirm-email', userId, token],
    queryFn: () => ConfirmEmailUser({ userId, token } as { userId: string; token: string }),
    enabled: Boolean(userId && token),
    onSuccess: () => {}
  })

  const defaultValue = { firstName: '', lastName: '', phoneNumber: '' }

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    setError
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: defaultValue
  })

  const {
    mutate: activeUser,
    isSuccess: isSuccessActive,
    isLoading: isLoadingActive
  } = useMutation({
    mutationFn: (data: { lastName: string; firstName: string; phoneNumber: string }) =>
      CompleteRegister(userId as string, data)
  })

  const onSubmit = (data: { firstName: string; lastName: string; phoneNumber: string }) => {
    activeUser(data, {
      onSuccess(data) {},
      onError(err: any) {
        const errMessage = err?.response?.data?.Error?.Message || 'Something was wrong'
        toast.error(errMessage)
      }
    })
  }
  return (
    <div className='relative flex flex-col items-center justify-center h-screen'>
      {(isLoadingActive || isLoading) && <SectionLoading></SectionLoading>}
      {isSuccess && !isSuccessActive && (
        <form className='container max-w-[1000px]' onSubmit={handleSubmit(onSubmit)}>
          <div className='absolute inset-0 w-full h-full opacity-40 bg-gradient-to-b from-transparent via-primary-3 to-parent'></div>
          <div className='relative z-20 flex-grow w-full pt-10 mx-auto overflow-y-auto text-xl text-neutral-black no-scrollbar '>
            <h2 className='text-4xl font-medium text-center text-primary-1'>Complete Your Registration</h2>
            <div className='px-3 py-6 mt-8'>
              <div className='mb-6'>
                <div className='mb-6'>
                  <Label className='mb-[18px] block text-xl'>First name</Label>
                  <div className='relative w-full p-3 border rounded-lg border-primary-1'>
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
                <div className='mb-6'>
                  <Label className='mb-[18px] block text-xl'>Last name </Label>
                  <div className='relative w-full p-3 border rounded-lg border-primary-1'>
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
                <div className='mb-6'>
                  <Label className='mb-[18px] block text-xl'>Phone Number </Label>
                  <div className='relative w-full p-3 border rounded-lg border-primary-1'>
                    {/* Title input */}
                    <Controller
                      control={control}
                      name='phoneNumber'
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
            </div>
          </div>
          <Button
            type='submit'
            variant='custom'
            className='relative z-30 w-full mb-10 text-lg py-7'
            disabled={!isValid}
          >
            Complete
          </Button>
        </form>
      )}
      {isSuccessActive && <ConfirmSuccess></ConfirmSuccess>}
    </div>
  )
}
