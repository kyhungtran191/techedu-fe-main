import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Drag from '@/icons/Drag'
import { ChevronsLeft, KeySquare, Navigation } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'

export type TPermission = {
  id: string
  name: string
  isSelected: boolean
  isChecked: boolean
}

export type TPermissionList = {
  id: string
  name: string
  permissions: TPermission[] | []
}

const mockSection: TPermission[] = [
  { id: '26fd50b3-3841-496e-8b32-73636f6f4197', name: 'Overview Course', isSelected: false, isChecked: false },
  { id: 'b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525', name: 'Create Course', isSelected: false, isChecked: false },
  { id: '95ee6a5d-f927-4579-8c15-2b4eb86210ae', name: 'Update Course', isSelected: true, isChecked: false },
  { id: '5bee94eb-6bde-4411-b438-1c37fa6af364', name: 'Delete Course', isSelected: true, isChecked: false }
]

const sectionsFixed: TPermissionList[] = [
  {
    id: 'system-permissions',
    name: 'System Permissions',
    permissions: []
  },
  {
    id: 'selected-permissions',
    name: 'Selected Permissions',
    permissions: []
  }
]

export default function PermissionDialog({ authorizeAuthId }: { authorizeAuthId: number }) {
  const [permissions, setPermissions] = useState<TPermission[]>(mockSection)
  const [sections, setSections] = useState<TPermissionList[]>(sectionsFixed)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<{ sectionId: string; items: Set<string> }>({
    sectionId: ' ',
    items: new Set()
  })

  // Filter permissions
  useEffect(() => {
    if (open) {
      const systemPermissions = permissions.filter((permission) => !permission.isSelected)
      const selectedPermissions = permissions.filter((permission) => permission.isSelected)

      setSections([
        {
          id: 'system-permissions',
          name: 'System Permissions',
          permissions: systemPermissions
        },
        {
          id: 'selected-permissions',
          name: 'Selected Permissions',
          permissions: selectedPermissions
        }
      ])
    }
  }, [permissions, open])

  const handleDragAndDrop = (results: DropResult) => {
    const { source, destination } = results

    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const itemSourceIndex = source.index
    const itemDestinationIndex = destination.index

    const storeSourceIndex = sections.findIndex((store) => store.id === source.droppableId)
    const storeDestinationIndex = sections.findIndex((store) => store.id === destination.droppableId)

    const newSourceItems = [...sections[storeSourceIndex].permissions]
    const newDestinationItems =
      source.droppableId !== destination.droppableId ? [...sections[storeDestinationIndex].permissions] : newSourceItems

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1)
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem)

    const newStores = [...sections]

    newStores[storeSourceIndex] = {
      ...sections[storeSourceIndex],
      permissions: newSourceItems
    }

    newStores[storeDestinationIndex] = {
      ...sections[storeDestinationIndex],
      permissions: newDestinationItems
    }

    setSections(newStores)
  }

  const handleOnClickUpdate = () => {
    console.log(sections)
  }

  const handleOnClickChecked = (itemId: string, sectionId: string) => {
    // Check if the selected item section matches the clicked section
    if (selectedItem.sectionId === sectionId) {
      // Toggle the selection state
      const newArr = new Set(selectedItem.items)
      if (newArr.has(itemId)) {
        newArr.delete(itemId) // If it's already selected, remove it
      } else {
        newArr.add(itemId) // Otherwise, add it
      }
      setSelectedItem((prev) => ({
        ...prev,
        items: newArr
      }))
    } else {
      // If a different section is clicked, update selectedItem
      setSelectedItem({ sectionId, items: new Set([itemId]) })
    }
  }

  const handleMove = () => {
    const newSections = sections.map((section) => {
      if (section.id === selectedItem.sectionId) {
        return {
          ...section,
          permissions: section.permissions.filter((p) => !selectedItem.items.has(p.id)) // Remove selected items
        }
      } else {
        return {
          ...section,
          permissions: [
            ...section.permissions,
            ...Array.from(selectedItem.items)
              .map((itemId) => {
                const permission = permissions.find((p) => p.id === itemId)
                return permission ? { ...permission, isSelected: true } : null
              })
              .filter(Boolean) // Filter valid permissions
          ]
        }
      }
    })

    setSections(newSections as any)
    setSelectedItem({ sectionId: '', items: new Set() }) // Reset selected items
  }

  return (
    <Dialog onOpenChange={setOpen}>
      <DialogTrigger className='flex items-center text-sm rounded-lg gap-x-[19px] w-full cursor-pointer hover:bg-neutral-silver mb-2 font-medium py-2 px-2'>
        <KeySquare className='w-5 h-5'></KeySquare>
        Authorize
      </DialogTrigger>
      <DialogContent
        className='flex flex-col w-full max-w-[80vw] h-[80vh] overflow-y-auto '
        onCloseAutoFocus={() => {
          setOpen(false)
          setSelectedItem({ sectionId: '', items: new Set() })
        }}
      >
        <DialogHeader>
          <DialogTitle>Authorize Role Permission</DialogTitle>
        </DialogHeader>
        <div className='h-[80%]'>
          <div className='grid grid-cols-2 text-xl font-bold text-center gap-x-10'>
            <h2>System Permissions</h2>
            <h2>Selected Permissions</h2>
          </div>
          <DragDropContext onDragEnd={handleDragAndDrop}>
            <div className='relative grid h-full grid-cols-2 gap-10 px-2 py-4'>
              <div className='absolute flex flex-col items-center justify-center translate-x-7 -translate-y-1/3 right-1/2 top-1/2'>
                <Button className={`w-fit`} onClick={handleMove} disabled={Boolean(!selectedItem?.items.size)}>
                  <ChevronsLeft
                    className={`${selectedItem.sectionId === 'system-permissions' ? 'rotate-180' : ''}`}
                  ></ChevronsLeft>
                </Button>
              </div>
              {sections.map((section, index) => (
                <Droppable droppableId={section.id} type='group' key={index}>
                  {(provided) => (
                    <div
                      className='grid max-h-[600px] grid-cols-3 gap-4 px-2 py-3 overflow-y-auto border rounded-lg grid-rows-6'
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {section.permissions.map((item, index) => (
                        <Draggable
                          draggableId={item.id as string}
                          index={index}
                          key={item.id}
                          disableInteractiveElementBlocking
                        >
                          {(provided, snapshot) => (
                            <div
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              className={`flex items-center h-[70px] p-2 border rounded-lg border-neutral-black ${
                                snapshot.isDragging ? 'dragged' : ''
                              } ${selectedItem.sectionId == section.id && selectedItem.items.has(item.id) ? 'bg-neutral-300' : ''}`}
                              onClick={() => handleOnClickChecked(item.id, section.id)} // Pass both item.id and section.id
                            >
                              <Drag className='flex-shrink-0 w-6 h-6 mr-2'></Drag>
                              <span className='text-xs font-medium lg:text-sm'>{item.name}</span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </div>
        <Button type='submit' variant={'custom'} className='mt-auto' onClick={handleOnClickUpdate}>
          Ok
        </Button>
      </DialogContent>
    </Dialog>
  )
}
