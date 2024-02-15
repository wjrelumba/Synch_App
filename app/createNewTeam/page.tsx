'use client'
import React, { useState, useEffect } from 'react';
import ToastLayout from '../components/essentials/toastlayout';
import Navbar from '../components/client/navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function CreateTeamForm() {
    const router = useRouter()
    const [showForm, setShowForm] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [teamID, setTeamID] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowForm(true);
        }, 1000); // Adjust the delay as needed
        return () => clearTimeout(timer);
    }, []);

    const teamNameHandler = (e:any) => {
        setTeamName(e.target.value);
    }

    const teamIDHandler = (e:any) => {
        setTeamID(e.target.value);
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

    const cnclBtn = () => {
        router.back()
    }

    return (
        <ToastLayout>
            <Navbar />
            <div className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300 ${showForm ? 'visible' : 'invisible'}`}>
                <div className={`bg-synchGray-50 rounded-lg p-8 shadow-lg transform transition-transform duration-500 ease-in-out ${showForm ? 'translate-y-0' : 'translate-y-full'}`}>
                    <h2 className="text-3xl font-mono mb-4">Create Team</h2>
                    <label htmlFor="teamName" className="block font-mono mb-2">Team Name:</label>
                    <input type="text" className="border text-black border-synchGray-100 rounded px-4 py-2 mb-4 w-full" onBlur={teamNameHandler} placeholder="Team Name" required />
                    <label htmlFor="teamID" className="block font-mono mb-2">Team ID:</label>
                    <input type="text" className="border text-black border-gray-300 rounded px-4 py-2 mb-4 w-full" onBlur={teamIDHandler} placeholder="Team ID" required />
                    <button onClick={btnFunc} id='createTeam' className="bg-synchBlue-50 hover:bg-synchBlue-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">Create Team</button>
                    <button onClick={cnclBtn} className="bg-synchGray-150 hover:bg-synchGray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                </div>
            </div>
        </ToastLayout>
    );
}
