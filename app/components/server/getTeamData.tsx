import React from 'react'
import mysql2 from 'mysql2/promise'
import DBConnect from '@/app/api/dbConnect/dbConnect'

interface TeamParams {
    team_id: string,
    team_name: string
}

async function GetTeamData(){
    const conn = mysql2.createConnection(DBConnect());
    
    let data;
  
    try {
        const query = "SELECT * FROM team_groups_name";

        const [rows, fields] = await (await conn).query(query);
        data = JSON.parse(JSON.stringify(rows))
    } catch (error) {
        console.log(error);
    }
    finally{
        (await conn).end()
    }

    return(
        <>
        <h1>
        {data.map((users: TeamParams) => 
        <ul key={users.team_id}>
            {users.team_name} <br />
        </ul>
        )}
        </h1>
        </>
    )
}

export default GetTeamData