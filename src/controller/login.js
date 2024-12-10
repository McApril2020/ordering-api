import db from '../model/login.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const login = async (req,res) => {
    try {
        const data = req.body
        const response = await db.get_user(data);

        if(response.length > 0) {
            const {email, password} = response[0]
            const hashedPass = await bcrypt.compare(data.password, password);
         
            if(hashedPass) {
                const maxAge = 60000 * 60;
                const accessToken = jwt.sign({email: req.body.email}, process.env.ACCESS_TOKEN_SECRET, {subject: 'accessAPI', expiresIn: maxAge});
                const key = req.body.email.slice(0,3);
                res.cookie(`user${key}`, accessToken, { httpOnly: true, maxAge });

                res.status(200).json({
                    success: true,
                    message: 'Successfully Log In',
                    data: response,
                    // token: accessToken
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Incorrect Email or Password!',
                    data: response,
                    // token: accessToken
                });
            }
            
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid Email or Password!',
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export default login;