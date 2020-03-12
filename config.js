"use strict"

const assert = require("assert");
const dotenv = require("dotenv");

dotenv.config();

const {
	PORT,
	SQL_SERVER,
	SQL_DATABASE,
	SQL_USER,
	SQL_PASSWORD,
	SQL_PORT,
} = process.env;

assert(PORT, "PORT configuration is required.");
assert(SQL_SERVER, "SQL_SERVER configuration is required.");
assert(SQL_DATABASE, "SQL_DATABASE configuration is required.");
assert(SQL_USER, "SQL_USER configuration is required.");
assert(SQL_PASSWORD, "SQL_PASSWORD configuration is required.");
assert(SQL_PORT, "SQL_PORT configuration is required.");

module.exports = {
	port: PORT,
	sql: {
		server: SQL_SERVER,
		database: SQL_DATABASE,
		user: SQL_USER,
		password: SQL_PASSWORD,
		port: parseInt(SQL_PORT),
	}
};
