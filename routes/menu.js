const express = require('express');
const menuController = require('../controllers/menu')

const menu = express.Router();

menu.get('/menu',menuController.getMenu)

module.exports = menu;