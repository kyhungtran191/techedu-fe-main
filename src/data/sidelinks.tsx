import { BookA, KeyRound, LayoutDashboard, MessageCircle, Settings, UserCog, UserRound, UsersRound } from 'lucide-react'

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
    title: 'Role',
    label: '3',
    href: '/admin/role',
    icon: <KeyRound />
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
