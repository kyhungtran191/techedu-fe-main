import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import useInstructorSetup from '@/hooks/useInstructorSetup'
import Navigate from '@/icons/Navigate'
import { yupResolver } from '@hookform/resolvers/yup'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import Language from '@/icons/CourseDetail/Language'
import Stripe from '@/assets/stripe.png'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'

export default function Screen4() {
  const { instructorData, setStep, setLocalStorageData, setInstructorData, handleExit } = useInstructorSetup()

  type FormData = {
    country: string
    payment: string
    tax: string
  }

  const schema = yup.object().shape({
    country: yup.string().required('Country is required'),
    payment: yup.string().required('Payment method is required'),
    tax: yup.string().required('Tax status is required')
  })

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty, isValid }
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      country: instructorData.country || '',
      payment: instructorData.payment || '',
      tax: ''
    }
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  const paymentValue = watch('payment')
  const taxValue = watch('tax')
  const languageValue = watch('country')
  console.log(paymentValue, taxValue, languageValue)
  console.log(isValid)

  return (
    <form className='flex flex-col h-full' onSubmit={handleSubmit(onSubmit)}>
      <div className='absolute inset-0 w-full h-full opacity-40 bg-gradient-to-b from-transparent via-primary-3 to-parent'></div>
      <div
        className='relative z-20 flex-grow pt-10 overflow-y-auto text-xl text-neutral-black no-scrollbar
      w-full max-w-[1008px] mx-auto
      '
      >
        <h2 className='text-4xl font-medium text-center text-primary-1'>Verify your payment and tax details</h2>
        <div className='px-3 py-6 mt-8 text-xl'>
          {/* Country Selection */}
          <div className='mb-9'>
            <Label className='block mb-6 text-xl'>Country</Label>
            <Controller
              control={control}
              name='country'
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className='flex items-center px-8 py-7 text-xl rounded-lg w-fit mt-[18px] min-w-[306px] focus:outline-none border-neutral-black'>
                    <Language />
                    <SelectValue placeholder='Select Language' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='vietnam' className='!px-8 py-3 text-xl font-medium border-b'>
                      Viet Nam
                    </SelectItem>
                    <SelectItem value='american' className='!px-8 py-3 text-xl font-medium border-b'>
                      American
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.country && <p style={{ color: 'red' }}>{errors.country.message}</p>}
          </div>

          {/* Payment Method */}
          <div className='mb-9'>
            <Label className='mb-[18px] block text-xl'>Payment method</Label>
            <Controller
              control={control}
              name='payment'
              render={({ field }) => (
                <RadioGroup value={field.value} onValueChange={(value) => field.onChange(value)}>
                  <div className='flex items-center border border-neutral-silver-3 py-[18px] px-8 rounded-lg justify-between'>
                    <div className='flex items-center'>
                      <RadioGroupItem
                        value='stripe'
                        checked={field.value === 'stripe'}
                        onChange={() => field.onChange('stripe')}
                        className='w-6 h-6 border rounded-full border-primary-2'
                      />
                      <Label className='ml-5 text-xl'>Stripe</Label>
                    </div>
                    <div className='flex p-2 border rounded-lg border-neutral-silver-3'>
                      <img src={Stripe} alt='Stripe' className='w-[80px] h-auto rounded-xl' />
                    </div>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.payment && <p style={{ color: 'red' }}>{errors.payment.message}</p>}
          </div>

          {/* Withholding with Tax Status */}
          <div className='mb-9'>
            <Label className='mb-[18px] block text-xl'>Withholding with tax status</Label>
            <div className='flex items-start p-3 mb-6 font-medium text-neutral-black'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='25'
                height='25'
                viewBox='0 0 25 25'
                fill='none'
                className='mr-[18px] flex-shrink-0 text-neutral-black'
              >
                <g clipPath='url(#clip0_3294_8371)'>
                  <path
                    d='M11.5 7.79688H13.5V9.79688H11.5V7.79688ZM11.5 11.7969H13.5V17.7969H11.5V11.7969ZM12.5 2.79688C6.98 2.79688 2.5 7.27688 2.5 12.7969C2.5 18.3169 6.98 22.7969 12.5 22.7969C18.02 22.7969 22.5 18.3169 22.5 12.7969C22.5 7.27688 18.02 2.79688 12.5 2.79688ZM12.5 20.7969C8.09 20.7969 4.5 17.2069 4.5 12.7969C4.5 8.38688 8.09 4.79688 12.5 4.79688C16.91 4.79688 20.5 8.38688 20.5 12.7969C20.5 17.2069 16.91 20.7969 12.5 20.7969Z'
                    fill='currentColor'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_3294_8371'>
                    <rect width='24' height='24' fill='white' transform='translate(0.5 0.796875)' />
                  </clipPath>
                </defs>
              </svg>
              <div className='text-[18px]'>
                <div>To become a premium instructor, you'll need to link your payment method</div>
                <div className='mt-3 font-light'>
                  When you earn revenue on TechEdu, you'll be prompted to submit tax documentation.
                  <span className='underline text-primary-1'> Learn more about tax withholding</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Form */}
          <div className='mb-9'>
            <Label className='mb-[18px] block text-xl'>Tax form</Label>
            <Controller
              control={control}
              name='tax'
              render={({ field }) => (
                <RadioGroup value={field.value} onValueChange={(value) => field.onChange(value)}>
                  <div className='flex items-center border border-neutral-silver-3 py-[18px] px-8 rounded-lg justify-between mb-6'>
                    <div className='flex items-center'>
                      <RadioGroupItem
                        value='paper-tax'
                        checked={field.value === 'paper-tax'}
                        onChange={() => field.onChange('paper-tax')}
                        className='w-6 h-6 border rounded-full border-primary-2'
                      />
                      <Label className='ml-5 text-xl'>Paper Delivery</Label>
                    </div>
                  </div>
                  <div className='flex items-center border border-neutral-silver-3 py-[18px] px-8 rounded-lg justify-between'>
                    <div className='flex items-start'>
                      <RadioGroupItem
                        value='e-tax'
                        checked={field.value === 'e-tax'}
                        onChange={() => field.onChange('e-tax')}
                        className='w-6 h-6 border rounded-full border-primary-2'
                      />
                      <Label className='ml-5 text-xl'>
                        <span>E - Delivery</span>
                        <div className='mt-3 font-light'>
                          By opting in to e-delivery, you acknowledge that you’re read and agree to the{' '}
                          <span className='font-medium underline text-primary-1'>Electronic Delivery Agreement</span>.
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.tax && <p style={{ color: 'red' }}>{errors.tax.message}</p>}
          </div>
        </div>
      </div>

      {/* Navigation and Submit Button */}
      <div className='z-10 flex items-center justify-between w-full py-8 mt-auto bg-white p container-fluid'>
        <div className='flex items-center cursor-pointer' onClick={() => setStep((step) => step - 1)}>
          <Navigate />
          <span className='ml-[10px] text-neutral-black'>Previous</span>
        </div>
        <Button
          type='submit'
          className={`${
            !isValid
              ? 'bg-neutral-silver-3 pointer-events-none cursor-not-allowed'
              : 'bg-primary-1 cursor-pointer pointer-events-auto'
          }`}
        >
          Complete
        </Button>
      </div>
    </form>
  )
}
