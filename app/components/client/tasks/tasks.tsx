'use client';
import React, { useEffect, useState } from 'react'


function Tasks(task_id:any) {
    const [members, setMembers] = useState<any>(null)
    const [taskName, setTaskName] = useState<any>(null)
    const [loading, setLoading] = useState<any>(true)

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
        getTaskName()
        getMembers()
    }, [])
    useEffect(() => {
    }, [members])
    useEffect(() => {
    }, [taskName])
  return (
    <div>
        {loading && (
            <>
                Task data loading...
            </>
        )}
        <br />
        {!loading && taskName && (
            <h1>Task Name: {taskName}</h1>
        )}
        {!loading && members && (
            <ul>
                {members.map((member:any) => (
                    <li key={member.username}>- {member.name}</li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default Tasks