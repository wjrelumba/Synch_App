import mysql2 from 'mysql2/promise'
import { NextRequest, NextResponse } from 'next/server';
import DBConnect from '../../dbConnect/dbConnect';

export async function POST(req: NextRequest){
    const dataReceived = await req.json()
    const conn = mysql2.createConnection(DBConnect())
    const teamIDQuery = `SELECT tg.team_id FROM team_groups_name as tg WHERE tg.team_id = '${dataReceived.team_id}'`
    const [teamIDResult] = <any> await (await conn).query(teamIDQuery)
    console.log("Length is: ",teamIDResult)
    if(teamIDResult.length > 0){
        return NextResponse.json({error: "Team ID is already taken. Please choose another"})
    } else {
        return NextResponse.json({message: "Team ID is available, proceed to create team"})
    }
}