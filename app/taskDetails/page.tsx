'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import ToastLayout from '../components/essentials/toastlayout'
import { toast } from 'react-toastify'
import Navbar from '../components/client/navbar'
import TasksList from '../components/client/taskDetails/tasksList'

export default function TasksDetails({ searchParams }: { searchParams: { task_id: string } }) {
    const addingTaskBtn:any = useRef(null)
    const router = useRouter()
    const [members, setMembers] = useState<any>(null)
    const [taskName, setTaskName] = useState<any>(null)
    const [loading, setLoading] = useState<any>(true)
    const [addNewMember, setAddNewMember] = useState<any>(false)
    const [removeMember, setRemoveMember] = useState<any>(false)
    const [addTaskShow, setAddTaskShow] = useState<any>(false)
    const [username, setUsername] = useState<any>(null)

    const [dateValue, setDateValue] = useState<any>(null)

    const [descriptionValue, setDescriptionValue] = useState<any>(null)
    const [titleValue, setTitleValue] = useState<any>(null)

    const [showAddTaskBtn, setShowAddTaskBtn] = useState<any>(false)

    const [yearValue, setYearValue] = useState<any>(null)
    const [monthValue, setMonthValue] = useState<any>(null)
    const [dayValue, setDayValue] = useState<any>(null)

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
    useEffect(() => {
    }, [yearValue])
    useEffect(() => {
    }, [monthValue])
    useEffect(() => {
    }, [dayValue])
    useEffect(() => {
    }, [descriptionValue])
    useEffect(() => {
    }, [titleValue])
    useEffect(() => {
    }, [dateValue])
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
    const addTask = () => {
        setShowAddTaskBtn(false)
        if(addTaskShow == true){
            setAddTaskShow(false)
        }
        if(addTaskShow == false){
            setAddTaskShow(true)
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
    const calendarHandler = (e:any) => {
        const dateToday = new Date()
        const yearToday = dateToday.getFullYear()
        const monthToday = dateToday.getMonth() + 1
        const dayToday = dateToday.getDate()
        console.log(yearToday,monthToday,dayToday)
        console.log(e.target.value)
        const calenderInput = e.target.value
        var year = ""
        var month = ""
        var day = ""
        var intYear = 0
        var intMonth = 0
        var intDay = 0
        for(var i=0; i < calenderInput.length; i++){
            if(i < 4){
                year += calenderInput[i]
                console.log(calenderInput[i])
                console.log(intYear)
            }
            if(i > 4 && i < 7){
                month += calenderInput[i]

            }
            if(i > 7 && i < 10){
                day += calenderInput[i]
                console.log(month)
            }
        }
        intYear = parseInt(year)
        intMonth = parseInt(month)
        intDay = parseInt(day)
        if(yearToday > intYear){
            setShowAddTaskBtn(false)
            toast.error("Not allowed")
        } else if(yearToday < intYear || yearToday == intYear){
            setYearValue(intYear)
            if(monthToday < intMonth || monthToday == intMonth){
                console.log(monthToday, intMonth)
                setMonthValue(intMonth)
                if(dayToday < intDay || dayToday == intDay || monthToday < intMonth){
                    setDayValue(intDay)
                    setShowAddTaskBtn(true)
                    setDateValue(`${year}-${month}-${day}`)
                }
                else {
                    setShowAddTaskBtn(false)
                    toast.error("Date must not be before today.")
                }
                
            } else {
                setShowAddTaskBtn(false)
            }
        }
    }

    const descHandler = (e:any) => {
        setDescriptionValue(e.target.value)
    }

    const titleHandler = (e:any) => {
        setTitleValue(e.target.value)
    }

    const addTaskBtn = async () => {
        try {
            const dataSend = {
                date: dateValue,
                desc: descriptionValue,
                title: titleValue,
                task_id: searchParams.task_id,
            }
            const response = await fetch('/api/addNewTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSend)
            })
            const result = await response.json()
            if(result.success !== undefined){
                toast.success(result.success)
                addingTaskBtn.current.disabled = true;
                setTimeout(() => { router.back() }, 2000)
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
                <div className='flex justify-center'>
                    <div>
                        <h1 className='font-mono text-2xl mb-10 mt-10'>{taskName}</h1>
                    </div>
                </div>
            </>
        )}
        {!loading && members && (
            <>
            <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row h-full'>
                <div className='flex justify-start px-5 py-1 min-w-[25rem] w-full sm:w-[75rem] md:w-[75rem] lg:w-full xl:w-1/2'>
                    <div className='flex items-center bg-synchGray-100 rounded-xl w-full sm:w-[100%] md:w-[100%] lg:w-[100%] h-[20rem] flex-col'>
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
                                <button className='bg-synchBlue-50 hover:bg-synchBlue-100 py-2 px-3 rounded-lg font-mono' onClick={addTask}>Add a task</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center w-full sm:w-[100%] md:w-[100%] lg:w-[100%]'>
                    <TasksList task_id={searchParams.task_id} className='h-full'/>
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
        {addTaskShow && (
                    <div className='absolute inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                        <div className='w-[30rem] sm:w-[40rem] lg:w-[50rem] h-[25rem] sm:h-[30rem] lg:h-[25rem] bg-synchGray-200 rounded-[3rem] p-10 transform transition-transform ease-in-out'>
                            <div className='flex flex-col justify-start items-center'>
                                <h1 className='text-3xl font-mono'>Add a new task</h1>
                                <label className='text-2xl mt-10' htmlFor="taskName">Task Name</label>
                                <input type="text" onBlur={titleHandler} className='bg-synchGray-50 py-2 px-2 font-mono rounded-2xl text-center' required/>
                                <label className='text-xl mt-2' htmlFor="description">Add a short description</label>
                                <textarea onBlur={descHandler} name="description" id="description" cols={90} rows={1} className='bg-synchGray-50 p-2 rounded-xl resize-none'></textarea>
                            </div>
                            <div className='flex flex-col h-[75%] w-full justify-start items-center'>
                                <label htmlFor="calendar" className='font-mono text-2xl'>Date</label>
                                <input type="date" id='calendar' className='bg-synchGray-100 p-2 rounded-xl font-mono' onBlur={calendarHandler} required/> 
                                {showAddTaskBtn && (
                                    <button ref={addingTaskBtn} className='bg-synchBlue-50 hover:bg-synchBlue-100 py-2 px-3 rounded-lg font-mono mt-1 text-xl' onClick={addTaskBtn}>Add task</button>
                                )}
                                <button className='bg-synchBlue-50 hover:bg-synchBlue-100 py-2 px-3 rounded-lg font-mono mt-1 text-xl' onClick={addTask}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
    </ToastLayout>
  )
}
