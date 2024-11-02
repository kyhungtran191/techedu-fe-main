export default function GlobalLoading() {
  return (
    <div className='fixed !inset-0 z-[999999] h-full bg-white/60 flex items-center justify-center flex-col'>
      <div className='w-10 h-10 border-4 rounded-full border-primary-1 animate-spin border-t-transparent'></div>
    </div>
  )
}
