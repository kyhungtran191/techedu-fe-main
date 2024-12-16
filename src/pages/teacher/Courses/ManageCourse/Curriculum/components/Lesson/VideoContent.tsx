import React, { useEffect, useRef, useState } from 'react'
import UploadStatus from '../VideoUpload/UploadStatus'
import VideoUpload from '../VideoUpload'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PrimaryAsset } from '@/@types/instructor/course/curriculumn'
import { getAssets, UpdateContentVideo } from '@/services/instructor/manage/curriculumn.service'
import { FILE_CHUNK_SIZE } from '@/constants'
import DraftVideo from '@/assets/placeholder.jpg'
import { Link } from 'react-router-dom'
interface IVideoContentSectionItem {
  isAddNewContent: boolean
  isAddFromLibrary: boolean
  primaryAsset: PrimaryAsset
  courseId: string
  sectionId: number
  sectionItemId: number
  setIsAddNewContent: React.Dispatch<React.SetStateAction<boolean>>
  onUpdatePrimaryAsset: (updatedAsset: PrimaryAsset) => void
}
export default function VideoContent({
  isAddFromLibrary,
  isAddNewContent,
  primaryAsset,
  courseId,
  sectionId,
  sectionItemId,
  onUpdatePrimaryAsset
}: IVideoContentSectionItem) {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const abortControllerRef = useRef<AbortController[]>([])

  const uploadChunk = async (chunk: File, chunkIndex: number, totalChunks: number, fileId?: string) => {
    const formData = new FormData()
    if (fileId) {
      formData.append('fileId', fileId)
    }
    formData.append('file', chunk)
    formData.append('chunkIndex', chunkIndex.toString())
    formData.append('totalChunks', totalChunks.toString())
    formData.append('courseId', courseId)
    formData.append('sectionId', sectionId.toString())
    formData.append('sectionItemId', sectionItemId.toString())
    try {
      return await UpdateContentVideo(formData)
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        console.log(`Chunk ${chunkIndex + 1} upload aborted`)
      } else {
        console.error(`Error uploading chunk ${chunkIndex + 1}:`, error)
      }
    }
  }

  useEffect(() => {
    handleUpload()
  }, [file])

  const shouldRenderVideoUpload =
    isEdit || (isAddNewContent && !isLoading && !primaryAsset?.fileUrl && primaryAsset?.status == 'Initial')

  const handleUpload = async () => {
    if (!file) return

    const totalChunks = Math.ceil(file.size / FILE_CHUNK_SIZE)

    let responseFileId = ''

    setIsLoading(true)

    if (totalChunks === 1) {
      await uploadChunk(file, 0, totalChunks)
        .then(async (data) => {
          const res = await getAssets(courseId, sectionId, sectionItemId)
          if (res && res.data && res?.data?.value) {
            onUpdatePrimaryAsset({ ...primaryAsset, title: file.name, status: 'Processing' })
          }
          setIsEdit(false)
          setIsLoading(false)
        })
        .catch((err) => {
          setIsEdit(false)
          setIsLoading(false)
        })
    } else {
      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const controller = new AbortController()

        const start = chunkIndex * FILE_CHUNK_SIZE

        const end = Math.min(start + FILE_CHUNK_SIZE, file.size)

        const chunkBlob = file.slice(start, end)

        const chunk = new File([chunkBlob], file.name)

        const percentCompleted = Math.round((chunkIndex / totalChunks) * 100)

        setProgress(percentCompleted)

        await uploadChunk(chunk, chunkIndex, totalChunks, responseFileId)
          .then(async (data) => {
            // First Chunk file
            if (chunkIndex == 0) {
              if (data && data?.data?.value && data?.data?.value?.fileId) {
                responseFileId = data?.data?.value?.fileId
              }
            }
            // Done
            if (chunkIndex === totalChunks - 1) {
              const res = await getAssets(courseId, sectionId, sectionItemId)
              if (res && res.data && res?.data?.value) {
                console.log(res?.data?.value[0])
                onUpdatePrimaryAsset(res?.data?.value[0] as PrimaryAsset)
              }
              setIsEdit(false)
              setIsLoading(false)
            }
          })
          .catch((error) => {
            setIsEdit(false)
            setIsLoading(false)
            console.error(`Error uploading chunk ${chunkIndex + 1}:`, error)
          })
      }
    }
  }

  return (
    <>
      {shouldRenderVideoUpload && (
        <>
          {!isLoading && !isAddFromLibrary && (
            <VideoUpload onSetFile={setFile} onUpload={handleUpload} isAddNewContent={isAddNewContent}></VideoUpload>
          )}
          <div className='flex items-center justify-between font-light text-[18px] mt-6'>
            <div className='font-normal'>Notes: Files should be at least 720p and less than 4.0 GB.</div>
            {!isLoading && !isAddFromLibrary && isEdit && (
              <div className='text-base font-medium cursor-pointer text-primary-1' onClick={() => setIsEdit(false)}>
                Cancel Edit
              </div>
            )}
          </div>
        </>
      )}

      {file && isLoading && (
        <UploadStatus filename={file?.name as string} onRemove={() => {}} progress={progress}></UploadStatus>
      )}

      {/* Library add */}
      {isAddFromLibrary && (
        <div className=''>
          <div className='flex items-center'>
            <div className='flex py-[14px] px-[10px] items-center max-w-[350px] rounded-xl bg-neutral-silver-2 h-[48px]'>
              <Search className='w-6 h-6 '></Search>
              <Input
                className='bg-transparent border-none outline-none text-neutral-silver-3'
                placeholder='Search files by name'
              ></Input>
            </div>
            <Select defaultValue='newest'>
              <SelectTrigger
                className='w-[180px] ml-8 bg-transparent h-[47px] border-neutral-black'
                defaultValue={'newest'}
              >
                <SelectValue placeholder='Select a timezone' />
              </SelectTrigger>
              <SelectContent className='' side='bottom'>
                <SelectItem value='newest'>Newest</SelectItem>
                <SelectItem value='oldest'>Oldest</SelectItem>
                <SelectItem value='in-course'>In this course</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* List video */}
          <div className='max-h-[200px] relative overflow-auto'>
            <Table>
              <TableHeader className='sticky top-0 bg-neutral-silver'>
                <TableRow className=''>
                  <TableHead className='w-[377px] text-primary-1'>Filename</TableHead>
                  <TableHead className='w-[120px] text-primary-1'>Type</TableHead>
                  <TableHead className='w-[120px] text-primary-1 text-center'>Status</TableHead>
                  <TableHead className='w-[120px] text-primary-1 text-center'>Upload date</TableHead>
                  <TableHead className='text-right w-[120px]'></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className=''>
                <TableRow>
                  <TableCell className='font-medium'>prototype1.mp4</TableCell>
                  <TableCell>Video</TableCell>
                  <TableCell className='text-center'>
                    <div className='mx-auto w-fit flex items-center justify-center px-3 py-2 rounded-lg bg-neutral-silver-1 text-[#323232] min-w-[108px]'>
                      Processing
                    </div>
                  </TableCell>
                  <TableCell className='text-center'>05/08/2024</TableCell>
                  <TableCell className='text-right cursor-pointer'>Select</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>prototype1.mp4</TableCell>
                  <TableCell>Video</TableCell>
                  <TableCell className='text-center'>
                    <div className='mx-auto w-fit flex items-center justify-center px-3 py-2 rounded-lg bg-neutral-silver-1 text-[#323232] min-w-[108px]'>
                      Processing
                    </div>
                  </TableCell>
                  <TableCell className='text-center'>05/08/2024</TableCell>
                  <TableCell className='text-right cursor-pointer'>Select</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>prototype1.mp4</TableCell>
                  <TableCell>Video</TableCell>
                  <TableCell className='text-center'>
                    <div className='flex items-center justify-center px-3 py-2 mx-auto text-white rounded-lg w-fit bg-primary-1 min-w-[108px]'>
                      Success
                    </div>
                  </TableCell>
                  <TableCell className='text-center'>05/08/2024</TableCell>
                  <TableCell className='text-right cursor-pointer'>Select</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      {/* After uploading success*/}
      {!isEdit && (primaryAsset?.status == 'Processing' || primaryAsset?.fileUrl || primaryAsset?.thumnailUrl) && (
        <div>
          <div className='flex items-center mt-6'>
            <div className='flex items-center flex-1'>
              <img
                src={primaryAsset.thumnailUrl || DraftVideo}
                alt=''
                className='w-[100px] h-[80px] object-cover rounded-lg'
              />

              <h3 className='font-medium text-[18px] text-neutral-black ml-3'>{primaryAsset.title}</h3>
            </div>

            <div className='flex items-center justify-center flex-1 '>
              <p
                className={`text-[18px] ${primaryAsset.status === 'Failed' ? 'text-red-500' : 'text-green-500'} font-medium`}
              >
                {primaryAsset.thumnailUrl && primaryAsset.fileUrl && primaryAsset.status
                  ? primaryAsset.status
                  : 'Processing'}
              </p>
            </div>
            {primaryAsset?.fileUrl && (
              <Link to={primaryAsset?.fileUrl} className='mx-10 text-blue-500 underline'>
                URL
              </Link>
            )}
            <div className='flex items-center justify-between flex-1'>
              <div
                className='text-lg font-medium cursor-pointer text-primary-1'
                onClick={() => {
                  setIsEdit(true)
                }}
              >
                Edit
              </div>
            </div>
          </div>
        </div>
      )}

      {/* End */}
    </>
  )
}
