const winston = require('winston')
import { Request, Response, NextFunction } from "express";


function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    winston.error(err.message, err);
    res.status(500).send('Something Failed');
}
export default errorHandler;