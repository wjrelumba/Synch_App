'use client';
import Link from 'next/link';
// This component is create a new user for the app
import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastLayout from '../components/essentials/toastlayout';
import { useRouter } from 'next/navigation';

type UserData = {
    name: String,
    username: String,
    organization: String,
    pass: String
}

const SignUp = () => {
    const router: any = useRouter()
    var nameValue: String = "";
    var unameValue: String = "";
    var passValue: String = "";
    var passVerifyValue: String = "";
    var orgValue: String = "";

    const nameHandler = (event: any) => {
        nameValue = event.target.value
    }

    const unameHandler = async (event: any) => {
        unameValue = event.target.value
        const dataToSend = {
            unameVerify: unameValue
        }
        const response = await fetch('api/verifiers/userNameVerify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        const result = await response.json()
        if(result.message != undefined){
            toast.success(result.message)
        } else if(result.error != undefined){
            toast.error(result.error)
            unameValue = ""
            event.target.value = ""
        }
    }
    
    const orgHandler = (event: any) => {
        orgValue = event.target.value
    }

    const passHandler = (event: any) => {
        passValue = event.target.value
    }

    const passVerifyHandler = (event: any) => {
        passVerifyValue = event.target.value
    }

    const submit = async () => {
        const dataToSend: UserData = {
            name: nameValue,
            username: unameValue,
            organization: orgValue,
            pass: passValue
        }
        try {
            if(passValue == passVerifyValue && nameValue != "" && unameValue != "" && passValue != "" && orgValue != ""){
                const response = await fetch('/api/userSignUp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                })
                toast.success("Account successfully created!")
                setTimeout(() => { router.push('/') }, 1000)
            } else if(passValue != passVerifyValue){
                toast.error('Passwords do not match.')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const homePageBtn = () => {
        router.push('/')
    }
  return (
    <>
        <ToastLayout>
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl mb-8 font-mono">Create an account to start using Synch</h1>
            <div className="bg-synchGray-100 rounded-lg p-8 w-full max-w-md"> 
                <form method="POST">
                    <div className="flex flex-col mb-4"> 
                        <label htmlFor="name" className="font-mono mb-2">Name:</label>
                        <input type="text" onBlur={nameHandler} className="text-black border border-gray-400 rounded px-3 py-2" required/>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="uname" className="font-mono mb-2">Username:</label>
                        <input type="text" onBlur={unameHandler} className="text-black border border-gray-400 rounded px-3 py-2" required/>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="org" className="font-mono mb-2">Organization:</label>
                        <input type="text" onBlur={orgHandler} className="text-black border border-gray-400 rounded px-3 py-2" required/>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="pass" className="font-mono mb-2">Password:</label>
                        <input type="password" onBlur={passHandler} className="text-black border border-gray-400 rounded px-3 py-2" required/>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="verify-pass" className="font-mono mb-2">Verify Password:</label>
                        <input type="password" onBlur={passVerifyHandler} className="text-black border border-gray-400 rounded px-3 py-2" required/>
                    </div>
                    <div className='flex justify-center'>
                        <button onClick={submit} className="bg-synchBlue-50 font-mono hover:bg-synchBlue-100 min-w-40 text-white font-bold py-2 px-4 rounded mr-1">
                            Create Account
                        </button>
                        <button onClick={homePageBtn} type='button' className="bg-synchGray-150 font-mono hover:bg-synchGray-200 min-w-40 text-white font-bold py-2 px-4 rounded ml-1">
                        Go Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </ToastLayout>
    </>
  )
}

export default SignUp