import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/custom/user-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid } from 'recharts'
import Instructor from '@/assets/instructor.jfif'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import Star from '@/icons/CourseDetail/Star'
import RatingStars from '@/components/RatingStars'
import { Users } from 'lucide-react'
import CourseTable from './components/CourseTable'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 }
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#588E58'
  },
  mobile: {
    label: 'Mobile',
    color: '#B3E8B2'
  }
} satisfies ChartConfig

export default function InstructorDetail() {
  return (
    <Layout>
      <Layout.Header>
        <div className='flex items-center ml-auto space-x-4'>
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Instructor Detail</h1>
          <div className='flex items-center space-x-2'>
            <Button>Export to CSV</Button>
          </div>
        </div>
        <div className='flex flex-col mt-5  w-full max-w-full md:max-w-[70vw] rounded-lg shadow-custom-shadow mx-auto py-5'>
          <img src={Instructor} className='w-[160px] h-[160px] object-cover rounded-full mx-auto' />
          <div className='px-4 mt-2'>
            <div className='text-center'>
              <h2 className='flex items-center justify-center gap-3 text-lg font-medium'>Tran Ky Hung</h2>
              <p className='my-2 text-sm font-medium'>example@gmail.com</p>
              <div className='p-2 mx-auto text-sm text-white rounded-lg bg-primary-1 w-fit'>Activated</div>
            </div>
            <Tabs defaultValue='information' className='w-full mt-5 '>
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value='information'>Information</TabsTrigger>
                <TabsTrigger value='total-revenue'>Total Revenue</TabsTrigger>
                <TabsTrigger value='activity'>Activity Analysis</TabsTrigger>
              </TabsList>
              <TabsContent value='information' className='min-h-[200px] '>
                <div className='grid gap-3 py-5 font-semibold sm:grid-cols-2'>
                  <p className='my-3'>
                    Title: {''}
                    <span className='font-medium'>Mr.</span>
                  </p>
                  <p className='my-3'>
                    Joining Date: <span className='font-medium'>29 Aug 2019</span>
                  </p>
                  <p className='my-3'>
                    Education: <span className='font-medium'>Greenwich University</span>
                  </p>
                  <p className='font-semibold'>
                    Description:{' '}
                    <span className='font-normal'>
                      As it so contrasted oh estimating instrument. Size like body someone had. Are conduct viewing boy
                      minutes warrant the expense Tolerably behavior may admit daughters offending her ask own. Praise
                      effect wishes change way and any wanted. Lively use looked latter regard had. Do he it part more
                      last in
                    </span>
                  </p>
                  <div className='flex items-center gap-2'>
                    <span>Average Ratings: </span>
                    <RatingStars count={5} wrapperClass='gap-x-1'></RatingStars>
                  </div>
                  <div className='flex items-center gap-2'>
                    Students:
                    <span>40</span>
                    <Users className='w-4 h-4 font-medium'></Users>
                  </div>
                </div>
                <div>
                  <Separator></Separator>
                  <h2 className='my-5 text-lg font-semibold text-center ms:text-xl text-neutral-black'>
                    Outstanding Achievements
                  </h2>
                  <div className='text-center'>Currently dont have any achievements</div>
                </div>
              </TabsContent>
              <TabsContent value='total-revenue'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                    <CardTitle className='text-sm font-medium'>Total Instructors</CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='w-4 h-4 text-muted-foreground'
                    >
                      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                      <circle cx='9' cy='7' r='4' />
                      <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+2350</div>
                    <p className='text-xs text-muted-foreground'>+180.1% from last month</p>
                    <ChartContainer config={chartConfig} className='max-h-[300px] min-h-[150px] w-full'>
                      <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
                        <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value='activity'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                    <CardTitle className='text-sm font-medium'>Total Instructors</CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='w-4 h-4 text-muted-foreground'
                    >
                      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                      <circle cx='9' cy='7' r='4' />
                      <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+2350</div>
                    <p className='text-xs text-muted-foreground'>+180.1% from last month</p>
                    <ChartContainer config={chartConfig} className='max-h-[300px] min-h-[150px] w-full'>
                      <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
                        <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className='py-5'>
          <h2 className='text-2xl font-bold tracking-tight'>Courses</h2>
          <CourseTable></CourseTable>
        </div>
      </Layout.Body>
    </Layout>
  )
}
