import { NextRequest, NextResponse } from "next/server";
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";
import { cookies } from "next/headers";
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest){
    if(req.method === 'POST'){
        const dataReceived = await req.json()
        const userCookie:any = cookies().get('userloggedin')
        const conn = mysql2.createConnection(DBConnect())
        console.log(dataReceived.oldPass)
        const userNameQuery = `SELECT c.username from clients_users as c WHERE c.id = '${userCookie.value}'`
        const [userNameResult] = <any> await (await conn).query(userNameQuery)
        console.log(userNameResult[0])
        try {
            console.log(dataReceived)
            if(dataReceived.oldPass !== undefined){
                console.log("This runs")
                const query = `SELECT c.name, c.username, c.id, s.pass FROM secret_creds as s
                JOIN clients_users as c ON s.user_id = c.username
                WHERE c.id = '${userCookie.value}'`;
                const [resultQuery] = <any> await (await conn).query(query)
                const isOldPassSame = await bcrypt.compare(dataReceived?.oldPass, resultQuery[0].pass)
                if(isOldPassSame == true){
                    console.log("Same")
                    ;(await conn).end()
                    return NextResponse.json({success: "Correct Password"})
                }
                else {
                    (await conn).end()
                    return NextResponse.json({error: "Incorrect Password"})
                }
            }
            else if(dataReceived.newPass !== undefined){
                try {
                    const hashedPass = await bcrypt.hash(dataReceived.newPass, 5)
                    console.log("Hashed: ",hashedPass)
                    const newPassQuery = `UPDATE secret_creds SET user_id='${userNameResult[0].username}', pass='${hashedPass}' WHERE user_id = '${userNameResult[0].username}'`
                    const newPassVar = await (await conn).query(newPassQuery)
                    ;(await conn).end()
                    return NextResponse.json({success: "Password successfully changed"})
                } catch (error) {
                    console.log(error)   
                }
            }
            return NextResponse.json("Not working")
        } catch (error) {
            console.log(error)
        }
    }
}