import { NextRequest, NextResponse } from "next/server";
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";
import { cookies } from "next/headers";

export async function POST(req: NextRequest){
    if(req.method === 'POST'){
        const cookieValue:any = cookies().get('userloggedin')
        console.log(cookieValue)
        const conn = mysql2.createConnection(DBConnect())
        try {
            const getUserDataQuery = `SELECT c.name, c.username, c.organization FROM clients_users as c where c.id = '${cookieValue.value}'`
            const [getUserDataResult] = await (await conn).query(getUserDataQuery)
            console.log("Data result: ",getUserDataResult)
            ;(await conn).end()
            return NextResponse.json(getUserDataResult)
        } catch (error) {
            console.log(error)
        }
    }
}