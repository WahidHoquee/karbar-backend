"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var control_1 = require("../controllers/control");
// const formPostController = require('../controllers/formPost');
// const reportController = require('../controllers/report');
var form = express_1.Router();
/**
    - GET -> /api/form/[menuParams]
    - To fetch all the controls of the form
*/
form.get('/:menuParams', control_1.fetchControl);
/**
    - POST -> /api/form
    - To post the data to the Database
*/
// form.post('/',formPostController.postForm);
/**
    - POST -> /api/form/view
    - To view the report like data, After submitting some value in the form
    - We will be sending data as response to the clients,According to the form post
*/
// form.post('/view',reportController.getReport);
/**
    - POST -> /api/form/add
*/
/**
    - POST -> /api/form/print
*/
/**
    - POST -> /api/form/report
*/
exports.default = form;
