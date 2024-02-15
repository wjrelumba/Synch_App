'use client';
import React, { useEffect, useState } from 'react'


function Tasks(task_id:any) {
    const [members, setMembers] = useState<any>(null)
    const [taskName, setTaskName] = useState<any>(null)
    const [loading, setLoading] = useState<any>(true)
    const [taskQuantity, setTaskQuantity] = useState<any>(0)

    useEffect(() => {
        const getTaskName = async () => {
            try {
                const dataSend = {
                    task_id: task_id.task_id
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
                    task_id: task_id.task_id
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
        const getTaskQuantity = async() => {
            try {
                const dataSend = {
                    task_id: task_id.task_id
                }
                const response = await fetch('/api/getTaskQuantity', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataSend)
                })
                const result = await response.json()
                setTaskQuantity(result)
            } catch (error) {
                
            }
        }
        getTaskName()
        getMembers()
        getTaskQuantity()
    }, [])
    useEffect(() => {
    }, [members])
    useEffect(() => {
    }, [taskName])
    useEffect(() => {
    },[taskQuantity])
  return (
    <div>
        {loading && (
            <>
                Task data loading...
            </>
        )}
        <br />
        <div className='flex flex-col items-center h-full w-full'>
        {!loading && taskName && (
            <h1 className='text-2xl font-mono mb-9'>{taskName}</h1>
        )}
        {!loading && members && (
            <>
            <div className='flex flex-col items-center h-[3.5rem] w-full'>
                <div className='flex overflow-hidden'>
                    <ul>
                        {members.map((member:any) => (
                            <li key={member.username}>- {member.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            </>
        )}
        <div className='flex'>
            <h1 className='font-mono'>0/{taskQuantity} Tasks Completed</h1>
        </div>
        </div>
    </div>
  )
}

export default Tasks