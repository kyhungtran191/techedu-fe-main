import { useLocation } from 'react-router-dom'

export default function useCheckActiveNav() {
  const { pathname } = useLocation()
  const checkActiveNav = (nav: string) => {
    console.log('nav', nav)
    const pathArray = pathname.split('/').filter((item) => item !== '')
    return pathArray.includes(nav.replace(/^.*\//, ''))
  }

  return { checkActiveNav }
}
