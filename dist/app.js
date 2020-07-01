"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var menu_1 = __importDefault(require("./routes/menu"));
var form_1 = __importDefault(require("./routes/form"));
// import bookmarksRoute from './routes/bookmark';
// import dashboardRoute from './routes/dashboard';
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use('/api/menu', menu_1.default);
app.use('/api/form', form_1.default);
// app.use(formPostRoute);
// app.use(reportRoute);
app.listen(process.env.PORT || 8080);
