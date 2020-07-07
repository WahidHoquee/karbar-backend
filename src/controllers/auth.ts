import Joi from '@hapi/joi';
import { sign } from 'jsonwebtoken'
import { pick } from 'lodash';

import { RequestHandler } from 'express'
import { dUser, findUserByEmail } from '../models/user'

const bcrypt = require('bcrypt')
const config = require('config');

type params = {
    Email: string,
    UserPass: string
}

const authUser: RequestHandler<params> = async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user: dUser[] | null = await findUserByEmail(req.body.Email);
    if (user && user.length === 0) return res.status(400).send("Invalid email or password");
    
    if(user){
        const validPassword = await bcrypt.compare(req.body.UserPass, user[0].UserPass);
        if(!validPassword) return res.status(400).send("Invalid email or password");
    
        const payload = pick(user[0], ['ClientCode', 'ModuleCode', 'LCode', 'ACode', 'GroupName', 'UserName', 'Email'])
        const token = sign(payload, config.get('jwtPrivateKey'))
        
        res.send(token)
    }
}

function validate(input: object) {
    const schema = Joi.object({
        Email: Joi.string().email().required(),
        UserPass: Joi.string().min(5).pattern(/^[A-Z][aA-zZ]+$/).required(),
    })
    return schema.validate(input)
}

export { authUser };