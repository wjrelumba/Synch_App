import { NextRequest, NextResponse } from "next/server";
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";

export async function POST(req:NextRequest) {
    if(req.method === 'POST'){
        const dataReceived = await req.json()
        const conn = mysql2.createConnection(DBConnect())
        console.log("Received data: ",dataReceived)
        const changeStatusQuery = `UPDATE task_detail SET task_id='${dataReceived.task_id}',task_detail_id='${dataReceived.task_detail_id}',task_status='${dataReceived.task_status}',task_deadline='${dataReceived.task_deadline}}' WHERE task_detail_id = '${dataReceived.task_detail_id}'`
        const changeStatusVar = <any> await (await conn).query(changeStatusQuery)
        return NextResponse.json("")
    }
}