'use client';
import React from 'react'
import { useRouter } from 'next/navigation';

export default function LogoutBtn() {
    const router = useRouter()
    const btnFunction = async () => {
        try {
            const response = await fetch('api/deleteSession')
            const result = await response.json()
            router.push('/')
        } catch (error) {
            
        }
    }
  return (
    <>
        <button onClick={btnFunction}>Log Out</button>
    </>
)}