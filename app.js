const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const connectDb = require('./config/db');
const routerV1 = require('./routes/v1');
const http = require('http');
const server = http.createServer(app);
const errorHandler = require('./middlewares/errorHandler');
const initFirebase = require('./config/firebase')


// config and middlewares
if(process.env.ENVIRONMENT?.toString() != 'PRODUCTION') {
  require('dotenv').configDotenv()
} else {
  console.log('loaded os env');
}

connectDb();
initFirebase(process.env);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', routerV1);
app.use(errorHandler);


module.exports = server;
