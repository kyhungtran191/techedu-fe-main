import { NavLink, useLocation } from 'react-router-dom'

const InfoTabs = () => {
  const location = useLocation() // Lấy URL hiện tại
  const tabs = [
    { path: '/teacher/profile/basic-info', label: 'TechEdu profile' },
    { path: '/teacher/profile/photo', label: 'Profile picture' },
    { path: '/teacher/profile/privacy', label: 'Privacy settings' }
  ]

  const activeTabIndex = tabs.findIndex((tab) => tab.path === location.pathname)

  return (
    <div className='relative'>
      {/* Tabs */}
      <div className='flex space-x-8'>
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) => `text-xl ${isActive ? 'text-black font-bold' : 'text-gray-500'}`}
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
      <div className='relative mt-2'>
        <div className='w-full h-[2px] bg-gray-300 absolute'></div>
        <div
          className='h-[2px] bg-black absolute transition-all duration-300'
          style={{
            width: `${30 / tabs.length}%`,
            transform: `${activeTabIndex > 0 ? `translateX(${activeTabIndex * 100 + 5}%)` : `translateX(${activeTabIndex * 100}%)`}`
          }}
        ></div>
      </div>
    </div>
  )
}

export default InfoTabs
