import { NextRequest, NextResponse } from "next/server"
import mysql2 from 'mysql2/promise'
import DBConnect from "../../dbConnect/dbConnect"

export const POST = async (req: NextRequest) => {
    if(req.method === 'POST'){
        const dataReceived = await req.json()
        console.log(dataReceived.accept)
        const conn = mysql2.createConnection(DBConnect())
        try {
            if(dataReceived.accept == true){
                const teamUserIDQuery = `SELECT r.team_id, r.owner FROM requests as r WHERE r.req_id = '${dataReceived.req_id}'`
                const [teamUserIDResult] = <any> await (await conn).query(teamUserIDQuery)
                console.log(teamUserIDResult)
                const addUserToTeamQuery = `INSERT INTO team_members_list (user_id, team_id, access_level) VALUES ('${teamUserIDResult[0].owner}', '${teamUserIDResult[0].team_id}', 1)`
                const addUserToTeamVar = await (await conn).query(addUserToTeamQuery)
                const deleteReqQuery = `DELETE FROM requests WHERE requests.req_id = '${dataReceived.req_id}'`
                const deleteReqDetailsQuery = `DELETE FROM request_details WHERE request_details.req_id = '${dataReceived.req_id}'`
                const deleteReqVar = await (await conn).query(deleteReqQuery)
                const deleteReqDetailsVar = await (await conn).query(deleteReqDetailsQuery)
                return NextResponse.json(`You are now added to ${teamUserIDResult[0].team_id}`)
            }
            if(dataReceived.accept == false){
                console.log("Ran")
                const teamUserIDQuery = `SELECT r.team_id, r.owner FROM requests as r WHERE r.req_id = '${dataReceived.req_id}'`
                const [teamUserIDResult] = <any> await (await conn).query(teamUserIDQuery)
                const deleteReqQuery = `DELETE FROM requests WHERE requests.req_id = '${dataReceived.req_id}'`
                const deleteReqDetailsQuery = `DELETE FROM request_details WHERE request_details.req_id = '${dataReceived.req_id}'`
                const deleteReqVar = await (await conn).query(deleteReqQuery)
                const deleteReqDetailsVar = await (await conn).query(deleteReqDetailsQuery)
                return NextResponse.json(`Invitation to ${teamUserIDResult[0].team_id} has been rejected`)
            }
        } catch (error) {
            console.log(error)
        } finally {
            (await conn).end()
        }
    }
}