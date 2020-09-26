"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require('winston');
function errorHandler(err, req, res, next) {
    winston.error(err.message, err);
    res.status(500).send('Something Failed');
}
exports.default = errorHandler;
