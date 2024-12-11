import Logo from '@/assets/logo.png'
export default function GlobalLoading() {
  return (
    <div className='fixed !inset-0 z-50 h-full bg-white flex items-center justify-center flex-col'>
      <img src={Logo} alt='' />
      <div className='w-10 h-10 border-4 rounded-full border-primary-1 animate-spin border-t-transparent'></div>
    </div>
  )
}
