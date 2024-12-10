import mysql from './db.js';

let db = {};

db.get_my_orders = (data) => {
    return new Promise((resolve, reject) => {
        if(data != '' && data != null && data != undefined) {
            const query = `SELECT * FROM order.user_order WHERE user_id = ${data};`

            mysql.query(query, (err, result) => {
                return err ? reject(err) : resolve(result);
            })
        } else {
            reject(new Error('Invalid data')); 
        }
    })
}

export default db;