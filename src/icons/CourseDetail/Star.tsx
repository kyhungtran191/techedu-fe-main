import React from 'react'

export default function Star(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 25 24' fill='currentColor' {...props}>
      <g clipPath='url(#clip0_2205_1160)'>
        <path
          d='M22.5 9.24L15.31 8.62L12.5 2L9.69 8.63L2.5 9.24L7.96 13.97L6.32 21L12.5 17.27L18.68 21L17.05 13.97L22.5 9.24ZM12.5 15.4L8.74 17.67L9.74 13.39L6.42 10.51L10.8 10.13L12.5 6.1L14.21 10.14L18.59 10.52L15.27 13.4L16.27 17.68L12.5 15.4Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_2205_1160'>
          <rect width='24' height='24' fill='currentColor' transform='translate(0.5)' />
        </clipPath>
      </defs>
    </svg>
  )
}
