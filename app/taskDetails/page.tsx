'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ToastLayout from '../components/essentials/toastlayout'
import { toast } from 'react-toastify'
import Navbar from '../components/client/navbar'

export default function TasksDetails({ searchParams }: { searchParams: { task_id: string } }) {
    const router = useRouter()
    const [members, setMembers] = useState<any>(null)
    const [taskName, setTaskName] = useState<any>(null)
    const [loading, setLoading] = useState<any>(true)
    const [addNewMember, setAddNewMember] = useState<any>(false)
    const [removeMember, setRemoveMember] = useState<any>(false)
    const [username, setUsername] = useState<any>(null)

    if(searchParams.task_id != undefined){}

    useEffect(() => {
        const getTaskName = async () => {
            try {
                const dataSend = {
                    task_id: searchParams.task_id
                }
                const response = await fetch('/api/tasks/getTaskName', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataSend)
                })
                const result = await response.json()
                if(result.length !== undefined){
                    setTaskName(result[0].task_name)
                }
            } catch (error) {
                
            }
        }
        const getMembers = async () => {
            try {
                const dataSend = {
                    task_id: searchParams.task_id
                }
                const response = await fetch('/api/tasks/getTaskMembers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataSend)
                })
                const result = await response.json()
                if(result.length !== undefined){
                    console.log(result)
                    setMembers(result)
                    console.log(members)
                }
            } catch (error) {
                
            } finally {
                setLoading(false)
            }
        }
        getTaskName()
        getMembers()
    }, [])
    useEffect(() => {
    }, [members])
    useEffect(() => {
    }, [taskName])
    useEffect(() => {

    }, [username])
    const goBack = () => {
        router.back()
    }
    const addMember = () => {
        if(addNewMember == true){
            setAddNewMember(false)
        }
        if(addNewMember == false){
            setAddNewMember(true)
        }
        if(removeMember == true){
            setRemoveMember(false)
        }
    }
    const remMember = () => {
        if(removeMember == true){
            setRemoveMember(false)
        }
        if(removeMember == false){
            setRemoveMember(true)
        }
        if(addNewMember == true){
            setAddNewMember(false)
        }
    }
    const unameHandler = (e:any) => {
        const usernameRef = e.target.value
        setUsername(usernameRef)
    }
    const btnSubmit = async () => {
        const addMemberRef:any = document.getElementById('addMemberForm')
        addMemberRef.addEventListener('submit', (e:any) => {
            e.preventDefault()
        })
        const userNameInputRef:any = document.getElementById('username')
        for(var i = 0; i < members?.length; i++){
            if(username === members[i].username){
                toast.error('User is already in the task')
                userNameInputRef.value = ''
                return null
            }
        }
        try {
            const dataSend = {
                username: username,
                task_id: searchParams.task_id
            }
            const response = await fetch('/api/addTaskMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSend)
            })
            const resultResponse = await response.json()
            if(resultResponse.success !== undefined){
                toast.success(resultResponse.success)
                const addMemBtnRef:any = document.getElementById('addMemBtn')
                addMemBtnRef.disabled = true
                setTimeout(() => { router.back() }, 2000)
            }
            if(resultResponse.error !== undefined){
                toast.error(resultResponse.error)
            }
        } catch (error) {
            
        }
    }
    const remBtn = async () => {
        const remMemberRef:any = document.getElementById('remMemberForm')
        remMemberRef.addEventListener('submit', (e:any) => {
            e.preventDefault()
        })
        const userNameInputRef:any = document.getElementById('remUsername')
        for(var i = 0; i < members?.length; i++){
            if(username === members[i].username){
                try {
                    const dataSend = {
                        username: username,
                        task_id: searchParams.task_id
                    }
                    const response = await fetch('/api/removeTaskMember', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataSend)
                    })
                    const resultResponse = await response.json()
                    if(resultResponse.success !== undefined){
                        toast.success(resultResponse.success)
                        const remMemBtnRef:any = document.getElementById("remMemBtn")
                        remMemBtnRef.disabled = true
                        setTimeout(() => { router.back() }, 2000)
                    }
                    if(resultResponse.error !== undefined){
                        toast.error(resultResponse.error)
                    }
                } catch (error) {
                    
                }
                return null
            }
        }
    }
  return (
    <ToastLayout>
        {loading && (
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-4xl text-center mb-8">Data Loading</h1>
            </div>
        )}
        {!loading && taskName && (
            <>
            <Navbar />
                <div className='flex justify-center'>
                    <div>
                        <h1 className='font-mono text-2xl mb-10 mt-10'>{taskName}</h1>
                    </div>
                </div>
            </>
        )}
        {!loading && members && (
            <>
            <div className='flex justify-start ml-5'>
                <div className='flex bg-synchGray-100 rounded-xl w-[25%] h-[20rem] flex-col'>
                    <div className='flex flex-col mt-10 items-center'>
                        <h1 className='text-xl font-mono mb-2'>Members:</h1>
                        <ul>
                        {members.map((member:any) => (
                            <li className='font-mono' key={member.username}>{member.name}</li>
                        ))}
                        </ul>
                        <div className='flex h-[10rem] items-end justify-center mr-1 ml-1 w-full px-1'>
                            <button className='bg-synchBlue-50 hover:bg-synchBlue-100 py-2 px-3 rounded-lg font-mono' onClick={goBack}>Go back</button> <br />
                            <button className='bg-synchBlue-50 hover:bg-synchBlue-100 py-2 px-3 rounded-lg font-mono' onClick={addMember}>Add a member</button>
                            <button className='bg-synchBlue-50 hover:bg-synchBlue-100 py-2 px-3 rounded-lg font-mono' onClick={remMember}>Remove member</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )}
        {addNewMember && (
            <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-50'>
                <div className='bg-synchBlue-50 rounded-lg py-20 px-20 transition-all duration-300'>
                    <div className='flex justify-center mb-10'>
                        <h1 className='text-3xl font-mono'>Add Member</h1>
                    </div>
                    <form method='POST' id='addMemberForm'>
                        <div className='flex flex-col mb-8'>
                            <label htmlFor="username" className='text-2xl mb-1'>Username: </label>
                            <input type="text" name="username" id="remUsername" className='text-black border-synchGray-200 rounded px-3 py-2' onChange={unameHandler}/>
                        </div>
                        <button onClick={btnSubmit} id='addMemBtn' className='px-1 py-2 font-mono bg-synchBlue-50 rounded-lg hover:bg-synchBlue-100'>Add the member to task</button>
                    </form>
                    <button className='bg-synchBlue-50 hover:bg-synchBlue-100 py-2 px-1 rounded-lg font-mono' onClick={addMember}>Cancel</button>
                </div>
            </div>
        )}
        {removeMember && (
            <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-50'>
                <div className='bg-synchBlue-50 rounded-lg py-20 px-20 transition-all duration-300'>
                    <div className='flex justify-center mb-10'>
                        <h1 className='text-3xl font-mono'>Remove Member</h1>
                    </div>
                    <form method='POST' id='remMemberForm'>
                        <div className='flex flex-col mb-8'>
                            <label htmlFor="username" className='text-2xl'>Username: </label>
                            <input type="text" name="username" id="username" className='text-black border-synchGray-200 rounded px-3 py-2' onChange={unameHandler}/>
                        </div>
                        <button onClick={remBtn} id='remMemBtn' className='px-1 font-mono py-2 bg-synchBlue-50 rounded-lg hover:bg-synchBlue-100'>Remove member</button>
                    </form>
                    <button className='bg-synchBlue-50 hover:bg-synchBlue-100 py-2 px-1 rounded-lg font-mono' onClick={remMember}>Cancel</button>
                </div>
            </div>
        )}
        {removeMember && (
            <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-50'>
                <div className='bg-synchBlue-50 rounded-lg py-20 px-20 transition-all duration-300'>
                    <div className='flex justify-center mb-10'>
                        <h1 className='text-3xl font-mono'>Remove Member</h1>
                    </div>
                    <form method='POST' id='remMemberForm'>
                        <div className='flex flex-col mb-8'>
                            <label htmlFor="username" className='text-2xl'>Username: </label>
                            <input type="text" name="username" id="username" className='text-black border-synchGray-200 rounded px-3 py-2' onChange={unameHandler}/>
                        </div>
                        <button onClick={remBtn} id='remMemBtn' className='px-1 font-mono py-2 bg-synchBlue-50 rounded-lg hover:bg-synchBlue-100'>Remove member</button>
                    </form>
                    <button className='bg-synchBlue-50 hover:bg-synchBlue-100 py-2 px-1 rounded-lg font-mono' onClick={remMember}>Cancel</button>
                </div>
            </div>
        )}
    </ToastLayout>
  )
}
