import mysql from 'mysql2';

const pool = mysql.createPool({
    user: 'root',
    password: '1234',
    port: 3306,
    host: 'localhost'
}) 

export default pool;