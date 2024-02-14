import { NextRequest, NextResponse } from "next/server";
import mysql2 from 'mysql2/promise'
import DBConnect from "../../dbConnect/dbConnect";

export async function POST(req: NextRequest){
    if(req.method === 'POST'){
        const dataReceived = await req.json()
        const conn = mysql2.createConnection(DBConnect())
        try {
            const taskNameQuery = `SELECT taskg.task_name FROM task_names_group as taskg WHERE taskg.task_id = '${dataReceived.task_id}'`
            const [taskNameResult] = <any> await (await conn).query(taskNameQuery)
            console.log(taskNameResult)
            return NextResponse.json(taskNameResult)
        } catch (error) {
            console.log(error)
        } finally {
            (await conn).end()
        }
        return NextResponse.json("Hello world")
    }
}