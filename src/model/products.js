import mysql from './db.js';

let db = {};

db.get_products = (data) => {
    return new Promise((resolve, reject) => {
        if(data != '' && data != null && data != undefined) {
            const {limit, offset} = data;
            const query = `SELECT * FROM spgcpos.products WHERE prodstatus = '1' LIMIT ${limit} OFFSET ${offset}`;

            mysql.query(query, (err, result) => {
                return err ? reject(err) : resolve(result);
            })
        } else {
            reject(new Error('Invalid data')); 
        }
    })
}

export default db;