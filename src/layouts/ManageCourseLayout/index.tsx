import React, { useState, ReactNode, ElementType, useEffect } from 'react'
import DefaultHeader from './Header'
import DefaultSidebar from './Sidebar'
import useResize from '@/hooks/useResize'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { MessageCircleWarning } from 'lucide-react'

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
  const [alert, setAlert] = useState(false)
  const [width, height] = useResize()
  useEffect(() => {
    if (width && width < 864) {
      setAlert(true)
    } else {
      setAlert(false)
    }
  }, [width])

  console.log(width)
  console.log('first', alert)

  return (
    <div className=''>
      <div
        className={`fixed inset-0 text-white z-50 bg-black ${alert ? 'block' : 'hidden'} h-full flex items-center justify-center`}
      >
        <Alert className='max-w-[70vw] bg-black text-white border-black'>
          <MessageCircleWarning className='block w-6 h-6 fill-white' />
          <AlertTitle>Notice that!</AlertTitle>
          <AlertDescription className='mt-3'>
            We only support create course process for device larger than 864px
          </AlertDescription>
        </Alert>
      </div>
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
              <HeaderComponent sidebarOpen={sidebarOpen} setSidebarOpen={(value: boolean) => setSidebarOpen(value)} />
            ) : (
              <HeaderComponent sidebarOpen={sidebarOpen} setSidebarOpen={(value: boolean) => setSidebarOpen(value)} />
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
