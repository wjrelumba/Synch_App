'use client';
// This component checks all the groups a user is in
import React, { useEffect, useMemo, useState } from 'react'

type TeamID = {
    team_id: String,
}

export default function CheckingMembers() {
    var data = useMemo(() => [''], [])

    useEffect(() => {
        console.log(data)
        
    }, [data])

    var IDValue: string = "";

    const IDHandler = (event: any) => {
        IDValue = event.target.value
    }

    const buttonFunc = async () => {
        const dataToSend: TeamID = {
            team_id: IDValue,
        }
        try {
            const response = await fetch('/api/getMembers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            const result = await response.json();
            data = result;
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <> 
        <label htmlFor="username">Team ID: </label>
        <input type="text" className='text-black' onChange={IDHandler}/> <br />
        <button onClick={buttonFunc}>Click to check teams</button> <br />
    </>
  )
}
