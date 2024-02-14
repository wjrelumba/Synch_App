import { ConnectionOptions } from "mysql2"

const DBConnect = () => {
    const conn: ConnectionOptions = {
        user: "sql6684135",
        host: "sql6.freesqldatabase.com",
        database: "sql6684135",
        password: "KAETCWFjeg",
        port: 3306
    }
    return(
        conn
    )
}

export default DBConnect