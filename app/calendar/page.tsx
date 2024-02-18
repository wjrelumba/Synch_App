import React from 'react'
import CalendarPage from '../components/client/calendar/calendarPage'
import Navbar from '../components/client/navbar'

export default function page() {
  return (
    <>
        <Navbar />
        <div className='flex justify-end'>
            <div className='flex'>
                <CalendarPage />
            </div>
        </div>
    </>
  )
}