const express = require('express');
const bodyParser = require('body-parser');

const menuRoute = require('./routes/menu');
const controlRoute = require('./routes/control');
const formPostRoute = require('./routes/formPost');
const reportRoute = require('./routes/report');

const app = express()

app.use(bodyParser.json())
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE, PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use(menuRoute);
app.use(controlRoute)
app.use(formPostRoute)
app.use(reportRoute)

app.listen(8080)