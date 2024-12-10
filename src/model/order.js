import mysql from './db.js';

let db = {};

db.save_order = (data) => {
    return new Promise((resolve, reject) => {

        if(data != '' && data != null && data != undefined) {
            const {id,prodcode,prodname,prodprice,barcode,quantity,fee,total} = data;
            const user_id = data.user.id;

            const query = "INSERT INTO order.user_order (order_id, user_id, productcode,productname, productprice, barcode, quantity, fee, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"
        
            mysql.query(query, [id,user_id,prodcode,prodname,prodprice,barcode,quantity,fee,total], (err, result) => {
                return err ? reject(err) : resolve({insert: true, data: result});
            })
        } else {
            reject(new Error('Invalid Data'))
        }
    })
}

export default db;