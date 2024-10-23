import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
export default function AddNewDialog() {
  const [parentCategory, setParentCategory] = useState<string>('')

  return (
    <Dialog>
      <DialogTrigger className='flex items-center  text-sm   gap-x-[19px] cursor-pointer  mb-2 font-medium p-4 rounded-lg focus:outline-none bg-foreground text-white'>
        <Plus className='w-5 h-5'></Plus>
        Add new Category
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{`${parentCategory ? 'Add new subcategory' : 'Add new category'}`}</DialogTitle>
        </DialogHeader>
        <div className='py-4'>
          <Input className='outline-none border-neutral-silver-3' placeholder='Category name'></Input>
          <Select onValueChange={(value) => setParentCategory(value)}>
            <SelectTrigger className='w-full mt-4 border-neutral-silver-3'>
              <SelectValue placeholder='Select a parent children category' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='est'>Eastern Standard Time (EST)</SelectItem>
                <SelectItem value='cst'>Central Standard Time (CST)</SelectItem>
                <SelectItem value='mst'>Mountain Standard Time (MST)</SelectItem>
                <SelectItem value='pst'>Pacific Standard Time (PST)</SelectItem>
                <SelectItem value='akst'>Alaska Standard Time (AKST)</SelectItem>
                <SelectItem value='hst'>Hawaii Standard Time (HST)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {parentCategory && (
            <div className='mt-4 text-sm font-medium text-yellow-500'>
              Note: You are adding subcategory for this parent category
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type='submit' variant={'custom'} disabled className='w-full py-4'>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
