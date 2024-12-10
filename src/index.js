import express from 'express';
import db_conn from './model/db.js';
import items_router from './routes/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use('/order/api', items_router);

db_conn.getConnection((err, connection) => {
    if(err) {
        console.log(err.sqlMessage)
        return;
    } else {
        app.listen(4000, () => {
            console.log('Server is up and running at port 4000')
        })
        connection.release();
    }
})

