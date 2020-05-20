const express = require('express');
const reportController = require('../controllers/report')

const report = express.Router();

report.post('/report',reportController.getReport);

module.exports = report;                       
