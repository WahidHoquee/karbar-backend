import { Request, Response, NextFunction } from "express";

function cors(req: Request, res: Response, next: NextFunction) {
    // console.log(req.body)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, DELETE, PATCH"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
}
export default cors;