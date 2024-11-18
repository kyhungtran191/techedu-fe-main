import { Heart, Play } from 'lucide-react'
import React, { useState } from 'react'
import ReactPlayer from 'react-player'

// Swiper
import 'swiper/css'
import ListContent from './CourseLearningSpace/components/ListContent'
import { Link, useNavigate } from 'react-router-dom'
import Navigate from '@/icons/Navigate'

export default function PreviewDraft() {
  const [playing, setPlaying] = useState(false)

  // Toggle Playing Button
  const togglePlaying = () => {
    setPlaying(!playing)
  }

  const navigate = useNavigate()
  return (
    <>
      <div className='w-full transition-all duration-300 ease-in-out flex items-center justify-between h-[76px] text-black container-fluid z-50 relative'>
        <h1 className='text-3xl font-semibold'>Preview Course</h1>
        <div className='flex-1 text-2xl font-semibold text-center'>Course Name Of User</div>
        <div onClick={() => navigate(-1)} className='flex items-center gap-2 cursor-pointer'>
          <Navigate></Navigate>
          Back
        </div>
      </div>
      <div className='container-fluid relative z-0 grid h-full grid-cols-1 lg:grid-cols-[1fr_363px] gap-x-5 py-5'>
        <div className='relative w-full h-full overflow-y-auto bg-white rounded-xl no-scrollbar'>
          <div className='relative w-full height-video'>
            <ReactPlayer
              playing={playing}
              controls={true}
              url={`https://res.cloudinary.com/demo/video/upload/fl_splice,l_video:cld_opener_preroll_sd,so_0/what_is_cloudinary_sd.mp4`}
              onProgress={(data) => {}}
              width='100%'
              height='100%'
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            ></ReactPlayer>
            <div
              className={`absolute -translate-x-1/2 -translate-y-1/2 bg-black top-1/2 left-1/2 w-[70px] h-[70px] rounded-3xl p-[10px] bg-[rgba(50, 50, 50, 0.50)] bg-opacity-20 ${playing ? 'hidden' : 'flex'} items-center justify-center`}
            >
              <div
                className='w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center  cursor-pointer'
                onClick={togglePlaying}
              >
                <Play fill='#666666' color='none' className='w-8 h-8' />
              </div>
            </div>
          </div>
          <div className='block w-full h-full py-3 overflow-y-auto bg-white lg:hidden no-scrollbar rounded-xl'>
            <ListContent></ListContent>
          </div>
        </div>
        <div className='hidden w-full h-full py-3 overflow-y-auto bg-white lg:block no-scrollbar rounded-xl'>
          <ListContent></ListContent>
        </div>
      </div>
    </>
  )
}
