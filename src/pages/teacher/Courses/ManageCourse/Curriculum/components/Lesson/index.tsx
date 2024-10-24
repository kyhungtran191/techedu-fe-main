/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import Navigate from '@/icons/Navigate'
import Drag from '@/icons/Drag'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// Shadcnui import
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import ThreeDots from '@/icons/ThreeDots'
import PlayBtn from '@/icons/CourseDetail/PlayBtn'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { TLesson } from '@/@types/course.type'
import VideoUpload from '../VideoUpload'
import axios, { CancelTokenSource } from 'axios'
import UploadStatus from '../VideoUpload/UploadStatus'
import { Switch } from '@/components/ui/switch'
import Tiptap from '@/components/TipTap'

import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FileDropUpload from '@/components/FileUploads'
export default function Lesson(props: TLesson) {
  const [isAddNewContent, setIsAddNewContent] = useState(false)
  const [isAddFromLibrary, setIsAddFromLibrary] = useState(false)
  const { id, name, type, content, resource } = props

  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploadSource, setUploadSource] = useState<File | null>(null)
  const [uploadResource, setUploadResource] = useState<boolean>(false)
  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(null)
  const [isAddDescription, setIsAddDescription] = useState(false)

  // Yup validate
  const schema = yup.object().shape({
    description: yup.string().required('Required_field')
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    getValues
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  // Handle Upload
  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    const source = axios.CancelToken.source()
    setCancelToken(source)
    try {
      const formData = new FormData()
      formData.append('video', file)
      await axios.post('/api/upload', formData, {
        cancelToken: source.token,
        onUploadProgress: (event) => {
          const percentCompleted = Math.round((event.loaded * 100) / (event?.total as number))
          setUploadProgress(percentCompleted)
        }
      })
      alert('Upload successful!')
    } catch (error) {
      if (axios.isCancel(error)) {
        // setUploading(false)
        setUploadProgress(0)
        setFile(null)
        setCancelToken(null)
      } else {
        console.error('Upload failed:', error)
        alert('Upload failed. Please try again.')
      }
    } finally {
      // setUploading(false)
      setUploadProgress(0)
      setCancelToken(null)
    }
  }

  const handleSubmitDataDescription = () => {}

  useEffect(() => {
    if (!file) return
    handleUpload()
  }, [file])

  const handleCancelDescription = () => {
    reset({
      description: ''
    })
    setIsAddDescription(false)
  }

  const handleCancelResource = () => {
    setUploadSource(null)
    setUploadResource(false)
  }

  const handleCancel = useCallback(() => {
    if (cancelToken) {
      cancelToken.cancel('Upload canceled by the user.')
    }
  }, [cancelToken])

  /**
   * Lesson Props:
   *  - type
   *  - content
   *  - resources
   *  -
   */
  return (
    <div className='pb-6 border-b border-neutral-black'>
      <div className='flex items-center justify-between mt-6'>
        <div className='flex items-center'>
          <Drag className='w-9 h-9 text-neutral-silver-3'></Drag>
          <PlayBtn className='ml-6 mr-3 w-9 h-9 text-neutral-silver-3'></PlayBtn>
          <div className='text-[18px] text-neutral-black'>
            <span>Lesson 1.</span> {name}
          </div>
        </div>
        <div className='flex items-center gap-x-6'>
          <Button
            className={`${isAddNewContent ? 'flex' : 'hidden'} items-center border-neutral-black px-[18px] rounded-lg bg-transparent`}
            variant={'outline'}
            onClick={() => setIsAddFromLibrary(!isAddFromLibrary)}
          >
            {isAddFromLibrary ? 'Upload Video' : 'Add from library'}
          </Button>

          <Button
            className={`${!isAddNewContent ? 'flex' : 'hidden'} items-center border-neutral-black px-[18px] rounded-lg bg-transparent`}
            variant={'outline'}
            onClick={() => setIsAddNewContent(true)}
          >
            <Plus className='w-6 h-6'></Plus>
            <div className='ml-[10px]'>Content</div>
          </Button>
          <Navigate
            className={`cursor-pointer ${!isAddNewContent ? '-rotate-90' : 'rotate-90'}`}
            onClick={() => setIsAddNewContent(!isAddNewContent)}
          ></Navigate>
          <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center rounded-full data-[state=open]:bg-primary-1 data-[state=open]:text-white '>
              <ThreeDots></ThreeDots>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='' align='end'>
              <DropdownMenuItem className='w-full px-2 py-3 cursor-pointer'>Duplicate lesson</DropdownMenuItem>
              <DropdownMenuItem className='w-full px-2 py-3 cursor-pointer'>Edit lesson Name</DropdownMenuItem>
              <DropdownMenuItem className='w-full px-2 py-3 cursor-pointer'>Delete lesson</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isAddNewContent ? 'h-auto py-6' : 'h-0 p-0 '}`}
      >
        {!isAddFromLibrary && (
          <>
            <VideoUpload onSetFile={setFile} onUpload={handleUpload} isAddNewContent={isAddNewContent}></VideoUpload>
            <div className='font-light text-[18px] mt-6'>
              <span className='font-normal'>Notes: </span>Files should be at least 720p and less than 4.0 GB.
            </div>
          </>
        )}
        {file && uploading && (
          <UploadStatus
            filename={file?.name as string}
            onRemove={handleCancel}
            progress={uploadProgress}
          ></UploadStatus>
        )}

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
        {/* After uploading */}
        <div>
          <div className='flex items-center mt-6'>
            <div className='flex items-center flex-1'>
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMuTbYHX4guqqhARZ_u2-ZPTaGEUCdsslDaA&s'
                alt=''
                className='w-[100px] h-[80px] object-cover rounded-lg'
              />
              <h3 className='font-medium text-[18px] text-neutral-black ml-3'>prototype1.mp4</h3>
            </div>
            <div className='flex items-center justify-between flex-1'>
              <p className='text-[18px]'>05/08/2024</p>
              <div className='text-lg font-medium cursor-pointer text-primary-1'>Edit</div>
            </div>
          </div>
          <div className=''>
            <div>
              <Button
                className={`${!isAddDescription ? 'flex' : 'hidden'} items-center justify-center mt-3 border rounded-lg text-neutral-black border-neutral-black hover:bg-inherit hover:text-inherit `}
                variant={'ghost'}
                onClick={() => setIsAddDescription(true)}
              >
                <Plus className='mr-[10px]'></Plus>
                <span>Description</span>
              </Button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isAddDescription ? 'h-auto py-6' : 'h-0 p-0 '}`}
              >
                <h2 className='text-lg font-semibold'>Description</h2>
                <Controller
                  control={control}
                  name='description'
                  render={({ field }) => (
                    <Tiptap
                      className='my-3 min-h-[206px] w-full text-xl rounded-lg  py-[18px] px-3 outline-none placeholder:text-neutral-silver-3 bg-white cursor-text'
                      placeholder='Add a description that outlines what students will be able to do after finishing the '
                      description={''}
                      {...field}
                      onChange={field.onChange}
                    />
                  )}
                />
                <div className='flex items-center justify-end gap-x-3'>
                  <Button onClick={handleCancelDescription} variant={'ghost'}>
                    Cancel
                  </Button>
                  <Button className='w-fit' disabled={!isValid} variant={'custom'}>
                    Apply
                  </Button>
                </div>
              </div>
            </div>
            <Button
              className={`${uploadResource ? 'hidden' : 'flex'} items-center justify-center mt-3 border rounded-lg text-neutral-black border-neutral-black hover:bg-inherit hover:text-inherit`}
              variant={'ghost'}
              onClick={() => setUploadResource(true)}
            >
              <Plus className='mr-[10px]'></Plus>
              <span>Resources</span>
            </Button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${uploadResource ? 'h-auto py-6' : 'h-0 p-0 '}`}
            >
              <h2 className='text-lg font-semibold'>Resources</h2>

              <FileDropUpload onSetFile={setUploadSource} className='my-3'></FileDropUpload>
              <div className='flex items-center justify-end gap-x-3'>
                <Button onClick={handleCancelResource} variant={'ghost'}>
                  Cancel
                </Button>
                <Button className='w-fit' disabled={!isValid} variant={'custom'}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* End */}
      </div>
    </div>
  )
}
