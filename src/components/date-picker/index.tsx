import * as React from 'react'
import { buttonVariants } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  DayPicker,
  DayPickerDefaultProps,
  DayPickerMultipleProps,
  DayPickerRangeProps,
  DayPickerSingleProps
} from 'react-day-picker'
import { cn } from '@/lib/utils'
import { ScrollArea } from '../ui/scroll-area'

interface IProps {
  className?: string
  classNames?: string
  showOutsideDays?: boolean
}
export default function DatePickerCustom({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: (IProps & DayPickerDefaultProps) | DayPickerSingleProps | DayPickerMultipleProps | DayPickerRangeProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 fixed', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        caption_dropdowns: 'flex justify-center gap-4',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(buttonVariants({ variant: 'ghost' }), 'h-8 w-10 sm:w-14 p-0 font-normal aria-selected:opacity-100'),
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible'
      }}
      components={{
        Dropdown: ({ value, onChange, children, ...props }) => {
          const options = React.Children.toArray(children)
          const selected: any = options.find((child: any) => child.props.value === value)
          const handleChange = (value: any) => {
            const changeEvent = {
              target: { value }
            }
            onChange?.(changeEvent as any)
          }
          return (
            <Select
              value={value?.toString()}
              onValueChange={(value) => {
                handleChange(value)
              }}
            >
              <SelectTrigger className='pr-1.5 focus:ring-0 z-50'>
                <SelectValue>{selected?.props?.children}</SelectValue>
              </SelectTrigger>
              <SelectContent position='popper'>
                <ScrollArea className='h-80'>
                  {options.map((option: any, id) => (
                    <SelectItem key={`${option.props.value}-${id}`} value={option.props.value?.toString() ?? ''}>
                      {option.props.children}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          )
        },
        IconLeft: ({ ...props }) => <ChevronLeft className='w-4 h-4' />,
        IconRight: ({ ...props }) => <ChevronRight className='w-4 h-4' />
      }}
      {...props}
    />
  )
}
