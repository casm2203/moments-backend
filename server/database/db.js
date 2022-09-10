import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    port: 3306,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'moments'
});


//docker run --name momentsSql -e MYSQL_ROOT_PASSWORD=colombiaprr -e MYSQL_DATEBASE=moments -p 3306:3306  -d mysql