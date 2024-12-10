import mysql from './db.js';

let db = {};

db.save_info = (data) => {
    return new Promise((resolve, reject) => {
        if(data != '' && data != null && data != undefined) {
            // CHECK IF THE USER IS ALREADY REGISTERED
            const check_user = `SELECT * FROM order.users WHERE email = '${data.email}';`;

            mysql.query(check_user, (err, result) => {
                if (err) {
                    return reject(err);
                }

                if(result.length > 0) {
                    const res = {
                        isExist: true,
                        data: result[0]
                    }
                    return resolve(res);
                } 

                // SAVE NEW USER
                const keys = Object.keys(data).join(', ');
                const vals = Object.values(data).map(val => `'${val}'`).join(', ');
                
                const query = `INSERT INTO order.users (${keys}) VALUES (${vals});`;

                mysql.query(query, (err, result) => {
                    if (err) {
                        return reject(err); 
                    }

                    const insrt = {
                        isExist: false,
                        data: result,
                    }
                    resolve(insrt);
                });
            });
        } else {
            reject(new Error('Invalid data')); 
        }
    })
}

export default db;