'use client'
import Navbar from '@/app/components/client/navbar'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [userData, setUserData] = useState<any>(null)

    useEffect(() => {
        const getUserData = async() => {
            const response = await fetch('/api/getUserData', {
                method: 'POST'
            });
            const result = await response.json()
            setUserData(result[0])
        }
        getUserData()
    }, [])

    useEffect(() => {

    }, [userData])
  return (
    <>
    {userData && (
        <>
        <Navbar />
        <div className='flex justify-center'>
            <div className='flex flex-col items-center'>
                <h1 className='text-3xl font-mono'>
                    User Profile
                </h1>
                <h1 className='text-xl font-mono'>
                    Name: {userData.name}
                </h1>
                <h1 className='text-xl font-mono'>
                    Username: {userData.username}
                </h1>
                <h1 className='text-xl font-mono'>
                    Organization: {userData.organization}
                </h1>
            </div>
        </div>
        </>  
    )}
    </>
  )
}
