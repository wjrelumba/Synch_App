import { NextRequest, NextResponse } from "next/server"
import mysql2 from 'mysql2/promise'
import DBConnect from "../../dbConnect/dbConnect"

export const POST = async (req: NextRequest) => {
    if(req.method === 'POST'){
        const dataReceived = await req.json()
        const conn = mysql2.createConnection(DBConnect())

        const reqDetailQuery = `SELECT rd.req_info FROM request_details as rd JOIN requests as r ON r.req_id = rd.req_id WHERE r.req_id = '${dataReceived.req_id}'`

        const [reqDetailResult] = <any> await (await conn).query(reqDetailQuery)
        console.log(reqDetailResult)
        return NextResponse.json(reqDetailResult)
    }
}