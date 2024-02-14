'use client';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';
import ToastLayout from '../essentials/toastlayout';
import Link from 'next/link';

 
type UserData = {
    username: String,
    password: String
}

const LogIn = () => {
    const router: any = useRouter()
    var unameValue: string = "";
    var passValue: string = "";
    const unameHandler = (event: any) => {
        unameValue = event.target.value
    }

    const passHandler = (event: any) => {
        passValue = event.target.value
    }

    const btnFunction = async () => {
        const loginFormRef = document.getElementById('loginForm')
        loginFormRef?.addEventListener('submit', (e:any) => {
            e.preventDefault()
        })
        if(unameValue !== "" || passValue !== ""){
            const dataToSend: UserData = {
                username: unameValue,
                password: passValue,
            }
            try {
                const response = await fetch('/api/createSession', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                })
                const result = await response.json()
                if(result.success !== undefined){
                    setTimeout(() => { router.push('/dashboard') }, 500)
                }
                if(result.error !== undefined){
                    toast.error(result.error)
                }
                console.log(result)
            } catch (error) {
                console.log(error)
            }
        }
        else{
            toast.error("Please fill out all fields")
        }
    }
    const signUpBtn = () => {
        router.push('/signup')
    }
  return (
    <>
        <ToastLayout>
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-gray-900 rounded-[1rem] p-8">
                <div className='flex flex-col justify-center items-center'>
                    <h1 className="text-6xl mb-2 font-mono">SYNCH</h1>
                    <h1 className='text-3xl mb-8 font-mono'>A Collaboration Tool</h1>
                </div>
                <div className='flex justify-center'>
                    <form method="POST" id="loginForm" className="text-black">
                        <div className='flex flex-col mb-5'>
                        <label htmlFor="username" className='text-white'>Username:</label>
                        <input type="text" name="username" id="username" onChange={unameHandler} className="block mb-4 px-2 rounded-lg" />
                        <label htmlFor="password" className='text-white'>Password:</label>
                        <input type="password" name="password" id="password" onChange={passHandler} className="block mb-4 px-2 rounded-lg" />
                        </div>
                        <div className='flex flex-row justify-between'>
                            <button onClick={btnFunction} className="bg-synchBlue-50 hover:bg-synchBlue-100 text-white font-bold py-3 px-4 rounded mr-1 w-44">
                                Log in
                            </button>
                            <button onClick={signUpBtn} className="bg-synchGray-50 hover:bg-synchGray-100 text-white font-bold py-3 px-4 rounded ml-1 w-44">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </ToastLayout>
    </>
  )
}

export default LogIn