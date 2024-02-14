'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ToastLayout from '../components/essentials/toastlayout'
import { toast } from 'react-toastify'
import Navbar from '../components/client/navbar'

export default function Page({ searchParams }: { searchParams: { team_id: string } }) {
    const [taskName, setTaskName] = useState<any>('')
    const router = useRouter()
    if(searchParams.team_id != undefined){}
    const successFunction = () => {
      const btnAddRef:any = document.getElementById('addBtn')
      const taskNameRef:any = document.getElementById('taskNameInput')
      btnAddRef.disabled = true
      taskNameRef.disabled = true
    }
    const goBack = () => {
        router.back()
    }
    const taskNameHandler = async (e:any) => {
      setTaskName(e.target.value)
    }
  const btnHandler = async () => {
    const formRef = document.getElementById('newTaskForm')
    formRef?.addEventListener('submit', (e:any) => {
      e.preventDefault()
    })
    try {
      const dataSend = {
        team_id: searchParams.team_id,
        task_name: taskName
      }
      const response = await fetch('/api/tasks/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataSend)
      })
      const result = await response.json()
      if(result.success !== undefined){
        toast.success(result.success)
        successFunction()
        setTimeout(() => { router.back() }, 3000)
      }
      if(result.error !== undefined){
        toast.error(result.error)
      }
    } catch (error) {
      
    }
  }
  useEffect(() => {

  }, [taskName])
  return (
    <ToastLayout>
      <Navbar />
      <div className='flex justify-center items-center mt-10'>
        <div className='flex flex-col bg-synchGray-100 rounded-lg px-10 py-6'>
          <form method='POST' id='newTaskForm'>
            <label className='text-xl font-mono' htmlFor="taskName">Task Name: </label>
            <input id='taskNameInput' type="text" className='text-black font-mono rounded-lg px-3 py-1 border-yellow-700' onChange={taskNameHandler}/> <br />
            <div className='flex justify-center mt-6'>
              <button className='bg-synchBlue-50 hover:bg-synchBlue-100 px-4 font-mono py-3 rounded-lg min-w-[9rem] mr-1' id='addBtn' onClick={btnHandler}>Add Task</button>
              <button className='bg-synchBlue-50 hover:bg-synchBlue-100 px-4 font-mono py-3 rounded-lg min-w-[9rem] ml-1' type="button" id='goBackBtn' onClick={goBack}>Go Back</button>
            </div>
          </form> <br />
        </div>
      </div>
    </ToastLayout> 
  )
}
