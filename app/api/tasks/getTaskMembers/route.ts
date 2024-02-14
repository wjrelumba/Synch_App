import { NextRequest, NextResponse } from "next/server";
import mysql2 from 'mysql2/promise'
import DBConnect from "../../dbConnect/dbConnect";

export async function POST(req: NextRequest){
    if(req.method === 'POST'){
        const dataReceived = await req.json()
        const conn = mysql2.createConnection(DBConnect())
        try {
            const taskMemberQuery = `SELECT c.name, c.username FROM clients_users as c JOIN task_members_list as taskm ON taskm.user_id = c.username 
            JOIN task_names_group as taskg ON taskg.task_id = taskm.task_id WHERE taskg.task_id = '${dataReceived.task_id}'`
            const [taskMemberResult] = <any> await (await conn).query(taskMemberQuery)
            console.log('Task Members: ',taskMemberResult)
            if(taskMemberResult.length > 0){
                return NextResponse.json(taskMemberResult)
            } else {
                return NextResponse.json({})
            }
        } catch (error) {
            
        }finally{
            (await conn).end()
        }
        
    }
}