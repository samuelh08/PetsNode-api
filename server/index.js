const express = require('express');
const { v4: uuidv4 } = require('uuidv4');
const bodyParser = require('body-parser');

const logger = require('./config/logger');
const api = require('./api/v1');

// Init app
const app = express();

// Add unique ID to every request
app.use((req, res, next) => {
  req.id = uuidv4();
  next();
});

// Setup middleware
app.use(logger.requests);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Setup router and routes
app.use('/api/v1', api);

app.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to the API',
  });
});

// No route found handler
app.use((req, res, next) => {
  next({
    message: 'Route not found',
    statusCode: 404,
    level: 'warn',
  });
});

// Error handler
app.use((error, req, res, next) => {
  const { message, level = 'error' } = error;
  let { statusCode = 500 } = error;
  const log = `${logger.header(req)} ${statusCode} ${message}`;

  // Validation errors
  if (error.message.startsWith('ValidationError')) {
    statusCode = 422;
  }

  logger[level](log);

  res.status(statusCode);
  res.json({
    error: true,
    statusCode,
    message,
  });
});

module.exports = app;
