'use client'
import React from 'react'
import { toast } from 'react-toastify'
import ToastLayout from '../components/essentials/toastlayout'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '../components/client/navbar'

export default function NewTeam() {
    const router = useRouter()
    var teamName: string = ""
    var teamID: string = ""

    const teamNameHandler = (event:any) => {
        console.log(event.target.value)
        teamName = event.target.value
    }

    const teamIDHandler = async (event:any) => {
        if(event.target.value != ""){
            const dataSend = {
                team_id: event.target.value
            }
            const response = await fetch('/api/verifiers/teamIDVerify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSend)
            })
            const result = await response.json()
            if(result.message !== undefined){
                teamID = event.target.value
                toast.success(result.message)
            }
            if(result.error !== undefined) {
                toast.error(result.error)
                event.target.value = ""
            }
            console.log(result)
        }
    }

    const btnFunc = async () => {
        if(teamName != "" && teamID != ""){
            try {
                const sendData = {
                    team_name: teamName,
                    team_id: teamID
                }
                const response = await fetch('/api/newTeam', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(sendData)
                })
                const result = await response.json()
                const btnRef:any = document.getElementById('createTeam')
                toast.success(result)
                btnRef.disabled = true;
                setTimeout(() => { router.push('/dashboard') }, 2000)
                console.log(result)
            } catch (error) {
                
            }
        }
    }
  return (
    <> 
        <ToastLayout>
            <Navbar />
            <label htmlFor="teamName">Team Name: </label>
            <input type="text" className='text-black' onBlur={teamNameHandler} placeholder='Team Name' required/> <br />
            <label htmlFor="teamName">Team ID: </label>
            <input type="text" className='text-black' onBlur={teamIDHandler} placeholder='TN' required/> <br />
            <button onClick={btnFunc} id='createTeam'>Create Team</button> <br />
            <br />
            <Link href={'/dashboard'}>
                <button>Go back</button>
            </Link>
        </ToastLayout>
    </>
  )
}
