import { useEffect, useRef, useState } from 'react'

interface IProps {
  lineclamp?: number
  height?: string
  wrapperClass?: string
  content?: string
}
export default function Description({ lineclamp = 3, height = '75px', wrapperClass = '', content }: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showReadMoreButton, setShowReadMoreButton] = useState(false)

  const refText = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (refText.current) {
      setShowReadMoreButton(refText.current.scrollHeight !== refText.current.clientHeight)
    }
  }, [])

  return (
    <div className={wrapperClass}>
      <div className={`${isOpen ? `h-auto` : `line-clamp-${lineclamp}  h-[${height}]`}`} ref={refText}>
        {content
          ? content
          : ` nt vel! Fugit? Animi, doloribus autem rerum placeat expedita tempora nobis
        tenetur sint amet sed optio i  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem esse, consequatur delectus sequi est quisquam.
        Animi, doloribus autem rerum placeat expedita tempora nobis tenetur sint amet sed optio id quisquam. simos
        incidunt odit sed saepe illo laudantium quae obcaecati reprehenderit provident vel! Fugit? Animi, doloribus
        autem rerum placeat expedita tempora nobis tenetur sint amet sed optio id quisquam. simos incidunt odit sed
        saepe illo laudantium quae obcaecati reprehenderit provident vel! Fugit?Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Dolorem esse, consequatur delectus sequi est quisquam. Animi, doloribus autem rerum placeat
        expedita tempora nobis tenetur sint amet sed optio id quisquam. simos incidunt odit sed saepe illo laudantium
        quae obcaecati reprehenderit provide`}
      </div>
      {showReadMoreButton && (
        <div className='underline text-primary-1' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'See less' : 'See more'}
        </div>
      )}
    </div>
  )
}
