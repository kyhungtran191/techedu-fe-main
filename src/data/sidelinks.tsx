// import {
//   IconApps,
//   IconBarrierBlock,
//   IconBoxSeam,
//   IconChartHistogram,
//   IconChecklist,
//   IconComponents,
//   IconError404,
//   IconExclamationCircle,
//   IconHexagonNumber1,
//   IconHexagonNumber2,
//   IconHexagonNumber3,
//   IconHexagonNumber4,
//   IconHexagonNumber5,
//   IconLayoutDashboard,
//   IconMessages,
//   IconRouteAltLeft,
//   IconServerOff,
//   IconSettings,
//   IconTruck,
//   IconUserShield,
//   IconUsers,
//   IconLock
// } from 'lucide-react'

import { BookA, LayoutDashboard, MessageCircle, Settings, UserCog, UserRound, UsersRound } from 'lucide-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon?: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/admin/dashboard',
    icon: <LayoutDashboard />
  },
  {
    title: 'Courses',
    label: '3',
    href: '/admin/courses',
    icon: <BookA />
  },
  {
    title: 'Chats',
    label: '9',
    href: '/admin/chats',
    icon: <MessageCircle />
  },

  {
    title: 'Users',
    label: '',
    href: '/users',
    icon: <UserCog />,
    sub: [
      {
        title: 'Teacher',
        label: '',
        href: '/teacher',
        icon: <UserRound />
      },
      {
        title: 'Students',
        label: '',
        href: '/students',
        icon: <UsersRound />
      }
    ]
  },
  {
    title: 'Settings',
    label: '',
    href: '/analysis',
    icon: <Settings />
  }
]
