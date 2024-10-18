import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

// ShadcnUI
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import ThreeDots from '@/icons/ThreeDots'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

// End

interface ICourse {
  _id: string
  thumbnail: string
  name: string
  status: number
  created_date: string | null
}

export default function CourseManage() {
  const columns = [
    {
      id: 'thumbnail',
      header: () => <p className='text-lg text-primary-1'>Thumbnail</p>,
      cell: ({ row }: { row: any }) => {
        return (
          <img
            src={row.original.thumbnail}
            alt={row.original.name}
            className='font-semibold w-[120px] h-[90px] object-cover mx-auto'
          />
        )
      },
      enableSorting: false,
      enableHiding: false
    },

    {
      id: 'slug',
      header: () => <p className='text-lg text-primary-1'>Name</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='text-lg font-medium'>{row.original.name}</p>
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'created_date',
      header: () => <p className='text-lg text-primary-1'>Created Date</p>,
      cell: ({ row }: { row: any }) => {
        return <p className='text-lg'>{row.original.created_date}</p>
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'status',
      header: () => <p className='text-lg text-primary-1'>Status</p>,
      cell: ({ row }: { row: any }) => {
        return (
          <p
            className={`w-fit mx-auto px-3 py-2 tex  rounded-lg ${row.original.status == 0 ? 'bg-neutral-silver-1 text-neutral-black' : row.original.status == 1 ? 'bg-primary-1 text-white' : 'bg-[#F0D355] text-black'}`}
          >
            {row.original.status == 0 ? 'Draft' : row.original.status == 1 ? 'Published' : 'Pending'}
          </p>
        )
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      id: 'action',
      header: () => <p className='text-lg text-primary-1'>Action</p>,
      cell: ({ row }: { row: any }) => {
        return (
          <div className='flex items-center justify-center font-base'>
            <DropdownMenu>
              <DropdownMenuTrigger
                className='[state=open]:bg-primary-1 text- neutral-black'
                onClick={(e) => e.preventDefault()}
              >
                <ThreeDots></ThreeDots>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='rounded-xl min-w-[160px] py-2'>
                <DropdownMenuItem className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'>
                  Preview course as Student
                </DropdownMenuItem>
                <DropdownMenuItem className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'>
                  Edit Course
                </DropdownMenuItem>
                <DropdownMenuItem className='flex items-center w-full p-3 mb-2 text-sm rounded-lg cursor-pointer hover:bg-neutral-silver focus:outline-none'>
                  Delete Course
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
      enableSorting: false,
      enableHiding: false
    }
  ]

  const courseData: ICourse[] = [
    {
      _id: '1',
      created_date: new Date().toLocaleDateString('vi-VN'),
      name: 'Rapid prototyping in the Chrome Browser',
      status: 0,
      thumbnail:
        'https://s3-alpha-sig.figma.com/img/1ebf/3e1a/61ad8b680f1d53b2c9158b087115ff7f?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G7WMxgfST~2Oz~DmSitObHdat~JS-eQkW0MPHmLiy4PxuDOlyklA8vfS~eAk8DfFpl3sCeKRkt-jn53YYh4XNAg6O0e~4LbJ9gITpHZ3FYH-VrdERpymHwZhMkfDuyOVDWdHlFxDKvZex016KasoeEvsVbDhalPelWSc0tg0dLhcyAjG~cGN9IawpyVw20L-NXisPOc1bmaOgRGTXm27tjHtc2nU4jme~oLcdLm0sxVvw~u0E1O1saEQb~ND0Zhq8Qm75cVHP05~xPHzBUJl9tckET15dv7CDLxgBmoY9ILsthE0bE5eNYFPfrozlpADmWinv9D1iTh1G1M5HOg-5g__'
    },
    {
      _id: '2',
      created_date: new Date().toLocaleDateString('vi-VN'),
      name: 'Rapid prototyping in the Chrome Browser',
      status: 1,
      thumbnail:
        'https://s3-alpha-sig.figma.com/img/1ebf/3e1a/61ad8b680f1d53b2c9158b087115ff7f?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G7WMxgfST~2Oz~DmSitObHdat~JS-eQkW0MPHmLiy4PxuDOlyklA8vfS~eAk8DfFpl3sCeKRkt-jn53YYh4XNAg6O0e~4LbJ9gITpHZ3FYH-VrdERpymHwZhMkfDuyOVDWdHlFxDKvZex016KasoeEvsVbDhalPelWSc0tg0dLhcyAjG~cGN9IawpyVw20L-NXisPOc1bmaOgRGTXm27tjHtc2nU4jme~oLcdLm0sxVvw~u0E1O1saEQb~ND0Zhq8Qm75cVHP05~xPHzBUJl9tckET15dv7CDLxgBmoY9ILsthE0bE5eNYFPfrozlpADmWinv9D1iTh1G1M5HOg-5g__'
    },
    {
      _id: '2',
      created_date: new Date().toLocaleDateString('vi-VN'),
      name: 'Rapid prototyping in the Chrome Browser',
      status: 1,
      thumbnail:
        'https://s3-alpha-sig.figma.com/img/1ebf/3e1a/61ad8b680f1d53b2c9158b087115ff7f?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G7WMxgfST~2Oz~DmSitObHdat~JS-eQkW0MPHmLiy4PxuDOlyklA8vfS~eAk8DfFpl3sCeKRkt-jn53YYh4XNAg6O0e~4LbJ9gITpHZ3FYH-VrdERpymHwZhMkfDuyOVDWdHlFxDKvZex016KasoeEvsVbDhalPelWSc0tg0dLhcyAjG~cGN9IawpyVw20L-NXisPOc1bmaOgRGTXm27tjHtc2nU4jme~oLcdLm0sxVvw~u0E1O1saEQb~ND0Zhq8Qm75cVHP05~xPHzBUJl9tckET15dv7CDLxgBmoY9ILsthE0bE5eNYFPfrozlpADmWinv9D1iTh1G1M5HOg-5g__'
    },
    {
      _id: '3',
      created_date: new Date().toLocaleDateString('vi-VN'),
      name: 'Rapid prototyping in the Chrome Browser',
      status: 2,
      thumbnail:
        'https://s3-alpha-sig.figma.com/img/1ebf/3e1a/61ad8b680f1d53b2c9158b087115ff7f?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G7WMxgfST~2Oz~DmSitObHdat~JS-eQkW0MPHmLiy4PxuDOlyklA8vfS~eAk8DfFpl3sCeKRkt-jn53YYh4XNAg6O0e~4LbJ9gITpHZ3FYH-VrdERpymHwZhMkfDuyOVDWdHlFxDKvZex016KasoeEvsVbDhalPelWSc0tg0dLhcyAjG~cGN9IawpyVw20L-NXisPOc1bmaOgRGTXm27tjHtc2nU4jme~oLcdLm0sxVvw~u0E1O1saEQb~ND0Zhq8Qm75cVHP05~xPHzBUJl9tckET15dv7CDLxgBmoY9ILsthE0bE5eNYFPfrozlpADmWinv9D1iTh1G1M5HOg-5g__'
    },
    {
      _id: '4',
      created_date: new Date().toLocaleDateString('vi-VN'),
      name: 'Rapid prototyping in the Chrome Browser',
      status: 1,
      thumbnail:
        'https://s3-alpha-sig.figma.com/img/1ebf/3e1a/61ad8b680f1d53b2c9158b087115ff7f?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G7WMxgfST~2Oz~DmSitObHdat~JS-eQkW0MPHmLiy4PxuDOlyklA8vfS~eAk8DfFpl3sCeKRkt-jn53YYh4XNAg6O0e~4LbJ9gITpHZ3FYH-VrdERpymHwZhMkfDuyOVDWdHlFxDKvZex016KasoeEvsVbDhalPelWSc0tg0dLhcyAjG~cGN9IawpyVw20L-NXisPOc1bmaOgRGTXm27tjHtc2nU4jme~oLcdLm0sxVvw~u0E1O1saEQb~ND0Zhq8Qm75cVHP05~xPHzBUJl9tckET15dv7CDLxgBmoY9ILsthE0bE5eNYFPfrozlpADmWinv9D1iTh1G1M5HOg-5g__'
    },
    {
      _id: '5',
      created_date: new Date().toLocaleDateString('vi-VN'),
      name: 'Rapid prototyping in the Chrome Browser',
      status: 0,
      thumbnail:
        'https://s3-alpha-sig.figma.com/img/1ebf/3e1a/61ad8b680f1d53b2c9158b087115ff7f?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G7WMxgfST~2Oz~DmSitObHdat~JS-eQkW0MPHmLiy4PxuDOlyklA8vfS~eAk8DfFpl3sCeKRkt-jn53YYh4XNAg6O0e~4LbJ9gITpHZ3FYH-VrdERpymHwZhMkfDuyOVDWdHlFxDKvZex016KasoeEvsVbDhalPelWSc0tg0dLhcyAjG~cGN9IawpyVw20L-NXisPOc1bmaOgRGTXm27tjHtc2nU4jme~oLcdLm0sxVvw~u0E1O1saEQb~ND0Zhq8Qm75cVHP05~xPHzBUJl9tckET15dv7CDLxgBmoY9ILsthE0bE5eNYFPfrozlpADmWinv9D1iTh1G1M5HOg-5g__'
    },
    {
      _id: '5',
      created_date: new Date().toLocaleDateString('vi-VN'),
      name: 'Rapid prototyping in the Chrome Browser',
      status: 0,
      thumbnail:
        'https://s3-alpha-sig.figma.com/img/1ebf/3e1a/61ad8b680f1d53b2c9158b087115ff7f?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G7WMxgfST~2Oz~DmSitObHdat~JS-eQkW0MPHmLiy4PxuDOlyklA8vfS~eAk8DfFpl3sCeKRkt-jn53YYh4XNAg6O0e~4LbJ9gITpHZ3FYH-VrdERpymHwZhMkfDuyOVDWdHlFxDKvZex016KasoeEvsVbDhalPelWSc0tg0dLhcyAjG~cGN9IawpyVw20L-NXisPOc1bmaOgRGTXm27tjHtc2nU4jme~oLcdLm0sxVvw~u0E1O1saEQb~ND0Zhq8Qm75cVHP05~xPHzBUJl9tckET15dv7CDLxgBmoY9ILsthE0bE5eNYFPfrozlpADmWinv9D1iTh1G1M5HOg-5g__'
    },
    {
      _id: '5',
      created_date: new Date().toLocaleDateString('vi-VN'),
      name: 'Rapid prototyping in the Chrome Browser',
      status: 0,
      thumbnail:
        'https://s3-alpha-sig.figma.com/img/1ebf/3e1a/61ad8b680f1d53b2c9158b087115ff7f?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G7WMxgfST~2Oz~DmSitObHdat~JS-eQkW0MPHmLiy4PxuDOlyklA8vfS~eAk8DfFpl3sCeKRkt-jn53YYh4XNAg6O0e~4LbJ9gITpHZ3FYH-VrdERpymHwZhMkfDuyOVDWdHlFxDKvZex016KasoeEvsVbDhalPelWSc0tg0dLhcyAjG~cGN9IawpyVw20L-NXisPOc1bmaOgRGTXm27tjHtc2nU4jme~oLcdLm0sxVvw~u0E1O1saEQb~ND0Zhq8Qm75cVHP05~xPHzBUJl9tckET15dv7CDLxgBmoY9ILsthE0bE5eNYFPfrozlpADmWinv9D1iTh1G1M5HOg-5g__'
    }
  ]

  const courseTable = useReactTable({
    data: courseData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className='flex flex-col h-full'>
      <div className='sticky top-0 flex items-center'>
        <div className='flex items-center gap-[32px] flex-1 mr-[70px]'>
          <div className=' py-[14px] px-[10px] bg-white rounded-xl flex items-center gap-x-[10px] flex-1 max-w[50vw]'>
            <Search className='flex-shrink-0 w-4 h-4 md:h-6 md:w-6'></Search>
            <Input
              className='px-0 py-0 text-sm bg-transparent border-none outline-none md:text-base '
              placeholder='Search your courses'
            ></Input>
          </div>
          <Select defaultValue='newest'>
            <SelectTrigger
              className='w-[180px] h-[56px]  !py-4 !px-6 bg-transparent  border-neutral-black text-lg'
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
        <Link
          to='/teacher/create-course'
          className='flex items-center px-6 py-4 text-white bg-primary-1 h-[58px] gap-x-[10px] rounded-lg w-fit ml-auto '
        >
          <Plus></Plus>
          <span>New course</span>
        </Link>
      </div>
      <div className='flex-grow px-6 py-3 mt-4 overflow-y-auto bg-white rounded-xl no-scrollbar'>
        <Table className='w-full h-full overflow-auto'>
          <TableHeader className='sticky z-20 py-4 bg-white border-b -top-3'>
            {courseTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='text-center'>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {courseTable?.getRowModel()?.rows?.length ? (
              courseTable?.getRowModel()?.rows?.map((row) => (
                <TableRow
                  key={row.id}
                  className={`cursor-pointer text-center border-none`}
                  onClick={() => {
                    // setSelectedRow(row.original)
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns?.length} className='h-24 text-center'>
                  {/* Loading section */}
                  {/* <ComponentsLoading></ComponentsLoading> */}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
