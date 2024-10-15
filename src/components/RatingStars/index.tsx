import React from 'react'
import Star from '@/assets/star_filter.png'
type IProps = {
  count: number
  wrapperClass?: string
  customStar?: string
}
export default function RatingStars({ count, wrapperClass, customStar }: IProps) {
  return (
    <div className={`flex items-center gap-x-3 ${wrapperClass}`}>
      {Array(count)
        .fill(0)
        .map((item) => (
          <img src={Star} alt='star_filter' className={`object-cover w-4 h-4 ms:w-6 ms:h-6 ${customStar}`} />
        ))}
    </div>
  )
}
