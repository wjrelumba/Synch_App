'use client'
import React, { useEffect, useState } from 'react'
import ToastLayout from '../essentials/toastlayout'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function ChangePass() {
    const router = useRouter()
    const [oldPass, setOldPass] = useState<any>("")
    const [newPass, setNewPass] = useState<any>("")
    const [verifyNewPass, setVerifyNewPass] = useState<any>("")

    const oldPassHandler = async (e:any) => {
        const dataSend = {
            oldPass: e.target.value
        }
        const response = await fetch('/api/changePass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSend)
        })
        const result = await response.json()
        if(result.success !== undefined){
            toast.success(result.success)
            setOldPass(e.target.value)
        }
        if(result.error !== undefined){
            const oldPassRef:any = document.getElementById('oldPass')
            oldPassRef.value = ''
            toast.error(result.error)
            setOldPass('')
        }
    }

    const newPassHandler = (e:any) => {
        setNewPass(e.target.value)
    }

    const verifyNewPassHandler = (e:any) => {
        setVerifyNewPass(e.target.value)
    }

    const changePassBtn = async() => {
        if(newPass == verifyNewPass){
            try {
                const dataSend = {
                    newPass: newPass,
                }
                const response = await fetch('/api/changePass', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataSend)
                })
                const result = await response.json()
                toast.success(result.success)
                const btnRef:any = document.getElementById('changeBtn')
                btnRef.disabled = true
                setTimeout(() => { router.push("/dashboard") }, 1000)
            } catch (error) {
                
            }
        }
        if(newPass != verifyNewPass){
            toast.error("New password do not match")
        }
    }

    useEffect(() => {

    }, [oldPass])
    useEffect(() => {

    }, [newPass])
    useEffect(() => {

    }, [verifyNewPass])
  return (
    <>
    <ToastLayout>
    <div className='flex justify-center'>
            <div className='flex flex-col items-center'>
                <div>
                    <h1 className='text-3xl font-mono mb-10'>Change Password</h1>
                </div>
                <div className='flex bg-synchGray-150 rounded-2xl py-2 px-[10rem]'>
                    <div className='flex flex-col items-start w-full'>
                        <div className='flex w-[80%] flex-col items-center'>
                            <div className='flex items-center mt-10 mb-4'>
                                <label htmlFor="oldPass" className='mr-2'>Old Password:</label>
                                <input onBlur={oldPassHandler} type="password" required name="oldPass" id="oldPass" className='text-black w-fit border rounded-md px-2 py-1' />
                            </div>
                            <div className='flex items-center mb-4'>
                                <label htmlFor="newPass" className='mr-2'>New Password:</label>
                                <input onBlur={newPassHandler} type="password" name="newPass" id="newPass" className='text-black w-fit border rounded-md px-2 py-1' />
                            </div>
                            <div className='flex items-center mb-10'>
                                <label htmlFor="verifyNewPass" className='mr-2'>Verify New Password:</label>
                                <input onBlur={verifyNewPassHandler} type="password" name="verifyNewPass" id="verifyNewPass" className='text-black w-fit border rounded-md px-2 py-1' />
                            </div>
                            <div className='flex items-center w-full mb-10'>
                                <button onClick={changePassBtn} id='changeBtn' className='bg-synchGray-50 hover:bg-synchGray-100 px-2 font-mono w-full py-2 rounded-xl'>Change Password</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </ToastLayout>
    </>
  )
}
