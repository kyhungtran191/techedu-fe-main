import { useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
import dayjs from 'dayjs'
import { conversations } from '@/pages/admin/chats/conversation.json'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/custom/search'
import ThemeSwitch from '@/components/custom/theme-switch'
import { UserNav } from '@/components/custom/user-nav'
import {
  AlbumIcon,
  ArrowLeft,
  Edit2,
  MessageCircle,
  Paperclip,
  Phone,
  Plus,
  SearchCheckIcon,
  Send,
  Video
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import ThreeDots from '@/icons/ThreeDots'
// Fake Data

type ChatUser = (typeof conversations)[number]
type Convo = ChatUser['messages'][number]

export default function Chats() {
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<ChatUser>(conversations[0])
  const [mobileSelectedUser, setMobileSelectedUser] = useState<ChatUser | null>(null)

  // Filtered data based on the search query
  const filteredChatList = conversations.filter(({ fullName }) =>
    fullName.toLowerCase().includes(search.trim().toLowerCase())
  )

  const currentMessage = selectedUser.messages.reduce((acc: Record<string, Convo[]>, obj) => {
    const key = dayjs(obj.timestamp).format('D MMM, YYYY')

    // Create an array for the category if it doesn't exist
    if (!acc[key]) {
      acc[key] = []
    }

    // Push the current object to the array
    acc[key].push(obj)

    return acc
  }, {})

  return (
    <Layout fixed>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <Search />
        <div className='flex items-center ml-auto space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='sm:overflow-hidden'>
        <section className='flex h-full gap-6'>
          {/* Left Side */}
          <div className='flex flex-col w-full gap-2 sm:w-56 lg:w-72 2xl:w-80'>
            <div className='sticky top-0 z-10 px-4 pb-3 -mx-4 shadow-md bg-background sm:static sm:z-auto sm:mx-0 sm:p-0 sm:shadow-none'>
              <div className='flex items-center justify-between py-2'>
                <div className='flex gap-2'>
                  <h1 className='text-2xl font-bold'>Inbox</h1>
                  <MessageCircle></MessageCircle>
                </div>

                <Button size='icon' variant='ghost' className='rounded-lg'>
                  <Edit2></Edit2>
                </Button>
              </div>

              <label className='flex items-center w-full h-12 pl-2 space-x-0 border rounded-md border-input focus-within:outline-none focus-within:ring-1 focus-within:ring-ring'>
                <SearchCheckIcon></SearchCheckIcon>
                <span className='sr-only'>Search</span>
                <input
                  type='text'
                  className='flex-1 w-full text-sm bg-inherit focus-visible:outline-none'
                  placeholder='Search chat...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
            </div>

            <div className='h-full p-3 -mx-3 overflow-auto'>
              {filteredChatList.map((chatUsr) => {
                const { id, profile, username, messages, fullName } = chatUsr
                const lastConvo = messages[0]
                const lastMsg = lastConvo.sender === 'You' ? `You: ${lastConvo.message}` : lastConvo.message
                return (
                  <Fragment key={id}>
                    <button
                      type='button'
                      className={cn(
                        `-mx-1 flex w-full rounded-md px-2 py-2 text-left text-sm hover:bg-secondary/75`,
                        selectedUser.id === id && 'sm:bg-muted'
                      )}
                      onClick={() => {
                        setSelectedUser(chatUsr)
                        setMobileSelectedUser(chatUsr)
                      }}
                    >
                      <div className='flex gap-2'>
                        <Avatar>
                          <AvatarImage src={profile} alt={username} />
                          <AvatarFallback>{username}</AvatarFallback>
                        </Avatar>
                        <div>
                          <span className='col-start-2 row-span-2 font-medium'>{fullName}</span>
                          <span className='col-start-2 row-span-2 row-start-2 line-clamp-2 text-ellipsis text-muted-foreground'>
                            {lastMsg}
                          </span>
                        </div>
                      </div>
                    </button>
                    <Separator className='my-1' />
                  </Fragment>
                )
              })}
            </div>
          </div>

          {/* Right Side */}
          <div
            className={cn(
              'absolute inset-0 left-full z-50 flex w-full flex-1 flex-col rounded-md border bg-primary-foreground shadow-sm transition-all duration-200 sm:static sm:z-auto sm:flex',
              mobileSelectedUser && 'left-0'
            )}
          >
            {/* Top Part */}
            <div className='flex justify-between flex-none p-4 mb-1 shadow-lg rounded-t-md bg-secondary'>
              {/* Left */}
              <div className='flex gap-3'>
                <Button
                  size='icon'
                  variant='ghost'
                  className='h-full -ml-2 sm:hidden'
                  onClick={() => setMobileSelectedUser(null)}
                >
                  <ArrowLeft></ArrowLeft>
                </Button>
                <div className='flex items-center gap-2 lg:gap-4'>
                  <Avatar className='size-9 lg:size-11'>
                    <AvatarImage src={selectedUser.profile} alt={selectedUser.username} />
                    <AvatarFallback>{selectedUser.username}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className='col-start-2 row-span-2 text-sm font-medium lg:text-base'>
                      {selectedUser.fullName}
                    </span>
                    <span className='block col-start-2 row-span-2 row-start-2 text-xs line-clamp-1 max-w-32 text-ellipsis text-nowrap text-muted-foreground lg:max-w-none lg:text-sm'>
                      {selectedUser.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className='flex items-center gap-1 -mr-1 lg:gap-2'>
                <Button size='icon' variant='ghost' className='hidden rounded-full size-8 sm:inline-flex lg:size-10'>
                  <Video></Video>
                </Button>
                <Button size='icon' variant='ghost' className='hidden rounded-full size-8 sm:inline-flex lg:size-10'>
                  <Phone></Phone>
                </Button>
                <Button size='icon' variant='ghost' className='h-10 rounded-md sm:h-8 sm:w-4 lg:h-10 lg:w-6'>
                  <ThreeDots></ThreeDots>
                </Button>
              </div>
            </div>

            {/* Conversation */}
            <div className='flex flex-col flex-1 gap-2 px-4 pt-0 pb-4 rounded-md'>
              <div className='flex flex-1 size-full'>
                <div className='relative flex flex-col flex-1 -mr-4 overflow-y-hidden chat-text-container'>
                  <div className='flex flex-col-reverse justify-start flex-grow w-full h-40 gap-4 py-2 pb-4 pr-4 overflow-y-auto chat-flex'>
                    {currentMessage &&
                      Object.keys(currentMessage).map((key) => (
                        <Fragment key={key}>
                          {currentMessage[key].map((msg, index) => (
                            <div
                              key={`${msg.sender}-${msg.timestamp}-${index}`}
                              className={cn(
                                'chat-box max-w-72 break-words px-3 py-2 shadow-lg',
                                msg.sender === 'You'
                                  ? 'self-end rounded-[16px_16px_0_16px] bg-primary/85 text-primary-foreground/75'
                                  : 'self-start rounded-[16px_16px_16px_0] bg-secondary'
                              )}
                            >
                              {msg.message}{' '}
                              <span
                                className={cn(
                                  'mt-1 block text-xs font-light italic text-muted-foreground',
                                  msg.sender === 'You' && 'text-right'
                                )}
                              >
                                {dayjs(msg.timestamp).format('h:mm a')}
                              </span>
                            </div>
                          ))}
                          <div className='text-xs text-center'>{key}</div>
                        </Fragment>
                      ))}
                  </div>
                </div>
              </div>
              <form className='flex flex-none w-full gap-2'>
                <div className='flex items-center flex-1 gap-2 px-2 py-1 border rounded-md border-input focus-within:outline-none focus-within:ring-1 focus-within:ring-ring lg:gap-4'>
                  <div className='space-x-1'>
                    <Button size='icon' type='button' variant='ghost' className='h-8 rounded-md'>
                      <Plus></Plus>
                    </Button>
                    <Button size='icon' type='button' variant='ghost' className='hidden h-8 rounded-md lg:inline-flex'>
                      <AlbumIcon></AlbumIcon>
                    </Button>
                    <Button size='icon' type='button' variant='ghost' className='hidden h-8 rounded-md lg:inline-flex'>
                      <Paperclip></Paperclip>
                    </Button>
                  </div>
                  <label className='flex-1'>
                    <span className='sr-only'>Chat Text Box</span>
                    <input
                      type='text'
                      placeholder='Type your messages...'
                      className='w-full h-8 bg-inherit focus-visible:outline-none'
                    />
                  </label>
                  <Button variant='ghost' size='icon' className='hidden sm:inline-flex'>
                    <Send></Send>
                  </Button>
                </div>
                <Button className='h-full sm:hidden'>Send</Button>
              </form>
            </div>
          </div>
        </section>
      </Layout.Body>
    </Layout>
  )
}
