import { NextRequest, NextResponse } from "next/server";
import { generateRandomBase64 } from "../../generateRandom/genRandom";
import mysql2 from 'mysql2/promise'
import DBConnect from "../../dbConnect/dbConnect";

export async function POST(req: NextRequest){
    if(req.method === 'POST'){
        const randomBase64Value = generateRandomBase64(18)
        const dataReceived = await req.json()
        const conn = mysql2.createConnection(DBConnect())
        try {
            const newTaskQuery = `INSERT INTO task_names_group (task_name, task_id, team_id) VALUES ('${dataReceived.task_name}', '${randomBase64Value}', '${dataReceived.team_id}')`
            const [newTaskVar] = <any> await (await conn).query(newTaskQuery)
            console.log(dataReceived, randomBase64Value)
            return NextResponse.json({success: `Task ${dataReceived.task_name} has been successfully created.`})
        } catch (error) {
            return NextResponse.json({error: `Task creation failed`})
        } finally {
            (await conn).end()
        }
    }
}