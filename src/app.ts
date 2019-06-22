import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morganLogger from 'morgan';
import path from 'path';
import mongo from './db/mongodb';
import mainRouter from './routes/main';

import { createLogger, format, transports } from 'winston';
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
const corsOpt = function(req: any, callbank: any) {
  callbank(null, {origin: true});
};
// 모든 도메인의 통신을 허용합니다.
 
app.options('*', cors(corsOpt));
// 모든 options 메서드로의 사전 전달 접근을 허용합니다.
// app.use(cors());
app.use('/', mainRouter);

app.listen(30704, () => {
  logger.info('Express server has started on port 30704');
});
