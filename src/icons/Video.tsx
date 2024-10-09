import React from 'react'

export default function Video(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='25' viewBox='0 0 24 25' fill='currentColor' {...props}>
      <g clip-path='url(#clip0_2999_15479)'>
        <path
          d='M15 8.77441V16.7744H5V8.77441H15ZM16 6.77441H4C3.45 6.77441 3 7.22441 3 7.77441V17.7744C3 18.3244 3.45 18.7744 4 18.7744H16C16.55 18.7744 17 18.3244 17 17.7744V14.2744L21 18.2744V7.27441L17 11.2744V7.77441C17 7.22441 16.55 6.77441 16 6.77441Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_2999_15479'>
          <rect width='24' height='24' fill='currentColor' transform='translate(0 0.774414)' />
        </clipPath>
      </defs>
    </svg>
  )
}
