import React from 'react'

export default function Image(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='48' height='49' viewBox='0 0 48 49' fill='currentColor' {...props}>
      <g clipPath='url(#clip0_3287_8849)'>
        <path
          d='M38 10.3587V38.3587H10V10.3587H38ZM38 6.3587H10C7.8 6.3587 6 8.1587 6 10.3587V38.3587C6 40.5587 7.8 42.3587 10 42.3587H38C40.2 42.3587 42 40.5587 42 38.3587V10.3587C42 8.1587 40.2 6.3587 38 6.3587ZM28.28 24.0787L22.28 31.8187L18 26.6387L12 34.3587H36L28.28 24.0787Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_3287_8849'>
          <rect width='48' height='48' fill='currentColor' transform='translate(0 0.358704)' />
        </clipPath>
      </defs>
    </svg>
  )
}
