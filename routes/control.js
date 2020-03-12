const express = require('express');
const formController = require('../controllers/control')

const control = express.Router();

control.get('/control/:menuParams',formController.getControl);

module.exports = control;