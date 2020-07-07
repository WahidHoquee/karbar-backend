"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var config = require('config');
function authenticate(req, res, next) {
    var token = req === null || req === void 0 ? void 0 : req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('Access denied. No token Provided');
    }
    else {
        try {
            var payload = jsonwebtoken_1.verify(token, config.get('jwtPrivateKey'));
            req.user = payload;
            next();
        }
        catch (error) {
            res.status(400).send('Invalid token');
        }
    }
}
exports.default = authenticate;
