import { ResponsePrivateCourseDetail } from '@/@types/admin/courses.type'
import { TItemAddCart } from '@/@types/cart.type'
import SectionLoading from '@/components/Loading/SectionLoading'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/hooks/useAppContext'
import Certificate from '@/icons/CourseDetail/Certificate'
import Clock from '@/icons/CourseDetail/Clock'
import Document from '@/icons/CourseDetail/Document'
import FolderNLine from '@/icons/CourseDetail/FolderNLine'
import { AddItemToCart } from '@/services/client/cart.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ShortDetail({
  className,
  courseData
}: {
  className?: string
  courseData?: ResponsePrivateCourseDetail | null
}) {
  //
  const { cart, isAuthenticated } = useAppContext()
  const navigate = useNavigate()
  const [localIsHavingCourseCart, setLocalIsHavingCourseCart] = useState(false)

  const queryClient = useQueryClient()

  const addToCartMutation = useMutation({
    mutationFn: (item: TItemAddCart) => AddItemToCart(item),
    onSuccess: () => {
      setLocalIsHavingCourseCart(true)
      queryClient.invalidateQueries(['my-cart', isAuthenticated])
      toast.success('Add to Cart Successfully!')
    }
  })

  useEffect(() => {
    if (isAuthenticated && cart?.id && courseData) {
      const isCourseInCart = cart.items.some((item) => item.courseId === courseData.courseId)
      setLocalIsHavingCourseCart(isCourseInCart)
    }
  }, [cart, courseData, isAuthenticated])

  const handleCartService = () => {
    if (localIsHavingCourseCart) return navigate('/my-cart')
    else {
      if (courseData) {
        const itemAdd: TItemAddCart = {
          basketId: cart?.id as string,
          courseName: courseData?.courseLandingPage?.title,
          courseId: courseData?.courseId,
          currentPrice: {
            amount: courseData.price.amount,
            currency: courseData?.price.currency
          },
          instructorId: courseData?.instructor.userId,
          rating: courseData?.rating || 0,
          instructorName: `${courseData.instructor.firstName} ${courseData.instructor.lastName}`,
          level: courseData?.courseLandingPage.level,
          viewers: courseData?.viewers || 0,
          courseThumbnailFilePath: 'dqwdwqdwqdwqdwdqdqw'
        }
        addToCartMutation.mutate(itemAdd)
      }
    }
  }

  if (!courseData) return
  return (
    <div className={`${className} min-h-[300px] relative`}>
      {addToCartMutation.isLoading && <SectionLoading></SectionLoading>}
      <h3 className='mb-3 text-2xl font-medium'>Course Include</h3>
      <div>
        <div className='flex items-center mb-6'>
          <Clock className='text-neutral-black'></Clock>
          <span className='ml-[10px] font-medium'>{courseData?.totalVieoDuration} on-demand video</span>
        </div>
        <div className='flex items-center mb-6'>
          <Document className='text-neutral-black'></Document>
          <span className='ml-[10px] font-medium'>{courseData?.totalSectionItems} lessons</span>
        </div>
        <div className='flex items-center mb-6'>
          <FolderNLine className='text-neutral-black'></FolderNLine>
          <span className='ml-[10px] font-medium'>{courseData?.totalResources} downloadable resources</span>
        </div>
        <div className='flex items-center mb-6'>
          <Certificate className='text-neutral-black'></Certificate>
          <span className='ml-[10px] font-medium'>Completion certificate</span>
        </div>
      </div>
      <div className='flex items-center gap-x-3'>
        {/* <span className='text-2xl line-through text-neutral-silver-3'>${courseData?.price}</span> */}
        <span className='text-[32px]'>$ {courseData?.price?.amount}</span>
        {/* <div className='p-2 rounded-md bg-[#F30000] text-center text-white uppercase'>20% OFF</div> */}
      </div>
      <div className='flex items-center gap-x-[18px] my-[18px]'>
        <Button
          className='flex-1 px-4 !py-7 text-xl text-white bg-primary-1'
          variant={'custom'}
          onClick={handleCartService}
        >
          {localIsHavingCourseCart ? 'Go to Cart' : 'Add To Cart'}
        </Button>
        <div className=' flex items-center justify-center w-[60px] h-[60px] rounded-xl bg-white shadow-md cursor-pointer'>
          <Heart className=' text-primary-1'></Heart>
        </div>
      </div>
      <span className='text-sm underline'>Refund policy within 14 days</span>
    </div>
  )
}
