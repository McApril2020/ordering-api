import mysql from './db.js';

let db = {};

db.get_epp_items = () => {
    return new Promise((resolve,reject) => {
        const query = "SELECT * FROM epp.item WHERE isActive = '1'";

        mysql.query(query, (err, result) => {
            return err ? reject(err) : resolve(result);
        })
    })
}

export default db;