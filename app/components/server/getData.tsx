import DBConnect from '@/app/api/dbConnect/dbConnect';
import mysql2 from 'mysql2/promise';

const GetData = async () => {
  const conn = mysql2.createConnection(DBConnect());

  let data;
  
  try {
    const query = "SELECT * FROM clients_users";

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
      {data.map((users: any) => 
      <ul key={users.name}>
        {users.name} <br />
        {users.username} <br />
        {users.id} <br />
        {users.organization}
      </ul>
      )}
    </h1>
    {/* <Inputdata /> */}
    </>
  )
}

export default GetData;