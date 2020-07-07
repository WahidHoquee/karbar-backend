"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../controllers/auth");
var user = express_1.Router();
user.post("/", auth_1.authUser);
exports.default = user;
