import mysql2 from 'mysql2/promise'
import { NextRequest, NextResponse } from 'next/server';
import DBConnect from '../../dbConnect/dbConnect';

export async function POST(req: NextRequest){
    const dataReceived = await req.json()
    const conn = mysql2.createConnection(DBConnect())
    const userNameVerifyQuery = `SELECT c.username FROM clients_users as c WHERE c.username = '${dataReceived.unameVerify}'`
    const [userNameVerifyResult] = <any> await (await conn).query(userNameVerifyQuery)
    if(userNameVerifyResult.length > 0){
        return NextResponse.json({error: "Username is already taken. Please choose another"})
    } else {
        return NextResponse.json({message: "Username is available, proceed to create account"})
    }
}