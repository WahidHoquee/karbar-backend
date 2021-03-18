"use strict";
var assert = require("assert");
var dotenv = require("dotenv");
dotenv.config();
// Collecting data from ENV 
var _a = process.env, PORT = _a.PORT, SQL_SERVER = _a.SQL_SERVER, SQL_DATABASE = _a.SQL_DATABASE, SQL_USER = _a.SQL_USER, SQL_PASSWORD = _a.SQL_PASSWORD, SQL_PORT = _a.SQL_PORT, CLIENT_CODE = _a.CLIENT_CODE, MODULE_CODE = _a.MODULE_CODE;
// Checking if the following values are available with the error messages,if they are not available
assert(PORT, "PORT configuration is required.");
assert(SQL_SERVER, "SQL_SERVER configuration is required.");
assert(SQL_DATABASE, "SQL_DATABASE configuration is required.");
assert(SQL_USER, "SQL_USER configuration is required.");
assert(SQL_PASSWORD, "SQL_PASSWORD configuration is required.");
// assert(SQL_PORT, "SQL_PORT configuration is required.");
module.exports = {
    PORT: PORT,
    sql: {
        server: SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD,
        encrypt: true
        // port: parseInt(SQL_PORT),
    },
    user: {
        CLIENT_CODE: CLIENT_CODE,
        MODULE_CODE: MODULE_CODE
    }
};
