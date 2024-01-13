const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const connectDb = require('./config/db');
const router = require('./routes/index');
const http = require('http');
const server = http.createServer(app);
const errorHandler = require('./middlewares/errorHandler');
const { config: envConfig } = require('dotenv');



// config and middlewares
if(process.env.ENV !== 'PRODUCTION') envConfig()
connectDb();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(errorHandler);


module.exports = server;
