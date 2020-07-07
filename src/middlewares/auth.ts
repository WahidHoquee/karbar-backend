import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';

const config = require('config')

interface PayloadedRequest extends Request{
    user: string | object
}
function authenticate (req: any, res: Response, next: NextFunction) {
    const token = req?.header('x-auth-token');
    if(!token) {
        return res.status(401).send('Access denied. No token Provided');
    }
    else{
        try {
            const payload = verify(token, config.get('jwtPrivateKey'));
            req.user = payload;
            next();
        } catch (error) {
            res.status(400).send('Invalid token')
        }
    }
}

export default authenticate;