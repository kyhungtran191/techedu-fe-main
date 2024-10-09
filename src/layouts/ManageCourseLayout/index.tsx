import React, { useState, ReactNode, ElementType } from 'react'
import DefaultHeader from './Header'
import DefaultSidebar from './Sidebar'
import { Link } from 'react-router-dom'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface IProps {
  children: React.ReactNode
  HeaderCustom?: ElementType | ElementType<HeaderProps>
  SidebarCustom?: ElementType<SidebarProps>
  isSideBar?: boolean
}
const ManageCourseLayout: React.FC<IProps> = ({ children, HeaderCustom, SidebarCustom, isSideBar = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const HeaderComponent = HeaderCustom || DefaultHeader
  const SidebarComponent = SidebarCustom || DefaultSidebar

  return (
    <div className=''>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className='flex h-screen overflow-hidden'>
        {/* <!-- ===== Sidebar Start ===== --> */}
        {isSideBar && SidebarComponent && (
          <SidebarComponent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}

        <div className='relative flex flex-col flex-1 overflow-y-hidden'>
          {HeaderComponent &&
            (HeaderCustom ? (
              // If HeaderCustom is a function component that accepts props, pass them
              <HeaderComponent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            ) : (
              <HeaderComponent />
            ))}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className='py-4 px-2 h-[calc(100vh-96px)]'>
            <div className='px-2 sm:px-4 py-3 sm:py-[18px] bg-neutral-silver-1 rounded-[20px] h-full'>
              <div className='rounded-[20px] h-full '>{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ManageCourseLayout
