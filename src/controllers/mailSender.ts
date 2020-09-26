import { RequestHandler } from "express";
// import { dMenu, getMenu } from "../models/menu";

// type fetchedControl = dMenu[] | null;

const mailSender: RequestHandler = async (req, res, next) => {
    console.log(req.body.emails)
    // const data: fetchedControl = await getMenu("0010", "0100", "WA");
    // if (data) {
    //     res.status(200).json(data);
    // }
};

export { mailSender };
