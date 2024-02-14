import { NextRequest, NextResponse } from "next/server";
import mysql2 from 'mysql2/promise'
import { cookies } from "next/headers";
import DBConnect from "../../dbConnect/dbConnect";

export async function GET(req: NextRequest){
    if(req.method === 'GET'){
        const userCookie: any = cookies().get("userloggedin")
        console.log(userCookie)
        const conn = mysql2.createConnection(DBConnect())
        const usernameQuery = `SELECT c.username FROM clients_users as c WHERE c.id = '${userCookie.value}'`
        const [usernameResult] = <any> await (await conn).query(usernameQuery)
        console.log(usernameResult)
        const requestsQuery = `SELECT r.req_id, r.owner, r.sent_from, r.status, r.team_id, rd.req_info FROM requests as r JOIN request_details as rd on r.req_id = rd.req_id WHERE r.owner = '${usernameResult[0].username}'`
        const [requestsResults] = <any> await (await conn).query(requestsQuery)
        console.log(requestsResults)
        return NextResponse.json({requests: requestsResults})
    }
}