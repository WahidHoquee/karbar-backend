const bcrypt = require('bcrypt')

import Joi from '@hapi/joi';
import { pick } from 'lodash';

import { RequestHandler } from 'express'
import { dUser, findUserByEmail, createUser } from '../models/user';

type params = {
    UserName: string,
    UserPass: string,
    Email: string,
}

const registerUser: RequestHandler<params> = async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await findUserByEmail(req.body.Email);
    if (user && user.length !== 0) return res.status(400).send("User Already Registered");

    const salt = await bcrypt.genSalt(10);
    req.body.UserPass = await bcrypt.hash(req.body.UserPass, salt);

    user = await createUser(req.body)
}

function validate(input: object) {
    const schema = Joi.object({
        Email: Joi.string().email().required(),
        UserName: Joi.string().min(3).pattern(/^[aA-zZ]+$/).required(),
        UserPass: Joi.string().min(5).pattern(/^[A-Z][aA-zZ]+$/).required(),
    })
    return schema.validate(input)
}


const getCurrentUserInfo = () => {

}
export { registerUser, getCurrentUserInfo };