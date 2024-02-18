'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function TasksList({task_id}:any) {
    const router = useRouter()
    const [tasks, setTasks] = useState<any>(null)
    const [loading, setLoading] = useState<any>(true)

    useEffect(() => {
        const getTasks = async () => {
            try {
                const dataSend = {
                    task_id: task_id
                }
                const response = await fetch('/api/getTasksDetails',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataSend)
                })
                const result = await response.json()
                setTasks(result)
                console.log(result)
            } catch (error) {
                
            } finally {
                setLoading(false)
            }
        }
        getTasks()
    }, [])
    useEffect(() => {
    }, [tasks])

    const markDone = async (task_id:any, task_detail_id:any, task_deadline:any) => {
        try {
            const dataSend = {
                task_id: task_id,
                task_detail_id: task_detail_id,
                task_status: 1,
                task_deadline: task_deadline
            }
            const response = await fetch('/api/updateTaskStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSend)
            })
            const result = await response.json()
            router.push(`/dashboard`)
        } catch (error) {
            
        }
    }
    const markNotDone = async (task_id:any, task_detail_id:any, task_deadline:any) => {
        try {
            const dataSend = {
                task_id: task_id,
                task_detail_id: task_detail_id,
                task_status: 0,
                task_deadline: task_deadline
            }
            const response = await fetch('/api/updateTaskStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSend)
            })
            const result = await response.json()
            router.push(`/dashboard`)
        } catch (error) {
            
        }
    }
  return (
    <>
        <div className='flex h-full w-full'>
            {loading && (
                <>
                <div>
                    <h1>Data Loading...</h1>
                </div>
                </>
            )}
            {!loading && tasks && (
                <>
                <div className='flex justify-end mt-5 mr-5 w-full sm:w-full md:w-full lg:w-full xl:w-full'>
                    <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 w-full sm:ml-1 sm:w-full px-1 lg:ml-5">
                    {(tasks.length < 1) && (
                        <div className='flex'>
                            <h1 className='text-2xl font-mono'>No Tasks available...</h1>
                        </div>
                    )}
                    {tasks.map((task: any) => (
                        <div key={task.task_detail_id} className="flex bg-synchGray-100 p-4 ml-2 h-full rounded-lg w-[100%] sm:w-[100%] xl:w-full">
                            <div className='flex justify-center w-full items-center flex-col'>
                                <div className='flex flex-col items-center'>
                                    <h1 className='text-3xl font-mono sm:text-xl md:text-3xl'>{task.task_detail_name}</h1>
                                    <h1 className='font-mono text-center mt-5'>{task.task_detail_info}</h1>
                                </div>
                                {(task.task_status == 0) && (
                                    <div className='flex items-end mt-10'>
                                        <button onClick={() => {markDone(task.task_id, task.task_detail_id, task.task_deadline)}} className='px-4 py-2 bg-synchGray-50 hover:bg-synchGray-150 rounded-xl'>Mark as done</button>
                                    </div>
                                )}{(task.task_status == 1) && (
                                    <div className='flex items-end mt-10'>
                                        <button onClick={() => {markNotDone(task.task_id, task.task_detail_id, task.task_deadline)}} className='px-4 py-2 bg-synchGray-50 hover:bg-synchGray-150 rounded-xl'>Undo mark as done</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                </>
            )}
        </div>
    </>
  )
}
