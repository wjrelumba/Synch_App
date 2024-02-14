import Navbar from '@/app/components/client/navbar'
import Requests from '@/app/components/client/requestsComponent/requests'
import Link from 'next/link'
import React from 'react'

export default function Messages() {
  return (
    <>
        <Navbar />
        <Requests />
        <Link href={'/dashboard'}>
          <div className='flex justify-center'>
            <h1 className='text-2xl'>Go Back</h1>
          </div>
        </Link>
    </>
  )
}
