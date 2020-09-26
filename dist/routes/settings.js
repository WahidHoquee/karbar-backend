"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mailSender_1 = require("../controllers/mailSender");
var mailSend = express_1.Router();
mailSend.post("/bulkMailSend", mailSender_1.mailSender);
exports.default = mailSend;
