import express from 'express';
require('express-async-errors');

import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import menuRoute from './routes/menu';
import formRoute from './routes/form';
import usersRoute from './routes/users';
import authRoute from './routes/auth';
import settingsRoute from './routes/settings';

import cors from './middlewares/cors';
import authenticate from './middlewares/auth';
import errorHandler from './middlewares/error';


// winston.add(winston.transports.File, { filename: "logfile.log" });
// const winston = require('winston')
// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),
//     defaultMeta: { service: 'user-service' },
//     transports: [
//       new winston.transports.File({ filename: 'error.log', level: 'error' }),
//       new winston.transports.File({ filename: 'combined.log' }),
//     ],
// });

//To check if all the Environment Variables are stored properly
// const config = require('config');

// if(!config.get('jwtPrivateKey')){
//     console.error('FATAL ERROR: jwtPrivateKey is not defined');
//     process.exit(1); 
// }

const app = express();

app.use(bodyParser.json());

app.use(helmet());

app.use(compression());

app.use(morgan('dev'))

app.use(cors);


app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/settings', settingsRoute)


// app.use(authenticate);

app.use('/api/menu', menuRoute);
app.use('/api/form', formRoute);

// app.use(errorHandler);

app.listen(process.env.PORT || 8080);
