import { NextRequest, NextResponse } from "next/server";
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";

export async function POST(req: NextRequest){
    if(req.method === 'POST'){
        try {
            const dataReceived = await req.json()
            console.log("Received data: ",dataReceived)
            const conn = mysql2.createConnection(DBConnect())
            const taskQuantityQuery = `SELECT task_id FROM task_detail WHERE task_id = '${dataReceived.task_id}'`
            const [taskQuantityResult] = <any> await (await conn).query(taskQuantityQuery)
            console.log("Tasks quantity: ",taskQuantityResult.length)
            ;(await conn).end()
            return NextResponse.json(taskQuantityResult.length)
        } catch (error) {
            
        }
    }
}