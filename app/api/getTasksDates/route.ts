import { NextRequest, NextResponse } from "next/server";
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";
import { cookies } from "next/headers";

export async function GET(req: NextRequest){
    if(req.method === 'GET'){
        const userCookie:any = cookies().get('userloggedin')
        const conn = mysql2.createConnection(DBConnect())
        const unameQuery = `SELECT c.username FROM clients_users as c WHERE c.id = '${userCookie.value}'`
        const [unameResult] = <any> await (await conn).query(unameQuery)
        console.log("Username is: ", unameResult[0])
        const taskDatesQuery = `SELECT td.task_detail_id, td.task_id, td.task_status, td.task_deadline, tdt.task_detail_name FROM task_detail as td JOIN task_members_list as tm ON td.task_id = tm.task_id JOIN task_detail_title as tdt ON td.task_detail_id = tdt.task_detail_id WHERE tm.user_id = '${unameResult[0].username}'`
        const [taskDatesResult] = <any> await (await conn).query(taskDatesQuery)
        console.log("Tasks here: ", taskDatesResult)
        ;(await conn).end
        return NextResponse.json(taskDatesResult)
    }
}