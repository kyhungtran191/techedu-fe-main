import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { formatCounterNumber } from '@/utils'
interface CounterProps {
  target: number
  name: string
}

const Counter: React.FC<CounterProps> = ({ target, name }) => {
  const [count, setCount] = useState<number>(0)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const counterRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const { number, text } = formatCounterNumber(target)
  useEffect(() => {
    if (isVisible) {
      const increment = Math.ceil(number / 100)
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount < number) {
            return Math.min(prevCount + increment, number)
          }
          clearInterval(interval)
          return prevCount
        })
      }, 50)
      return () => clearInterval(interval)
    }
  }, [isVisible, number])

  return (
    <div ref={counterRef} className='flex flex-col items-center justify-center w-full text-2xl font-bold'>
      {isVisible && (
        <>
          <div className='text-5xl font-medium text-white'>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {count}
            </motion.span>
            <span className='uppercase'>{text}</span>
          </div>
          <div className='mt-4 text-xl font-medium text-neutral-black'>{name}</div>
        </>
      )}
    </div>
  )
}

export default Counter
