import React from 'react'
import Logo from '@/assets/logo.png'
import { Link } from 'react-router-dom'
interface IOptions {
  header: string
  children: { title: string; link: string }[]
}
export default function Footer() {
  const options: IOptions[] = [
    {
      header: 'Business',
      children: [
        { link: '', title: 'Become a teacher' },
        { link: '', title: 'Download the application' },
        { link: '', title: 'About us' },
        { link: '', title: 'Contact us' }
      ]
    },
    {
      header: 'Support',
      children: [
        { link: '', title: 'Help' },
        { link: '', title: 'Blog' },
        { link: '', title: 'Career' },
        { link: '', title: 'Investors' }
      ]
    },
    {
      header: 'Terms',
      children: [
        { link: '', title: 'Privacy policy' },
        { link: '', title: 'Cookie setting' },
        { link: '', title: 'Sitemap' },
        { link: '', title: 'Accessibility statement' }
      ]
    }
  ]
  return (
    <div className='flex items-start w-full  p-12 text-white bg-neutral-black min-h-[400px] justify-between'>
      <img srcSet={`${Logo} 2x`} alt='' className='h-[52px] w-[196px] flex-shrink-0 object-cover' />
      <div className='flex-1 '>
        <div className='flex flex-wrap items-start justify-around'>
          {options.map((item, index) => (
            <div>
              <h3 className='text-2xl font-medium'>{item.header}</h3>
              <div className='mt-8 text-xl'>
                {item.children.map((item) => (
                  <Link to={item.link} className='block mb-6'>
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {/* Select Language */}
          <div></div>
        </div>
        <div className='text-right text-[18px]'>ⓒ 2024 UntitledUI, Inc.</div>
      </div>
    </div>
  )
}
