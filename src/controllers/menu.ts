import { RequestHandler } from 'express';
import { dMenu, getMenu } from '../models/menu';

type fetchedControl = dMenu[] | null;
const fetchMenu: RequestHandler = async(req, res) => {
    const data: fetchedControl = await getMenu('0010', '0100', 'WA');
    if(data){
        res.status(200).json(data);        
    }
    else{
        res.status(404).send("Cant retrieve data")
    }
}

export { fetchMenu };