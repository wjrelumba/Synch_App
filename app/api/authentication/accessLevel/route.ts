import { NextRequest, NextResponse } from "next/server";
import mysql2 from 'mysql2/promise'
import DBConnect from "../../dbConnect/dbConnect";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    if(req.method === 'POST'){
        const dataReceived = await req.json()
        const userLoggedIn:any = cookies().get('userloggedin');
        const conn = mysql2.createConnection(DBConnect())
        const accessLevelTeamNameQuery = `SELECT c.username, tm.access_level FROM clients_users as c 
        JOIN team_members_list as tm ON c.username = tm.user_id JOIN team_groups_name as tg
        ON tg.team_id = tm.team_id WHERE c.id = '${userLoggedIn.value}' AND tg.team_name = '${dataReceived.team_id}'`

        const accessLevelTeamIDQuery = `SELECT c.username, tm.access_level FROM clients_users as c 
        JOIN team_members_list as tm ON c.username = tm.user_id JOIN team_groups_name as tg
        ON tg.team_id = tm.team_id WHERE c.id = '${userLoggedIn.value}' AND tg.team_id = '${dataReceived.team_id}'`
        
        const [accessLevelTeamNameResult] = <any> await (await conn).query(accessLevelTeamNameQuery)
        console.log("Acess Level: ",accessLevelTeamNameResult)

        const [accessLevelTeamIDResult] = <any> await (await conn).query(accessLevelTeamIDQuery)
        console.log("Access Level: ",accessLevelTeamIDResult)

        if(accessLevelTeamNameResult.length > 0){
            return NextResponse.json(accessLevelTeamNameResult)
        } else if(accessLevelTeamIDResult.length > 0){
            return NextResponse.json(accessLevelTeamIDResult)
        } else {
            return NextResponse.json({})
        }
    }
}