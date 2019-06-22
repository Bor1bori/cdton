import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import cors from 'cors';
import express from 'express';
import morganLogger from 'morgan';
import path from 'path';
import mongo from './db/mongodb';
import mainRouter from './routes/main';

import { createLogger, format, transports } from 'winston';
const cors = require('cors');
const { combine, timestamp, prettyPrint } = format;
const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), prettyPrint()),
  transports: [new transports.Console()]
});
const app = express();


// body-parser
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.set('views', path.join(__dirname, '../apidocs'));
app.locals.viewdir = app.get('views');
app.use(express.static(path.join(__dirname, '../apidocs')));

/**
 * //template engine
 */

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// middleware
app.use(morganLogger(''));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
logger.info('db connect start');
mongo(); // mongo DB ON

// app.use(express.static('public'));

// app.use(cors());

app.options('*', (req, res) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  console.log(1);
  res.status(200).json({dohun: 'hi'});
});

app.use('/', mainRouter);

app.listen(30704, () => {
  logger.info('Express server has started on port 30704');
});
