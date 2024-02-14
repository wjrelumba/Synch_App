import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import mysql2 from 'mysql2/promise'
import DBConnect from '../../dbConnect/dbConnect'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
    if(req.method === 'POST'){
        const conn = mysql2.createConnection(DBConnect())
        try {
            const dataReceived = await req.json()
            const userCookie:any = cookies().get("userloggedin")
        

        if(userCookie.value !== undefined){
            const usernameQuery = `SELECT r.owner FROM requests as r WHERE r.req_id = '${dataReceived.req_id}'`
            const [usernameResult] = <any> await (await conn).query(usernameQuery)
            console.log("Username Result: ",usernameResult)
            const credsQuery = `SELECT c.username FROM clients_users as c JOIN requests as r ON c.username = r.owner WHERE c.id = '${userCookie.value}' AND r.req_id = '${dataReceived.req_id}'`
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
        } catch (error) {
            
        } finally {
            (await conn).end()
        }
    }
}