import bcrypt from 'bcryptjs';
import db from '../model/signup.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const signup = async (req, res) => {
    try {
        
        const keys = Object.keys(req.body)
        keys.forEach(e => {
            if(req.body[e] == '') {
                return res.status(422).json({
                    message: `Invalid User ${e}`
                })
            }
        })

        const hashedPass = await bcrypt.hash(req.body.password, 10);
        let obj = {};
        keys.forEach(async e => {
            if(e == 'password') {
                obj[e] = hashedPass;
            } else {
                obj[e] = req.body[e];
            }
        });

        const response = await db.save_info(obj);
        
        if(response.isExist) {
            return res.status(200).json({
                isExist: response.isExist,
                data: response.data,
                message: 'Email is Already Esxist!'
            })
        } else {
            const maxAge = 60000 * 60;
            const accessToken = jwt.sign({email: req.body.email}, process.env.ACCESS_TOKEN_SECRET, {subject: 'accessAPI', expiresIn: maxAge});
            const key = req.body.email.slice(0,3);
            res.cookie(`user${key}`, accessToken, { httpOnly: true, maxAge });
            
            return res.status(200).json({
                isExist: response.isExist,
                data: response.data,
                message: 'New User Successfully Created',
                token: accessToken
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}

export default signup;
