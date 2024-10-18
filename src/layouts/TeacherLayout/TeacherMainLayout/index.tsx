import React, { useState, useEffect } from 'react'
import DefaultHeader from './Header'
import DefaultSidebar from './Sidebar'
import { useLocation } from 'react-router-dom'

interface IProps {
  children: React.ReactNode

  isSideBar?: boolean
}
const TeacherMainLayout: React.FC<IProps> = ({ children, isSideBar = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const HeaderComponent = DefaultHeader
  const SidebarComponent = DefaultSidebar

  const location = useLocation()

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  return (
    <div className='relative'>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className='flex h-screen overflow-hidden'>
        {/* <!-- ===== Sidebar Start ===== --> */}

        <SidebarComponent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className='relative flex flex-col flex-1 overflow-y-auto'>
          <HeaderComponent sidebarOpen={sidebarOpen} setSidebarOpen={(value: boolean) => setSidebarOpen(value)} />

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className='py-4 px-2 h-[calc(100vh-96px)]'>
            <div className='px-2 py-3 sm:px-4 sm:py-[18px] bg-neutral-silver-1 rounded-[20px] h-full'>
              <div className='rounded-[20px] h-full '>{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default TeacherMainLayout