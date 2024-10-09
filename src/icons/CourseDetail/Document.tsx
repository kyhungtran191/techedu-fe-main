import React from 'react'

export default function Document(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 25 25' fill='currentColor' {...props}>
      <path
        d='M19.5 5.26807V19.2681H5.5V5.26807H19.5ZM19.5 3.26807H5.5C4.4 3.26807 3.5 4.16807 3.5 5.26807V19.2681C3.5 20.3681 4.4 21.2681 5.5 21.2681H19.5C20.6 21.2681 21.5 20.3681 21.5 19.2681V5.26807C21.5 4.16807 20.6 3.26807 19.5 3.26807Z'
        fill='currentColor'
      />
      <path
        d='M14.5 17.2681H7.5V15.2681H14.5V17.2681ZM17.5 13.2681H7.5V11.2681H17.5V13.2681ZM17.5 9.26807H7.5V7.26807H17.5V9.26807Z'
        fill='currentColor'
      />
    </svg>
  )
}
