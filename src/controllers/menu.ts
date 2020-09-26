import { RequestHandler } from "express";
import { dMenu, getMenu } from "../models/menu";

type fetchedControl = dMenu[] | null;

const fetchMenu: RequestHandler = async (req, res, next) => {
    const data: fetchedControl = await getMenu("0010", "0100", "WA");
    if (data) {
        res.status(200).json(data);
    }
};

export { fetchMenu };
