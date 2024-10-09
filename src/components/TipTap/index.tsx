import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ToolBar from './Toolbar'
import { Separator } from '../ui/separator'

function Tiptap({
  description,
  onChange,
  className
}: {
  description: string
  onChange: (richText: string) => void
  className?: string
}) {
  const editor = useEditor({
    extensions: [StarterKit.configure({})],
    content: description,
    editorProps: {
      attributes: {
        class:
          'min-h-[56px] border-none outline-none bg-background  disabled:cursor-not-allows disabled:opacity-50 mx-3'
      }
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
      console.log(editor.getHTML())
    }
  })

  return (
    <div
      className={`flex flex-col justify-stretch min-h-[250px] py-[18px] border border-neutral-black rounded-lg ${className}`}
    >
      <ToolBar editor={editor} />
      <Separator className='my-[18px]'></Separator>
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap
