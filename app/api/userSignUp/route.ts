import { NextRequest, NextResponse } from "@/node_modules/next/server";
import mysql2, {ConnectionOptions} from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";
import bcrypt from 'bcrypt'
import { generateRandomBase64 } from "../generateRandom/genRandom";

export async function POST(req: NextRequest){
    if( req.method === 'POST'){
          // Example: Generate a random Base64 string with a length of 10
          const randomBase64Value = generateRandomBase64(50);
          console.log(randomBase64Value)
          const conn = mysql2.createConnection(DBConnect())
        try {
            const dataReceived = await req.json();
            const hashedPass = await bcrypt.hash(dataReceived.pass, 5)
            console.log("Hashed pass: ",hashedPass)
            console.log(dataReceived)
            const dataQuery = `INSERT INTO clients_users (name, username, id, organization) VALUES ('${dataReceived.name}', '${dataReceived.username}', '${randomBase64Value}', '${dataReceived.organization}'    )`
            const passQuery = `INSERT INTO secret_creds (user_id, pass) VALUES ('${dataReceived.username}', '${hashedPass}')`
            const insertPassData = await (await conn).query(passQuery);
            const [rows, fields] = await (await conn).query(dataQuery);
            console.log(rows);

            return NextResponse.json({ success: 'Server working' }, { status: 200 })
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