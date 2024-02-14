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
    const [username, setUsername] = useState<any>(null)

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
    })
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
            }
            if(resultResponse.error !== undefined){
                toast.error(resultResponse.error)
            }
        } catch (error) {
            
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
                <h1>Task Name: {taskName}</h1>
            </>
        )}
        {!loading && members && (
            <>
            <ul>
                {members.map((member:any) => (
                    <li key={member.username}>- {member.name}</li>
                ))}
            </ul>
            <button onClick={goBack}>Go back</button> <br />
            </>
        )}
        <button onClick={addMember}>Add a member</button> <br />
        {addNewMember && (
            <>
                <div className='flex justify-center align-middle'>
                    <div className='bg-synchBlue-50 rounded-lg p-40 transition-all duration-300'>
                        <form method='POST' id='addMemberForm'>
                            <div className='mb-8'>
                                <label htmlFor="username" className='text-2xl'>Username: </label>
                                <input type="text" name="username" id="username" className='text-black border-synchGray-200 rounded px-3 py-2' onChange={unameHandler}/>
                            </div>
                            <button onClick={btnSubmit} className='px-1 py-2 bg-synchBlue-50 rounded-lg hover:bg-synchBlue-100'>Add the member to task</button>
                        </form>
                    </div>
                </div>
            </>
        )}
    </ToastLayout>
  )
}
