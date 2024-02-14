import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import mysql2 from 'mysql2/promise'
import DBConnect from '../../dbConnect/dbConnect'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
    if(req.method === 'POST'){
        const dataReceived = await req.json()
        const userCookie:any = cookies().get("userloggedin")
        const conn = mysql2.createConnection(DBConnect())

        if(userCookie.value !== undefined){
            const credsQuery = `SELECT c.username, tm.team_id FROM clients_users as c JOIN team_members_list as tm ON c.username = tm.user_id WHERE c.id = '${userCookie.value}' AND tm.team_id = '${dataReceived.team_id}'`
            const [credsResult] = <any> await (await conn).query(credsQuery)
            console.log(credsResult)

            if(credsResult.length > 0){
                console.log("User authenticated")
                return NextResponse.json({authenticated: true})
            }
            else{
                console.log("User not authenticated")
                return NextResponse.json({authenticated: false})
            }
        }
    }
}
