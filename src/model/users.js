import mysql from './db.js';

let db = {};

db.get_users = () => {
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM order.users WHERE status = 1";

        mysql.query(query, (err, result) => {
            return err ? reject(err) : resolve(result);
        })
    })
}

db.get_user = (data) => {
    return new Promise((resolve, reject) => {
        if(data != '' && data != null && data != undefined) {
            const {email} = data;
            const query = `SELECT 
                            id,
                            firstname,
                            lastname,
                            username,
                            email
                            FROM order.users WHERE status = 1 AND email = '${email}'`;

            mysql.query(query, (err, result) => {
                return err ? reject(err) : resolve(result);
            })
        } else {
            reject(new Error('Invalid data'));
        }
    })
}

export default db;