import { NextRequest, NextResponse } from "@/node_modules/next/server";
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";
import { cookies } from "next/headers";

export async function POST(req: NextRequest){
    if( req.method === 'POST'){
        const conn = mysql2.createConnection(DBConnect())
        try {
            const userLoggedIn = <any> cookies().get('userloggedin');
            const dataReceived = await req.json();
            console.log(dataReceived)
            const query = `SELECT c.name, c.id, tg.team_name, tg.team_id, tm.access_level, c.username
            FROM team_groups_name as tg
            JOIN team_members_list as tm ON tm.team_id = tg.team_id
            JOIN clients_users as c ON tm.user_id = c.username
            WHERE tg.team_id = '${dataReceived.team_id}'`;

            var idArray: any = [];
            var dataArray: any = [];
            const [queryResult] = <any> await (await conn).query(query)
            //console.log(queryResult)

            for(var i=0; i<queryResult.length; i++){
                const sendBackData = {
                    name: queryResult[i].name,
                    team_name: queryResult[i].team_name,
                    team_id: queryResult[i].team_id,
                    username: queryResult[i].username
                }
                dataArray.push(sendBackData)
                //console.log(dataArray)
            }

            
            for(var i=0; i<queryResult.length; i++){
                if(queryResult[i].id == userLoggedIn.value){
                    return NextResponse.json(dataArray)
                }
            }

            return NextResponse.json({authenticated: false})
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