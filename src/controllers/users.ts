import { RequestHandler } from 'express'
import { dMenu, getMenu } from '../models/menu'

type params = {
    name: string,
    email: string,
    password: string
}

const registerUser: RequestHandler<params> = async(req, res) => {
    console.log(req.body)
}

export { registerUser };