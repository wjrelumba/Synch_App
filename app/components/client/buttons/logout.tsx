'use client';
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function LogoutBtn() {
    const router = useRouter()
    const btnFunction = async () => {
        try {
            const response = await fetch('api/deleteSession')
            const result = await response.json()
            router.push('/')
            console.log(result)
        } catch (error) {
            
        }
    }
  return (
    <>
        <button onClick={btnFunction}>Log Out</button>
    </>
)}