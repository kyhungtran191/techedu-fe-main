import React from 'react'

export default function Drag(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='36' height='37' viewBox='0 0 36 37' fill='none' {...props}>
      <g clipPath='url(#clip0_2848_2216)'>
        <path d='M30 14H6V17H30V14ZM6 23H30V20H6V23Z' fill='currentColor' />
      </g>
      <defs>
        <clipPath id='clip0_2848_2216'>
          <rect width='36' height='36' fill='currentColor' transform='translate(0 0.5)' />
        </clipPath>
      </defs>
    </svg>
  )
}
