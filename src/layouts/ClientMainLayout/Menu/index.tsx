import React from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger
} from '@/components/ui/menubar'
import Navigate from '@/icons/Navigate'
import { Link } from 'react-router-dom'

interface IProps {
  className?: string
}
export default function CategoriesMenu({ className }: IProps) {
  return (
    <Menubar className={`border-none ${className}`}>
      <MenubarMenu>
        <MenubarTrigger className='bg-transparent cursor-pointer text-[18px] text-primary-1 '>
          Categories
        </MenubarTrigger>
        <MenubarContent className='flex items-start p-0 gap-x-3 '>
          <div className='py-[18px] px-3 rounded-xl w-[242px]'>
            <Menubar className='p-0 mb-6 border-none'>
              <MenubarMenu>
                <MenubarTrigger className='bg-transparent cursor-pointer text-[18px] text-neutral-black p-0 flex items-center justify-between w-full'>
                  <span>Categories</span>
                  <Navigate className='rotate-180'></Navigate>
                </MenubarTrigger>
                <MenubarContent side='right' sideOffset={18} alignOffset={-26} className='!p-0'>
                  <div className='py-[18px] px-3 rounded-xl min-w-[242px]'>
                    <Menubar className='border-none'>
                      <MenubarMenu>
                        <MenubarTrigger className='bg-transparent cursor-pointer text-sm xl:text-[18px] text-neutral-black p-0 flex items-center justify-between w-full'>
                          <span>Categories</span>
                          <Navigate className='rotate-180'></Navigate>
                        </MenubarTrigger>
                        <MenubarContent side='right' sideOffset={22} alignOffset={-26} className='!p-0 shadow-lg'>
                          <div className='py-[18px] px-3 rounded-xl min-w-[242px]'>
                            <h3 className='font-medium text-neutral-black'>Popular topic</h3>
                            <div className='flex flex-col mb-[18px]'>
                              <Link
                                to=''
                                className='mt-6 py-[8px] px-3 rounded-lg text-center text-primary-1 border w-fit border-primary-1 min-w-[50%]'
                              >
                                1
                              </Link>
                              <Link
                                to=''
                                className='mt-6 py-[8px] px-3 rounded-lg text-center text-primary-1 border w-fit border-primary-1 min-w-[50%]'
                              >
                                1
                              </Link>
                              <Link
                                to=''
                                className='mt-6 py-[8px] px-3 rounded-lg text-center text-primary-1 border w-fit border-primary-1 min-w-[50%]'
                              >
                                1
                              </Link>
                            </div>
                          </div>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </div>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <Menubar className='p-0 mb-6 border-none'>
              <MenubarMenu>
                <MenubarTrigger className='bg-transparent cursor-pointer text-[18px] text-neutral-black p-0 flex items-center justify-between w-full'>
                  <span>Categories</span>
                  <Navigate className='rotate-180'></Navigate>
                </MenubarTrigger>
                <MenubarContent side='right' sideOffset={18} alignOffset={-26} className='!p-0'>
                  <div className='py-[18px] px-3 rounded-xl min-w-[242px]'>
                    <Menubar className='border-none'>
                      <MenubarMenu>
                        <MenubarTrigger className='bg-transparent cursor-pointer text-sm xl:text-[18px] text-neutral-black p-0 flex items-center justify-between w-full'>
                          <span>Categories</span>
                          <Navigate className='rotate-180'></Navigate>
                        </MenubarTrigger>
                        <MenubarContent side='right' sideOffset={22} alignOffset={-26} className='!p-0 shadow-lg'>
                          <div className='py-[18px] px-3 rounded-xl min-w-[242px]'>
                            <h3 className='font-medium text-neutral-black'>Popular topic</h3>
                            <div className='flex flex-col mb-[18px]'>
                              <Link
                                to=''
                                className='mt-6 py-[8px] px-3 rounded-lg text-center text-primary-1 border w-fit border-primary-1 min-w-[50%]'
                              >
                                1
                              </Link>
                              <Link
                                to=''
                                className='mt-6 py-[8px] px-3 rounded-lg text-center text-primary-1 border w-fit border-primary-1 min-w-[50%]'
                              >
                                1
                              </Link>
                              <Link
                                to=''
                                className='mt-6 py-[8px] px-3 rounded-lg text-center text-primary-1 border w-fit border-primary-1 min-w-[50%]'
                              >
                                1
                              </Link>
                            </div>
                          </div>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </div>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
