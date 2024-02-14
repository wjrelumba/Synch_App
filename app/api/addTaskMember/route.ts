import { NextRequest, NextResponse } from "next/server";
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";

export async function POST(req: NextRequest){
    if(req.method === 'POST'){
        const conn = mysql2.createConnection(DBConnect())
        const dataReceived = await req.json()
        console.log(dataReceived)
        try {
            const validateUserQuery = `SELECT taskg.team_id FROM task_names_group as taskg WHERE taskg.task_id = '${dataReceived.task_id}'`
            const [validateUserResult] = <any> await (await conn).query(validateUserQuery)
            const isUserPartQuery = `SELECT tm.user_id FROM team_members_list as tm WHERE tm.team_id = '${validateUserResult[0].team_id}' AND tm.user_id = '${dataReceived.username}'`
            const [isUserPartResult] = <any> await (await conn).query(isUserPartQuery)

            const isUserInTaskQuery = `SELECT taskm.user_id FROM task_members_list as taskm WHERE taskm.user_id = '${dataReceived.username}' AND taskm.task_id = '${dataReceived.task_id}'`
            const [isUserInTaskResult] = <any> await (await conn).query(isUserInTaskQuery)
            console.log("Is user part: ", isUserPartResult)
            if(isUserInTaskResult.length > 0){
                return NextResponse.json({error: 'Already part of the task'})
            }
            else {
                if(isUserPartResult.length > 0){
                    const addMemberQuery = `INSERT INTO task_members_list (task_id, user_id) VALUES ('${dataReceived.task_id}', '${dataReceived.username}')`
                    const addMemberVar = await (await conn).query(addMemberQuery)
                    return NextResponse.json({success: "Teammate successfully included"})
                }else {
                    return NextResponse.json({error: "User is not part of the team."})
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            (await conn).end()
        }
    }
}