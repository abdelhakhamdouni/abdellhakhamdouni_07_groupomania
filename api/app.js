const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const router = require('./routes');
require('dotenv').config()

const app = express();

app.use(cors());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads',express.static(path.join(__dirname, '/uploads')));
app.use('/api', router);

module.exports = app;
