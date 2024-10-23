import { Link } from 'react-router-dom'
// import { IconChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { SideLink } from '@/data/sidelinks'
import useCheckActiveNav from '@/hooks/useCheckActiveNav'
import { buttonVariants } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

import { ChevronDown } from 'lucide-react'

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean
  links: SideLink[]
  closeNav: () => void
}

export default function Nav({ links, isCollapsed, className, closeNav }: NavProps) {
  const renderLink = ({ children, isHidden, ...rest }: SideLink) => {
    const key = `${rest.title}-${rest.href}`
    if (isHidden) return
    if (children)
      return <NavLinkDropdown isHidden={isHidden} {...rest} children={children} key={key} closeNav={closeNav} />

    return <NavLink isHidden={isHidden} {...rest} key={key} closeNav={closeNav} />
  }

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        'group border-b bg-background py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none',
        className
      )}
    >
      <TooltipProvider delayDuration={0}>
        <nav className='grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
          {links.map(renderLink)}
        </nav>
      </TooltipProvider>
    </div>
  )
}

interface NavLinkProps extends SideLink {
  subLink?: boolean
  closeNav: () => void
}

function NavLink({ isHidden, title, icon, label, href, closeNav, subLink = false }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav()
  return (
    <Link
      to={href}
      onClick={closeNav}
      className={cn(
        buttonVariants({
          variant: checkActiveNav(href) ? 'secondary' : 'ghost',
          size: 'sm'
        }),
        'h-12 justify-start text-wrap rounded-none px-6 ',
        subLink && 'h-10 w-full border-l border-l-slate-500 px-2'
      )}
      aria-current={checkActiveNav(href) ? 'page' : undefined}
    >
      <div className='mr-2'>{icon}</div>
      {title}
      {label && <div className='ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground'>{label}</div>}
    </Link>
  )
}

function NavLinkDropdown({ isHidden, title, icon, label, children, closeNav }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav()

  /* Open collapsible by default
   * if one of child element is active */
  const isChildActive = !!children?.find((s) => checkActiveNav(s.href))

  return (
    <Collapsible defaultOpen={isChildActive}>
      <CollapsibleTrigger
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'group h-12 w-full justify-start rounded-none px-6'
        )}
      >
        <div className='mr-2'>{icon}</div>
        {title}
        {label && (
          <div className='ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground'>{label}</div>
        )}
        <span className={cn('ml-auto transition-all group-data-[state="open"]:-rotate-180')}>
          <ChevronDown></ChevronDown>
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className='collapsibleDropdown' asChild>
        <ul>
          {children!.map((sublink) => {
            if (sublink.isHidden) return null
            return (
              <li key={sublink.title} className='my-1 ml-8'>
                <NavLink {...sublink} subLink closeNav={closeNav} />
              </li>
            )
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}
