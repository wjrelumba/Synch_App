'use client';
import Navbar from '@/app/components/client/navbar';
import ToastLayout from '@/app/components/essentials/toastlayout';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function MessageDetails({ searchParams }: { searchParams: { req_id: string } }) {
    const router = useRouter()
    const [authenticated, setAuthenticated] = useState<any>(false)
    const [requestDetails, setRequestDetails] = useState<any>(null)
    const [loading, setLoading] = useState<any>(true)
    useEffect(() => {
        const checkUserDetail = async () => {
            try {
                const dataSend = {
                    req_id: searchParams.req_id
                }
                const response = await fetch('/api/authentication/checkUserInTeam', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataSend)
                })
                const result = await response.json()
                setAuthenticated(result.authenticated)
            } catch (error) {
                
            }
        }

        const fetchDataFromDB = async () => {
            try {
                const dataSend = {
                    req_id: searchParams.req_id
                }
                const response = await fetch('/api/requests/getReqDetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataSend)
                })
                const result = await response.json()
                console.log(result)
                if(result[0].req_info !== undefined){
                    setRequestDetails(result)
                    console.log(requestDetails)
                }
            } catch (error) {
                
            } finally {
                setLoading(false)
            }
        }
        fetchDataFromDB()
        checkUserDetail()
        console.log(searchParams.req_id)
    })

    useEffect(() => {
    }, [requestDetails])

    useEffect(() => {
        console.log(authenticated)
    }, [authenticated])

    const acceptBtn = async () => {
        try {
            const dataSend = {
                req_id: searchParams.req_id,
                accept: true
            }
            const response = await fetch('/api/requests/acceptDeclineReq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSend)
            })
            const result = await response.json()
            toast.success(result)
            setTimeout(() => { router.push('/dashboard') }, 2000)
            const acceptBtnRef:any = document.getElementById('acceptBtn')
            const declineBtnRef:any = document.getElementById('declinetBtn')
            acceptBtnRef.disabled = true
            declineBtnRef.disabled = true
        } catch (error) {
            
        }
    }

    const declineBtn = async () => {
        try {
            const dataSend = {
                req_id: searchParams.req_id,
                accept: false
            }
            const response = await fetch('/api/requests/acceptDeclineReq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSend)
            })
            const result = await response.json()
            toast.error(result)
            setTimeout(() => { router.back() }, 2000)
            const acceptBtnRef:any = document.getElementById('acceptBtn')
            const declineBtnRef:any = document.getElementById('declinetBtn')
            acceptBtnRef.disabled = true
            declineBtnRef.disabled = true
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
        <ToastLayout>
            {loading && (
                <>
                    <div className="flex flex-col justify-center items-center h-screen">
                        <h1 className="text-4xl text-center mb-8">Data Loading</h1>
                    </div>
                </>
            )}
            {!authenticated && !loading && (
                <>
                    <div className="flex flex-col justify-center items-center h-screen">
                        <h1 className="text-4xl text-center mb-8">Restricted Access.</h1>
                        <Link href={'/'} className="text-sm">Go back</Link>
                    </div>
                </>
            )}
            {!loading && requestDetails && authenticated && (
                <>
                <Navbar />
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-3xl mb-10 mt-5'>
                        Message:
                    </h1>
                    <div className='flex flex-col bg-synchGray-100 rounded-lg py-10 px-44'>
                        <h1 className='text-2xl'>
                            {requestDetails[0].req_info}
                        </h1>
                        <br /> <br />
                        <div className='flex justify-center'>
                            <div className='px-3'>
                            <button className='bg-synchBlue-50 hover:bg-synchBlue-100 rounded-lg py-5 px-10' onClick={acceptBtn} id='acceptBtn'>Accept</button> <br />
                            </div>
                            <div className='px-3'>
                            <button className='bg-synchGray-150 hover:bg-synchGray-200 rounded-lg py-5 px-10' onClick={declineBtn} id='declineBtn'>Decline</button> <br />
                            </div> 
                        </div>
                        <br />
                        <Link href={'/user/messages'}>
                            <div className='flex justify-center'>
                                <h1 className='text-2xl'>Go Back</h1>
                            </div>
                        </Link>
                    </div>
                </div>
                </>
            )}
        </ToastLayout>
    </>
  )
}
