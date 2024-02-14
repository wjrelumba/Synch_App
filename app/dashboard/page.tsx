'use client'
import React, { useEffect, useState } from 'react'
import ToastLayout from '../components/essentials/toastlayout'
import CheckingGroups from '../components/client/checkingGroups'
import Requests from '../components/client/requestsComponent/requests'
import LogoutBtn from '../components/client/buttons/logout'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '../components/client/navbar'

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState<any>(true)
  const [userCookie, setUserCookie] = useState<any>(null)
  useEffect(() => {
    const verifyUser = async() => {
      try {
        const response = await fetch('/api/authentication/homePageCreds')
        const result = await response.json()
        if(result.cookieExist == true){
          setUserCookie(true)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    verifyUser()
  }, [])
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
          {!loading && userCookie && (
            <>
              <Navbar />
              <CheckingGroups /> <br />
            </>
          )}
          {!loading && !userCookie && (
            <>
              <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-4xl text-center mb-8">Restricted Access.</h1>
                <Link href={'/'} className="text-sm">Go back to landing page</Link>
              </div>
            </>
          )}
        </ToastLayout>
    </>
  )
}
