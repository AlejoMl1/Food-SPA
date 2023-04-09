const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
require('dotenv').config();
//*Esto es para el deployment en heroku 
const {CORS_URL} = process.env;
console.log('cors url ',CORS_URL);
require('./db.js');

const server = express();

server.name = 'API';

//headers
//this line is to gain the ability to parser the .json files correctly
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));

server.use(cookieParser());
//print in the console every time exists a request
server.use(morgan('dev'));
//Middleware to set the headers
server.use((req, res, next) => {
  // update to match the domain you will make the request from
  //!this will have to change in deployment to match the frontend domain
  res.header('Access-Control-Allow-Origin', CORS_URL)
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  //configure the type of headers the backend is going to accept
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //the diferents methods for the request
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  //the execution has to continue
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
