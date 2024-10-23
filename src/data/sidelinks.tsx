import { APP_PERMISSIONS } from '@/constants/permissions'
import {
  BookA,
  ChartBarStacked,
  Contact,
  KeyRound,
  LayoutDashboard,
  MessageCircle,
  Settings,
  UserCog,
  UserRound,
  UserRoundCheck,
  UsersRound
} from 'lucide-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon?: JSX.Element
  permission: string
  isHidden: boolean
}

export interface SideLink extends NavLink {
  children?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/admin/dashboard',
    icon: <LayoutDashboard />,
    permission: APP_PERMISSIONS.DASHBOARD.VIEW as string,
    isHidden: false
  },
  {
    title: 'Courses',
    href: '/admin/courses',
    icon: <BookA />,
    permission: APP_PERMISSIONS.COURSES.VIEW as string,
    isHidden: false
  },
  {
    title: 'Category',
    href: '/admin/categories',
    icon: <ChartBarStacked></ChartBarStacked>,
    permission: APP_PERMISSIONS.CATEGORY.VIEW as string,
    isHidden: false
  },
  {
    title: 'Role',
    href: '/admin/role',
    icon: <KeyRound />,
    permission: APP_PERMISSIONS.ROLE.VIEW as string,
    isHidden: false
  },
  {
    title: 'Private Users',
    href: '/admin/private-users',
    icon: <Contact />,
    permission: APP_PERMISSIONS.PRIVATE_USER.VIEW as string,
    isHidden: false
  },
  {
    title: 'Accounts',
    href: '/admin/accounts',
    icon: <UserRoundCheck />,
    permission: APP_PERMISSIONS.ACCOUNTS.VIEW as string,
    isHidden: false
  },
  {
    title: 'Clients',
    label: '',
    href: '',
    icon: <UserCog />,
    permission: '',
    isHidden: false,
    children: [
      {
        title: 'Instructors',
        label: '',
        isHidden: false,
        permission: APP_PERMISSIONS.INSTRUCTORS.VIEW as string,
        href: '/admin/instructors',
        icon: <UserRound />
      },
      {
        title: 'Students',
        label: '',
        isHidden: false,
        permission: APP_PERMISSIONS.STUDENT.VIEW as string,
        href: '/admin/students',
        icon: <UsersRound />
      }
    ]
  },
  {
    title: 'Chats',
    label: '9',
    href: '/admin/chats',
    icon: <MessageCircle />,
    permission: '',
    isHidden: false
  },
  {
    title: 'Settings',
    label: '',
    href: '/analysis',
    icon: <Settings />,
    permission: '',
    isHidden: false
  }
]
