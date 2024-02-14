'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ToastLayout from '../components/essentials/toastlayout'
import { toast } from 'react-toastify'

export default function Page({ searchParams }: { searchParams: { team_id: string } }) {
    const [taskName, setTaskName] = useState<any>('')
    const router = useRouter()
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
      <form method='POST' id='newTaskForm'>
        <label htmlFor="taskName">Task Name: </label>
        <input id='taskNameInput' type="text" className='text-black' onChange={taskNameHandler}/> <br />
        <button id='addBtn' onClick={btnHandler}>Add Task</button>
      </form> <br />
        <button id='goBackBtn' onClick={goBack}>Go Back</button>
    </ToastLayout> 
  )
}
