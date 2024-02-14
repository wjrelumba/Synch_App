import { NextRequest, NextResponse } from "@/node_modules/next/server";
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";

export async function POST(req: NextRequest){
    if( req.method === 'POST'){
        const conn = mysql2.createConnection(DBConnect())
        try {
            const dataReceived = await req.json();
            console.log(dataReceived)
            const teamsQuery = `SELECT c.name, tg.team_name, tg.team_id
            FROM team_groups_name as tg
            JOIN team_members_list as tm ON tm.team_id = tg.team_id
            JOIN clients_users as c ON tm.user_id = c.username
            WHERE c.id = '${dataReceived.user_id}'`;

            const userQuery = `SELECT c.name FROM clients_users as c WHERE c.id = '${dataReceived.user_id}'`

            const [userResult, userFields] = <any> await (await conn).query(userQuery);
            console.log("User result: ", userResult)

            const [rows, fields] = <any> await (await conn).query(teamsQuery)
            console.log(rows);
            

            if(rows.length > 0 || userResult.length > 0){
                const sendData = {
                    groupData: rows,
                    userData: userResult
                }
                return NextResponse.json(sendData)
            } else {
                return NextResponse.json({message: "You are accessing this content without permission"})
            }
        } catch (error) {
            console.log(error)
        } finally {
            (await conn).end()
        }
        
    }
    else{
        console.log("Wrong method")
    }
}