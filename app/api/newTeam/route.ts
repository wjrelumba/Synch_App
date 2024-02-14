import { NextRequest, NextResponse } from "next/server"
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect"
import { cookies } from "next/headers"

export const POST = async (req: NextRequest) => {
    if(req.method === 'POST'){
        const dataReceived = await req.json()
        const userCookie:any = cookies().get('userloggedin')
        const conn = mysql2.createConnection(DBConnect())

        const userNameQuery = `SELECT c.username FROM clients_users as c WHERE c.id = '${userCookie.value}'`
        const [userNameResult] = <any> await (await conn).query(userNameQuery)
        console.log(userNameResult[0].username)
        
        const newTeamQuery = `INSERT INTO team_groups_name (team_name, team_id) VALUES ('${dataReceived.team_name}', '${dataReceived.team_id}')`
        const newTeamVar = await (await conn).query(newTeamQuery)

        const addTeamOwnerQuery = `INSERT INTO team_members_list (user_id, team_id, access_level) VALUES ('${userNameResult[0].username}', '${dataReceived.team_id}', 3)`
        const addTeamOwnerVar = await (await conn).query(addTeamOwnerQuery)
        return NextResponse.json(`${dataReceived.team_name} successfully created.`)
    }
}