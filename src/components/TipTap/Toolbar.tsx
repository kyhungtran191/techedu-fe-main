import React from 'react'
import { type Editor } from '@tiptap/react'
import { Bold, Italic, List, ListOrdered, StrikethroughIcon } from 'lucide-react'
import { Toggle } from '../ui/toggle'

type Props = {
  editor: Editor | null
}

function ToolBar({ editor }: Props) {
  if (!editor) {
    return null
  }

  return (
    <div className='flex gap-3 mx-3 rounded-lg border-input '>
      <Toggle
        size='sm'
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className='w-4 h-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className='w-4 h-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className='w-4 h-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className='w-4 h-4' />
      </Toggle>
    </div>
  )
}

export default ToolBar
