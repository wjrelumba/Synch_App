import { NextRequest, NextResponse } from "next/server";
import mysql2 from 'mysql2/promise'
import { generateRandomBase64 } from "../generateRandom/genRandom";
import DBConnect from "../dbConnect/dbConnect";

export async function POST(req: NextRequest){
    if(req.method === 'POST'){
        const conn = mysql2.createConnection(DBConnect())
        const dataReceived = await req.json()
        const randomBase64Value = generateRandomBase64(10)
        console.log(randomBase64Value)
        console.log(dataReceived.task_id)
        console.log(dataReceived.date)

        const taskDetailQuery = `INSERT INTO task_detail (task_id, task_detail_id, task_status, task_deadline) VALUES ('${dataReceived.task_id}','${randomBase64Value}', 0, '${dataReceived.date}')`
        const taskDetailInfoQuery = `INSERT INTO task_detail_info (task_detail_info, task_detail_id) VALUES ('${dataReceived.desc}','${randomBase64Value}')`
        const taskDetailTitleQuery = `INSERT INTO task_detail_title (task_detail_name, task_detail_id) VALUES ('${dataReceived.title}','${randomBase64Value}')`

        const taskDetailResult = await (await conn).query(taskDetailQuery)
        const taskDetailInfoResult = await (await conn).query(taskDetailInfoQuery)
        const taskDetailTitleResult = await (await conn).query(taskDetailTitleQuery)
        ;(await conn).end
        return NextResponse.json({success: "Task successfully created"})
    }
}