import { cookies } from 'next/headers'
import React from 'react'

export default function deleteSession() {
    cookies().delete('userloggedin');
    window.location.href = '/page.tsx';
  return(
    <></>
  )
}
