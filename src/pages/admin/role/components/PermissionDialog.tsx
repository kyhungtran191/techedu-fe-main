import { ResponsePermission, RolePermission } from '@/@types/admin/role.type'
import LoadingCircle from '@/components/Loading/LoadingCircle'
import SectionLoading from '@/components/Loading/SectionLoading'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Drag from '@/icons/Drag'
import { GetRolePermission, UpdateRolePermission } from '@/services/admin/role.service'
import { useMutation, useQueries, useQuery } from '@tanstack/react-query'
import { ChevronsLeft, KeySquare, Navigation } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { toast } from 'react-toastify'
import { string } from 'yup'

export type TPermission = {
  selected: false
  id: string
  function: string
  command: string
  isChecked: boolean
}

export type TPermissionList = {
  id: string
  name: string
  permissions: TPermission[] | []
}

// type ResponsePermission =
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
export default function PermissionDialog({ roleId }: { roleId: string }) {
  const [permissions, setPermissions] = useState<TPermission[]>([])
  const [sections, setSections] = useState<TPermissionList[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<{ sectionId: string; items: Set<string> }>({
    sectionId: ' ',
    items: new Set()
  })

  const { isFetching, data } = useQuery({
    queryKey: ['role-permission', roleId],
    queryFn: () => GetRolePermission(roleId),
    enabled: open && roleId !== undefined,
    select: (res) => res.data.value as ResponsePermission
  })

  // Filter permissions
  useEffect(() => {
    const systemPermissions = (data?.permissionsUnSelected || []).map((item) => ({
      ...item,
      isChecked: false,
      id: `${item.function}.${item.command}`
    })) as TPermission[]

    const selectedPermissions = (data?.permissionsSelected || []).map((item) => ({
      ...item,
      isChecked: true,
      id: `${item.function}.${item.command}`
    })) as TPermission[]

    setPermissions([...systemPermissions, ...selectedPermissions])
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
  }, [data])

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
    const newSectionSelected =
      sections &&
      sections[1].permissions.map((item) => ({
        function: item.function,
        command: item.command,
        selected: true
      }))

    const newSectionUnselected =
      sections &&
      sections[0].permissions.map((item) => ({
        function: item.function,
        command: item.command,
        selected: false
      }))

    updatePermission(
      { id: roleId, permissions: [...newSectionSelected, ...newSectionUnselected] },
      {
        onSuccess: () => {
          toast.success('Update Permission Successfully')
          handleResetDialog()
        }
      }
    )
  }

  const handleResetDialog = () => {
    setSelectedItem({ sectionId: '', items: new Set() })
    setPermissions([])
    setSections(sectionsFixed)
    setOpen(false)
  }

  //Update Permission Role
  const { mutate: updatePermission, isLoading } = useMutation({
    mutationFn: ({ id, permissions }: { id: string; permissions: RolePermission[] }) =>
      UpdateRolePermission(id, permissions)
  })

  const handleOnClickChecked = (itemId: string, sectionId: string) => {
    if (selectedItem.sectionId === sectionId) {
      // Toggle the selection state
      const newArr = new Set(selectedItem.items)
      if (newArr.has(itemId)) {
        newArr.delete(itemId)
      } else {
        newArr.add(itemId)
      }
      setSelectedItem((prev) => ({
        ...prev,
        items: newArr
      }))
    } else {
      setSelectedItem({ sectionId, items: new Set([itemId]) })
    }
  }

  const handleMove = () => {
    const newSections = sections.map((section) => {
      if (section.id === selectedItem.sectionId) {
        // remove current item in section
        return {
          ...section,
          permissions: section.permissions.filter((p) => !selectedItem.items.has(p.id as string)) // Remove selected items
        }
      } else {
        return {
          ...section,
          permissions: [
            ...section.permissions,
            ...Array.from(selectedItem.items) // transform into array from Set
              .map((itemId) => {
                const permission = permissions.find((p) => p.id === itemId)
                return permission ? { ...permission, selected: true } : null
              })
              .filter(Boolean)
          ]
        }
      }
    })

    setSections(newSections as any)
    setSelectedItem({ sectionId: '', items: new Set() })
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger className='flex items-center text-sm rounded-lg gap-x-[19px] w-full cursor-pointer hover:bg-neutral-silver mb-2 font-medium py-2 px-2'>
        <KeySquare className='w-5 h-5'></KeySquare>
        Authorize
      </DialogTrigger>
      <DialogContent
        className='flex flex-col w-full max-w-[80vw] h-[80vh] overflow-y-auto'
        onCloseAutoFocus={handleResetDialog}
      >
        {isLoading && <SectionLoading className='z-30'></SectionLoading>}
        <DialogHeader>
          <DialogTitle>Authorize Role Permission</DialogTitle>
        </DialogHeader>
        <div className='h-[80%]'>
          <div className='grid grid-cols-2 text-xl font-bold text-center gap-x-10'>
            <h2>System Permissions</h2>
            <h2>Selected Permissions</h2>
          </div>
          <DragDropContext onDragEnd={handleDragAndDrop}>
            {isFetching && <LoadingCircle></LoadingCircle>}
            {!isFetching && data && data?.permissionsSelected && data?.permissionsUnSelected && (
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
                        className='grid max-h-[600px] grid-cols-3 gap-4 no-scrollbar px-2 py-3 overflow-y-auto border rounded-lg grid-rows-auto'
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
                                className={`row-span-1 flex items-center h-[70px] p-2 border rounded-lg border-neutral-black ${
                                  snapshot.isDragging ? 'dragged' : ''
                                } ${selectedItem.sectionId == section.id && selectedItem.items.has(`${item.function}.${item.command}`) ? 'bg-neutral-300' : ''}`}
                                onClick={() => handleOnClickChecked(`${item.function}.${item.command}`, section.id)} // Pass both item.id and section.id
                              >
                                <Drag className='flex-shrink-0 w-6 h-6 mr-2'></Drag>
                                <span className='text-xs font-medium lg:text-sm'>{`${item.function} ${item.command}`}</span>
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
            )}
          </DragDropContext>
        </div>
        <Button type='submit' variant={'custom'} className='mt-auto' onClick={handleOnClickUpdate}>
          Ok
        </Button>
      </DialogContent>
    </Dialog>
  )
}
