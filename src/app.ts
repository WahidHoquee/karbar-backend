import express from 'express';

import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';

import menuRoute from './routes/menu';
import formRoute from './routes/form';
import usersRoute from './routes/users';
import authRoute from './routes/auth';

import cors from './middlewares/cors';
import authenticate from './middlewares/auth';


//To check if all the Environment Variables are stored properly
const config = require('config');
if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1); 
}

const app = express();

app.use(bodyParser.json());

app.use(helmet());

app.use(morgan('dev'))

app.use(cors);

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);

app.use(authenticate);
app.use('/api/menu', menuRoute);
app.use('/api/form', formRoute);
// app.use(reportRoute);

app.listen(process.env.PORT || 8080);
