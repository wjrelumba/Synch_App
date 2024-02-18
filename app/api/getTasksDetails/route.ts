import { NextRequest, NextResponse } from "next/server";
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";

export async function POST(req: NextRequest){
    if(req.method === 'POST'){
        const dataReceived = await req.json()
        console.log(dataReceived)
        const conn = mysql2.createConnection(DBConnect())
        const taskDetailIdQuery = `SELECT td.task_id, td.task_deadline, td.task_detail_id, td.task_status, tdi.task_detail_info, tdt.task_detail_name FROM task_detail as td JOIN task_detail_title as tdt ON tdt.task_detail_id = td.task_detail_id JOIN
        task_detail_info as tdi ON tdi.task_detail_id = td.task_detail_id WHERE task_id = '${dataReceived.task_id}'`
        const [taskDetailIdResult] = <any> await (await conn).query(taskDetailIdQuery)
        console.log("Task detail IDs: ",taskDetailIdResult)
        ;(await conn).end()
        return NextResponse.json(taskDetailIdResult)
    }
}