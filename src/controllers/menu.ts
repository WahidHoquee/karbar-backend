import { Request, Response } from 'express'
import { dMenu, getMenu } from '../models/menu'

const fetchMenu = async(req: Request, res: Response) => {
    const data: dMenu[] | undefined = await getMenu('0010', '0100', 'WA');
    if(data){
        res.status(200).json(data);        
    }else{
        res.status(404).send("Cant retrieve data")
    }
}

export { fetchMenu };