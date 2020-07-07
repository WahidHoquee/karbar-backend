"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var menu_1 = __importDefault(require("./routes/menu"));
var form_1 = __importDefault(require("./routes/form"));
var users_1 = __importDefault(require("./routes/users"));
var auth_1 = __importDefault(require("./routes/auth"));
var cors_1 = __importDefault(require("./middlewares/cors"));
var auth_2 = __importDefault(require("./middlewares/auth"));
//To check if all the Environment Variables are stored properly
var config = require('config');
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(helmet_1.default());
app.use(morgan_1.default('dev'));
app.use(cors_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.use(auth_2.default);
app.use('/api/menu', menu_1.default);
app.use('/api/form', form_1.default);
// app.use(reportRoute);
app.listen(process.env.PORT || 8080);
