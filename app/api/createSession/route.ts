import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { cookies } from 'next/headers'
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest){
    if( req.method === 'POST'){
        try {
            // Get necessary data from DB to validate user
            const dataReceived = await req.json();
            console.log("Data received: ", dataReceived.username)
            const query = `SELECT c.name, c.username, c.id, s.pass FROM secret_creds as s
            JOIN clients_users as c ON s.user_id = c.username
            WHERE c.username = '${dataReceived.username}'`;

            const conn = mysql2.createConnection(DBConnect())
            
            const [rows] =<any> await (await conn).query(query)
            console.log(rows.length)

            if(rows.length > 0){
                const isPassTheSame = await bcrypt.compare(dataReceived.password, rows[0].pass)
                console.log("Value: ",isPassTheSame)

                console.log(rows.length)
                if(isPassTheSame == true){
                    console.log("Correct password")
                    console.log(rows);
                    cookies().set({
                        name: 'userloggedin',
                        value: `${rows[0].id}`,
                        httpOnly: true,
                        path: '/'
                    })
    
                    return NextResponse.json({success: "Server responded with status 200"})
                }else{
                    console.log("Wrong password")
                    return NextResponse.json({error: "Wrong Password"})
                }
            }else{
                return NextResponse.json({error: "Username or Password is wrong"})
            }
        } catch (error) {
            console.log(error)
        }
    }
    else{
        console.log("Wrong method")
    }
}