import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import db from '../model/users.js';
dotenv.config();

const loggedUser = (req, res) => {
    const token = Object.keys(req.cookies)
  
    if(token.length > 0) {
        token.forEach((e) => {
            const accessToken = req.cookies[e];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
                if(err) {
                    return res.status(403).json({
                        result: false,
                        message: 'Access Token Not Found'
                    }); 
                } else {
                    const response = await db.get_user(user)
                    let result = response[0]

                    return res.status(200).json({
                        result: true,
                        token: result
                    })
                }
                
            })
        })
    } 
    // else {
    //     return res.status(403).json({
    //         result: false,
    //         message: 'Access Token Not Found'
    //     }); 
    // }
}

export default loggedUser;