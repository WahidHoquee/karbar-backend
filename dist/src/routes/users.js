"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_1 = require("../controllers/users");
var user = express_1.Router();
user.post("/", users_1.registerUser);
exports.default = user;
