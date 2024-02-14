'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Tasks from '../components/client/tasks/tasks';
import { useRouter } from 'next/navigation';
import Navbar from '../components/client/navbar';

export default function Page({ searchParams }: { searchParams: { data: string } }) {
    const [owner, setOwner] = useState<any>(null)
    const [admin, setAdmin] = useState<any>(null)
    const [tasks, setTasks] = useState<any>(null)
    const [teamName, setTeamName] = useState<any>(null)
    const [membersData, setMembersData] = useState<any>(null);
    const [authData, setAuthData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        const getTasks = async () => {
            try {
                const dataSend = {
                    team_id: searchParams.data
                }
                const response = await fetch('/api/getTasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataSend)
                })
                const result = await response.json()
                console.log(result)
                setTasks(result)
            } catch (error) {
                
            }
        }
        const getTeamName =async () => {
            try {
                const dataSend = {
                    team_id: searchParams.data
                }
                const response = await fetch('/api/getTeamName', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataSend)
                })
                const result = await response.json()
                setTeamName(result.team_name)
            } catch (error) {
                
            }
        }
        const getTeamData = async () => {
            var result: any = "";
            
            try {
                const dataToSend = {
                    team_id: searchParams.data,
                };
                const accessResponse = await fetch('/api/authentication/accessLevel', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                })
                if(accessResponse.ok){
                    const accessResult = await accessResponse.json()
                    if(accessResult[0] !== undefined){
                        if(accessResult[0].access_level == 3){
                            setOwner(true)
                            setAdmin(true)
                        } else if(accessResult[0].access_level == 2){
                            setOwner(false)
                            setAdmin(true)
                        } else {
                            setOwner(false)
                            setAdmin(false)
                        }
                    }
                    else{
                        setOwner(false)
                        setAdmin(false)
                    }
                }
                const response = await fetch('/api/getMembers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });
                if (response.ok) {
                    result = await response.json();
                    if(result[0]?.username != undefined){
                        setMembersData(result);
                        setAuthData(true)
                    }
                    if(result.authenticaed !== undefined){
                        setAuthData(result.message)
                        console.log(result)
                    }
                } else {
                    console.error('Error: ', response.status);
                }
            } catch (error) {
                console.error('Fetch Error: ', error);
            } finally {
                setLoading(false);
            }
        };
        getTasks();
        getTeamName();
        getTeamData();
    },);

    const addNewTaskFunc = () => {
        router.push(`/addTask?team_id=${encodeURIComponent(searchParams.data)}`)
    }

    const addNewMemberFunc = () => {
        router.push(`/addNewMember?team_id=${encodeURIComponent(searchParams.data)}`)
    }
    
    const goBackBtn = () => {
        router.push('/')
    }

    return (
        <div>
        {loading && (
            <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl text-center mb-8">Data Loading</h1>
            </div>
        )}
        {!loading && !authData && !membersData && (
            <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl text-center mb-8">Restricted Access.</h1>
            <Link href={'/'} className="text-sm">Go back to landing page</Link>
            </div>
        )}
        {!loading && membersData && authData && (
            <>
            <Navbar />
            <div className="flex flex-row justify-start items-start">
            <div className="flex flex-col justify-center w-1/2">
                <div className='flex flex-col items-center justify-center'>
                    <h1 className="text-3xl font-bold font-mono mb-8 mt-9">{teamName}</h1>
                    <div>
                        <div className='flex justify-center'>
                            <h1 className="text-2xl font-mono">Members:</h1>
                        </div>
                        <ul>
                            {membersData.map((member: any) => (
                                <div key={member.username} className='flex flex-col items-center justify-center'>
                                    <li>{member.name}</li>
                                </div>
                            ))}
                        </ul>
                    </div>
                <br />
                </div>
                <div className='flex justify-center'>
                {(owner || admin) && (
                    <div className="flex flex-row items-start"> 
                    <button className='flex py-2 px-7 rounded-lg mr-1 bg-synchBlue-50 hover:bg-synchBlue-150' onClick={addNewMemberFunc}>Add Member</button>
                    <button className='flex py-2 px-7 rounded-lg mr-1 bg-synchBlue-50 hover:bg-synchBlue-150' onClick={addNewTaskFunc}>Add Task</button>
                    <button className='flex py-2 px-7 rounded-lg bg-synchBlue-50 hover:bg-synchBlue-150' onClick={goBackBtn}>Go Back</button>
                    </div>
                )}
                {(!owner || !admin) && (
                    <div className='flex'>
                        <button className='flex py-2 px-5 rounded-lg bg-synchBlue-50 hover:bg-synchBlue-150' onClick={goBackBtn}>Go Back</button>
                    </div>
                )}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-1/2 max-w-screen-lg mt-9">
            {(tasks.length < 1) && (
                <div className='flex'>
                    <h1 className='text-2xl font-mono'>No tasks available...</h1>
                </div>
            )}
            {tasks.map((task: any) => (
                <div key={task.task_id} className="bg-synchGray-100 p-4 rounded-lg w-100">
                    <Link href={`/taskDetails?task_id=${encodeURIComponent(task.task_id)}`}>
                        <Tasks task_id={task.task_id} />
                    </Link>
                </div>
            ))}
            </div>
            </div>
          </>
        )}
        </div>
    );
}

