import { NextRequest, NextResponse } from "next/server";
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";

export const POST = async (req: NextRequest) => {
    if(req.method === 'POST'){
        const dataReceived = await req.json()
        const conn = mysql2.createConnection(DBConnect())
        try {
            const taskQuery = `SELECT * FROM task_names_group as taskg WHERE taskg.team_id = '${dataReceived.team_id}'`
            const [taskResult] = <any> await (await conn).query(taskQuery)
            console.log(taskResult)
            return NextResponse.json(taskResult)
        } catch (error) {
            
        } finally {
            (await conn).end()
        }
        
    }
}