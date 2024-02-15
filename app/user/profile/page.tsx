'use client'
import ChangePass from '@/app/components/client/changePass'
import Navbar from '@/app/components/client/navbar'
import React, { useEffect, useState } from 'react'

export default function Page() {
    const [userData, setUserData] = useState<any>(null)
    const [generalShow, setGeneralShow] = useState<any>(true)
    const [privacyShow, setPrivacyShow] = useState<any>(false)

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
    const genShowBtn = () => {
        setGeneralShow(true)
        setPrivacyShow(false)
    }

    const privacyShowBtn = () => {
        setGeneralShow(false)
        setPrivacyShow(true)
    }
  return (
    <>
    {userData && (
        <>
        <Navbar />
        <div className='flex flex-col'>
            <div className='flex py-4 justify-center'>
                <h1 className='text-3xl font-mono'>PROFILE PAGE</h1>
            </div>
            <div className='flex justify-start'>
            <div className='flex w-1/4 min-w-10 h-[80vh] min-h-[10vh] bg-synchGray-50'>
                <div className='flex flex-col w-full mt-5'>
                    <div className='flex justify-center '>
                        <button onClick={genShowBtn} className='text-xl font-mono w-full hover:bg-synchGray-100 py-2'>General</button>
                    </div>
                    <div className='flex justify-center'>
                        <button onClick={privacyShowBtn} className='text-xl font-mono w-full hover:bg-synchGray-100 py-2'>Privacy</button>
                    </div>
                </div>
            </div>
            <div className='flex w-full bg-synchGray-100 justify-center'>
                <div className='flex'>
                    <div className='flex mt-5'>
                    {generalShow && (
                        <div className='flex justify-center'>
                        <div className='flex flex-col items-start'>
                            <h1 className='text-4xl font-mono'>
                                User Profile
                            </h1>
                            <div className='flex flex-col justify-start'>
                                <h1 className='mt-10 text-3xl font-mono'>
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
                    </div>
                    )}
                    {privacyShow && (
                        <ChangePass />
                    )}
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>  
    )}
    </>
  )
}
