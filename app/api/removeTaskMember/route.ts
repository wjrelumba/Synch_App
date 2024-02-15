import { NextRequest, NextResponse } from "next/server";
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";

export async function POST(req: NextRequest){
    if(req.method === 'POST'){
        const dataReceived = await req.json()
        const conn = mysql2.createConnection(DBConnect())
        try {
            const remMemberQuery = `DELETE FROM task_members_list WHERE task_id = '${dataReceived.task_id}' AND user_id = '${dataReceived.username}'`
            const remMemberVar = await (await conn).query(remMemberQuery)
            ;(await conn).end()
            return NextResponse.json({success: "Teammate successfully removed from task"})
        } catch (error) {
            
        }
    }
}