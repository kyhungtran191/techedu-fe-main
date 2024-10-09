import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Folder from '@/icons/CourseDetail/Folder'
import { Checkbox } from '@/components/ui/checkbox'
import PlayBtn from '@/icons/CourseDetail/PlayBtn'
import Document2 from '@/icons/CourseDetail/Document2'
import { Separator } from '@/components/ui/separator'
export default function LearningAccordion() {
  return (
    <Accordion type='single' collapsible className='mb-4'>
      <AccordionItem value='section-1' className='!border-b-0'>
        <AccordionTrigger className='px-3 py-6 text-xl font-medium text-primary-1 hover:no-underline'>
          Introduction
        </AccordionTrigger>
        <Separator className='bg-primary-1'></Separator>
        <AccordionContent className=''>
          <div className='px-3 py-6 cursor-pointer bg-neutral-silver'>
            <div className='flex items-start'>
              <Checkbox className='border-neutral-black data-[state=checked]:bg-primary-1 data-[state=checked]:text-white w-6 h-6'></Checkbox>
              <h3 className='ml-3 text-[18px] font-medium text-neutral-black line-clamp-2 text-ellipsis leading-6'>
                1. Lession 1 Learning Out Come ng Out Comeng Out Come ng Out Come
              </h3>
            </div>
            <div className='flex items-center justify-between mt-5'>
              <div className='flex items-center text-neutral-silver-3'>
                <PlayBtn></PlayBtn>
                <span className='ml-3'>1:20:20</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center justify-center p-3 ml-auto text-white rounded-xl bg-primary-1'>
                  <Folder></Folder>
                  <span className='ml-5'>Resources</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='px-3 py-6 bg-white cursor-pointer'>
            <div className='flex items-center'>
              <Checkbox className='border-neutral-black data-[state=checked]:bg-primary-1 data-[state=checked]:text-white w-6 h-6'></Checkbox>
              <h3 className='ml-3 text-[18px] font-medium text-neutral-black line-clamp-1 text-ellipsis '>
                1. Lession 1 Learning Out Come
              </h3>
            </div>
            <div className='flex items-center justify-between mt-5'>
              <div className='flex items-center text-neutral-silver-3'>
                <Document2></Document2>
                <span className='ml-3'>1:20:20</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center justify-center p-3 ml-auto text-white rounded-xl bg-primary-1'>
                  <Folder></Folder>
                  <span className='ml-5'>Resources</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
