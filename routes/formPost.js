const express = require('express');
const formPostController = require('../controllers/formPost')

const formPost = express.Router();

formPost.post('/form-post',formPostController.postForm);

module.exports = formPost;                       
