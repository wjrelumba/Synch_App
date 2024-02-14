import { ConnectionOptions } from "mysql2"

const DBConnect = () => {
    const conn: ConnectionOptions = {
        user: "root",
        host: "localhost",
        database: "synchdb"
    }
    return(
        conn
    )
}

export default DBConnect