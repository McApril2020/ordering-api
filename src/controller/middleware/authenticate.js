import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const auth = (req, res, next) => {
    const tokens = Object.keys(req.cookies)

    if(tokens.length > 0) {
        tokens.forEach(e => {
            const accessToken = req.cookies[e];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if(err) {
    
                    return res.status(403).json({
                         result: false,
                        message: 'Access Token Not Found'
                    }); 
                } 

                next();
            })
        })
    } else {
        return res.status(403).json({
            result: false,
            message: 'Access Token Not Found'
        });
    }
}   

const auth_user = (req, res, next) => {
    const tokens = Object.keys(req.cookies);
    console.log(tokens)
    if(tokens.length > 0) {
        // tokens.forEach(e => {
        //     const accessToken = req.cookies[e];

        //     jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        //         if(err) {

        //             next();
        //         } else {

        //             // next();
        //         }

        //     })
        // })
        //  next()
    } else {

        next();
    }
    
}

export default {
    auth,
    auth_user
};


