import { Outlet } from 'react-router-dom'
import InfoTabs from './components/info-tabs'

export function InstructorProfile() {
 
  return (
    <>
      <div className='flex flex-col h-full'>
        <div className='flex-grow p-6 mt-4 overflow-y-auto bg-white rounded-xl no-scrollbar'>
          <InfoTabs></InfoTabs>
          <div className='mt-10'></div>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  )
}
