"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cors(req, res, next) {
    // console.log(req.body)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
}
exports.default = cors;
