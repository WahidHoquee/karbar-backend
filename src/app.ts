import express from 'express';
import bodyParser from 'body-parser';

import menuRoute from './routes/menu';
import formRoute from './routes/form';
import usersRoute from './routes/users'
// import bookmarksRoute from './routes/bookmark';
// import dashboardRoute from './routes/dashboard';

const app = express ();


app.use(bodyParser.json());   
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, DELETE, PATCH"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

app.use('/api/menu', menuRoute);
app.use('/api/form', formRoute);
app.use('/api/users',usersRoute);
// app.use(reportRoute);

app.listen(process.env.PORT || 8080);
