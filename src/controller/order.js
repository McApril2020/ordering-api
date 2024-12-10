import { json } from 'express';
import db from '../model/order.js';
import dotenv from 'dotenv';
dotenv.config();

const order = async (req,res) => {
    try {
        const response = await db.save_order(req.body)
        
        if(response.insert) {
            res.status(200).json({
                insert: response.insert,
                insert_res: response.data,
            })
        }
    } catch (error) {
        res.status(422).json({
            insert: false,
            err: error
        })
    }
}

export default order;