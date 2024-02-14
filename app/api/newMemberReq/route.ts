import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import mysql2, {createConnection} from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";
import { randomBytes } from "crypto";

export async function POST(req: NextRequest){
    if(req.method === 'POST'){
        const conn = mysql2.createConnection(DBConnect())
        try {
            const generateRandomBase64 = (length: number): string => {
            const randomBytesBuffer = randomBytes(Math.ceil((length * 3) / 4));
            return randomBytesBuffer.toString('base64').slice(0, length);
            }
            // Example: Generate a random Base64 string with a length of 10
            const randomBase64Value = generateRandomBase64(9);
            console.log(randomBase64Value)
            const cookieValue:any = cookies().get('userloggedin')
            const dataReceived = await req.json()

            const checkUserQuery = `SELECT c.username FROM clients_users as c WHERE c.username = '${dataReceived.username}'`

            const teamMemberQuery = `SELECT tm.user_id, tm.team_id FROM team_members_list as tm WHERE tm.user_id = '${dataReceived.username}'`
            const [teamMemberResult] = <any> await (await conn).query(teamMemberQuery)
            console.log(teamMemberResult.length)

            const [checkUserResult] = <any> await (await conn).query(checkUserQuery);
            console.log(checkUserResult.length)

            const cookieQuery = `SELECT c.username FROM clients_users as c WHERE c.id = '${cookieValue.value}'`
            const [cookieResult] = <any> await (await conn).query(cookieQuery)
            console.log(cookieResult[0].username)

            const validateUserQuery = `SELECT tm.user_id, tm.team_id FROM team_members_list as tm WHERE tm.user_id = '${cookieResult[0].username}' AND tm.team_id = '${dataReceived.team_id}'`
            const [validateUserResult] = <any> await (await conn).query(validateUserQuery)
            console.log("User is: ", validateUserResult.length)

            const invitationExistQuery = `SELECT r.team_id, r.owner, r.status, r.sent_from FROM requests as r WHERE r.owner = '${dataReceived.username}'`
            const [invitationExistResult] = <any> await (await conn).query(invitationExistQuery);
            console.log(invitationExistResult)

            const teamNameQuery = `SELECT tg.team_name FROM team_groups_name as tg WHERE tg.team_id = '${dataReceived.team_id}'`
            const [teamNameResult] = <any> await (await conn).query(teamNameQuery)
            console.log(teamNameResult)

            const inviteMessage: string = `${cookieResult[0].username} has invited you to join ${teamNameResult[0].team_name}`


            if(validateUserResult.length > 0){
                console.log("This runs")
                if(teamMemberResult.length > 0) {
                    if(dataReceived.username == cookieResult[0].username){
                        return NextResponse.json({message: "That is your username."})
                    } else if(teamMemberResult[0].user_id == dataReceived.username && teamMemberResult[0].team_id == dataReceived.team_id){
                        return NextResponse.json({message: "You are inviting a user that is already part of the team."})
                    } else {
                        if(checkUserResult.length > 0){
                            console.log("There is data")
                            if(dataReceived.username == cookieResult[0].username){
                                return NextResponse.json({message: "That is your username."})
                            } else {
                                if(invitationExistResult.length !== 0){
                                    for(var i=0; i < invitationExistResult.length; i++){
                                        console.log("This is the one that ran")
                                        if(invitationExistResult[i].owner == dataReceived.username){
                                            if(invitationExistResult[i].team_id == dataReceived.team_id){
                                                if(invitationExistResult[i].sent_from == cookieResult[0].username){
                                                    return NextResponse.json({message: `An invitation to ${dataReceived.username} already exists`})
                                                }
                                            }
                                        }
                                    }
                                }
                                const requestQuery = `INSERT INTO requests (send_to, sent_from, request_type, status, owner, team_id, req_id) VALUES ('${dataReceived.username}', '${cookieResult[0].username}', 1, ${dataReceived.status}, '${dataReceived.username}', '${dataReceived.team_id}', '${randomBase64Value}')`
                                const [requestVar] = await (await conn).query(requestQuery)
                                const reqDetailsQuery = `INSERT INTO request_details (req_id, req_info) VALUES ('${randomBase64Value}', '${inviteMessage}')`
                                const [reqDetailVar] = await (await conn).query(reqDetailsQuery)
                                console.log("Method is correct")
                                return NextResponse.json({receiver: dataReceived.username,
                                                            sender: cookieResult[0].username})
                            }            
                        } else if (checkUserResult.length == 0){
                            console.log("There is no user")
                            return NextResponse.json({message: "User does not exist."})
                        }
                    }
                } else {
                    if(checkUserResult.length > 0){
                        console.log("There is data")
                        if(dataReceived.username == cookieResult[0].username){
                            return NextResponse.json({message: "That is your username."})
                        } else {
                            if(invitationExistResult.length !== 0){
                                for(var i=0; i < invitationExistResult.length; i++){
                                    console.log("This is the one that ran")
                                    if(invitationExistResult[i].owner == dataReceived.username){
                                        if(invitationExistResult[i].team_id == dataReceived.team_id){
                                            if(invitationExistResult[i].sent_from == cookieResult[0].username){
                                                return NextResponse.json({message: `An invitation to ${dataReceived.username} already exists`})
                                            }
                                        }
                                    }
                                }
                            }
                            const requestQuery = `INSERT INTO requests (send_to, sent_from, request_type, status, owner, team_id, req_id) VALUES ('${dataReceived.username}', '${cookieResult[0].username}', 1, ${dataReceived.status}, '${dataReceived.username}', '${dataReceived.team_id}', '${randomBase64Value}')`
                            const [requestVar] = await (await conn).query(requestQuery)
                            const reqDetailsQuery = `INSERT INTO request_details (req_id, req_info) VALUES ('${randomBase64Value}', '${inviteMessage}')`
                            const [reqDetailVar] = await (await conn).query(reqDetailsQuery)
                            console.log("Method is correct")
                            return NextResponse.json({receiver: dataReceived.username,
                                                        sender: cookieResult[0].username})
                        }            
                    } else if (checkUserResult.length == 0){
                        console.log("There is no user")
                        return NextResponse.json({message: "User does not exist."})
                    }
                }
            } else{
                return NextResponse.json({message: "You are not a part of this team."})
            } 
        } catch (error) {
            console.log(error)
        } finally {
            (await conn).end()
        }
    }
}