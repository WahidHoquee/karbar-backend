const config = require('../config');

import { RequestHandler } from "express";
import { dMenu, getMenu } from "../models/menu";

type fetchedControl = dMenu[] | null;

const fetchMenu: RequestHandler = async (req, res, next) => {
    const data: fetchedControl = await getMenu(config.user.CLIENT_CODE, config.user.MODULE_CODE, "WA");
    if (data) {
        res.status(200).json(data);
    }
};

export { fetchMenu };
