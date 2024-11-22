import { SectionItem } from '@/@types/instructor/course/curriculumn'
import { COURSE_TYPE } from '@/constants/course'
import Play from '@/icons/Play'
import React, { useState } from 'react'
import ReactPlayer from 'react-player'

type TProps = {
  currentItem: SectionItem | undefined
}
export default function ContentLearningSpace({ currentItem }: TProps) {
  const [playing, setPlaying] = useState(false)
  if (!currentItem) return
  const togglePlaying = () => {
    setPlaying(!playing)
  }

  return (

      <div className='relative w-full height-video'>
        {currentItem.primaryAsset.type === COURSE_TYPE.ARTICLE && (
          <div
            className='h-full p-10 overflow-y-auto border-b shadow-custom-shadow no-scrollbar'
            dangerouslySetInnerHTML={{ __html: currentItem.primaryAsset.body ?? '' }}
          ></div>
        )}
        {currentItem.primaryAsset.type === COURSE_TYPE.VIDEO && (
          <>
            <ReactPlayer
              playing={playing}
              controls={true}
              url={currentItem.primaryAsset.fileUrl}
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
                <Play fill='#666666' color='none' className='z-20 w-8 h-8 text-black' />
              </div>
            </div>
          </>
        )}
      </div>
    
  )
}
