import { NextRequest, NextResponse } from "next/server"
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect"

export const POST = async (req: NextRequest) => {
    if(req.method === 'POST'){
        const dataReceived = await req.json()
        const conn = mysql2.createConnection(DBConnect())
        try {
            const teamNameQuery = `SELECT tg.team_name FROM team_groups_name as tg WHERE tg.team_id = '${dataReceived.team_id}'`
            const [teamNameResult] = <any> await (await conn).query(teamNameQuery)
            console.log("Team name result: ", teamNameResult[0])
            return NextResponse.json(teamNameResult[0])
        } catch (error) {
            
        } finally {
            (await conn).end()
        }
        
    }
}