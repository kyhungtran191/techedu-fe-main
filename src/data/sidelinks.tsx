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
    href: '/admin/courses',
    icon: <BookA />
  },
  {
    title: 'Category',
    href: '/admin/categories',
    icon: <ChartBarStacked></ChartBarStacked>
  },
  {
    title: 'Role',
    href: '/admin/role',
    icon: <KeyRound />
  },
  {
    title: 'Private Users',
    href: '/admin/private-users',
    icon: <Contact />
  },
  {
    title: 'Accounts',
    href: '/admin/accounts',
    icon: <UserRoundCheck />
  },
  {
    title: 'Clients',
    label: '',
    href: '',
    icon: <UserCog />,
    sub: [
      {
        title: 'Instructors',
        label: '',
        href: '/admin/instructors',
        icon: <UserRound />
      },
      {
        title: 'Students',
        label: '',
        href: '/admin/students',
        icon: <UsersRound />
      }
    ]
  },
  {
    title: 'Chats',
    label: '9',
    href: '/admin/chats',
    icon: <MessageCircle />
  },
  {
    title: 'Settings',
    label: '',
    href: '/analysis',
    icon: <Settings />
  }
]
