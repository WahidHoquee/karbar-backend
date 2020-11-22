"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require('express-async-errors');
var body_parser_1 = __importDefault(require("body-parser"));
var helmet_1 = __importDefault(require("helmet"));
var compression_1 = __importDefault(require("compression"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var menu_1 = __importDefault(require("./routes/menu"));
var form_1 = __importDefault(require("./routes/form"));
var users_1 = __importDefault(require("./routes/users"));
var auth_1 = __importDefault(require("./routes/auth"));
var settings_1 = __importDefault(require("./routes/settings"));
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
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(helmet_1.default());
app.use(compression_1.default());
app.use(morgan_1.default('dev'));
app.use(cors_1.default({
    origin: 'https://karbar.herokuapp.com'
}));
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.use('/api/settings', settings_1.default);
// app.use(authenticate);
app.use('/api/menu', menu_1.default);
app.use('/api/form', form_1.default);
// app.use(errorHandler);
app.listen(process.env.PORT || 8080);
