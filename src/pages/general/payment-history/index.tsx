import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const fakeData = {
  courses: [
    { id: 1, name: 'React Basics', date: '2024-12-01', price: '$49.99', paymentType: 'Credit Card' },
    { id: 2, name: 'Advanced TypeScript', date: '2024-11-15', price: '$59.99', paymentType: 'PayPal' },
    { id: 3, name: 'UI/UX Design', date: '2024-11-05', price: '$39.99', paymentType: 'Credit Card' }
  ],
  subscriptions: [
    { id: 4, name: 'Monthly Plan', date: '2024-12-01', price: '$19.99', paymentType: 'Debit Card' },
    { id: 5, name: 'Annual Plan', date: '2024-01-01', price: '$199.99', paymentType: 'PayPal' }
  ],
  refunds: [
    {
      id: 6,
      name: 'Make an E-Commerce Website with Blazor WebAssembly in .NET 6',
      date: '2024-05-03',
      amount: '₫249,000',
      refundedTo: 'TechEdu Credit',
      status: 'Succeeded'
    },
    {
      id: 7,
      name: 'Kafka Event Driven Microservices With Java + Spring [Part-2]',
      date: '2024-04-13',
      amount: '₫249,000',
      refundedTo: 'TechEdu Credit',
      status: 'Succeeded'
    }
  ]
}

export default function PurchaseHistory() {
  const [activeTab, setActiveTab] = useState<'courses' | 'refunds'>('courses')

  const data = fakeData[activeTab]

  return (
    <div className='relative h-full p-6 overflow-y-auto bg-white rounded-xl no-scrollbar'>
      <h1 className='mb-4 text-xl font-bold'>Purchase history</h1>
      <Tabs
        defaultValue='courses'
        className='w-full'
        onValueChange={(value) => setActiveTab(value as 'courses' | 'refunds')}
      >
        <TabsList>
          <TabsTrigger value='courses'>Courses</TabsTrigger>
          <TabsTrigger value='refunds'>Refunds</TabsTrigger>
        </TabsList>

        <TabsContent value='courses'>
          <PurchaseTable data={data} type='courses' />
        </TabsContent>

        <TabsContent value='subscriptions'>
          <PurchaseTable data={data} type='subscriptions' />
        </TabsContent>

        <TabsContent value='refunds'>
          <RefundTable data={data} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PurchaseTable({ data, type }: { data: any[]; type: 'courses' | 'subscriptions' }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[400px]'>{type === 'courses' ? 'Course' : 'Subscription Plan'}</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead>Payment Type</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className='flex flex-col'>
              <span className='text-base font-bold'>{item.name}</span>
              <Accordion type='single' collapsible className='w-full'>
                <AccordionItem value='item-1' className='border-0'>
                  <AccordionTrigger>View all courses</AccordionTrigger>
                  <AccordionContent>
                    <div className='flex items-center justify-between mt-4'>
                      <span className='flex flex-col'>
                        <span className='text-base font-semibold'>ReactJS</span>
                        <div className='mt-1 text-sm cursor-pointer text-primary-1'>Request a refund</div>
                      </span>
                      <span>$40</span>
                    </div>
                    <div className='flex items-center justify-between mt-4'>
                      <span className='flex flex-col'>
                        <span className='text-base font-semibold'>ReactJS</span>
                        <div className='mt-1 text-sm cursor-pointer text-primary-1'>Request a refund</div>
                      </span>
                      <span>$40</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.paymentType}</TableCell>
            <TableCell>
              <button className='text-blue-500 hover:underline'>Receipt</button>
              <button className='ml-2 text-blue-500 hover:underline'>Invoice</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function RefundTable({ data }: { data: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Course</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Refunded To</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className='flex items-center'>
                <span className='mr-2 text-xl text-green-500'>✔</span>
                <span>{item.name}</span>
              </div>
            </TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.amount}</TableCell>
            <TableCell>{item.refundedTo}</TableCell>
            <TableCell>{item.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
