"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var menu_1 = require("../controllers/menu");
var menu = express_1.Router();
menu.get("/", menu_1.fetchMenu);
exports.default = menu;
