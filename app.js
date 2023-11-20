import express from 'express';

import { newDB } from './utils/database.js';

import router from './routes/routes.js';

import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(express.urlencoded({ extended: true }));

// app.use(express.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.options('*', cors());
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE',
    'OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );
  if (_.method !== 'OPTIONS') {
    next();
  }
});
app.use(router);

newDB.sync();

app.listen(8080, '192.168.23.72');
