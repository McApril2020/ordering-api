import mysql from './db.js';

let db = {};

db.get_user = (data) => {
    return new Promise((resolve,reject) => {
        if(data != '' && data != null && data != undefined) {
            const {email} = data
            const query = `SELECT * FROM order.users WHERE email = '${email}';`;

            mysql.query(query, (err, result) => {
                return err ? reject(err) : resolve(result);
            })
        } else {
            reject(new Error('Invalid data')); 
        }
    })
}

export default db;