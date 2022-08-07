const express = require('express');
const { v4: uuidv4 } = require('uuidv4');

const logger = require('./config/logger');

// Init app
const app = express();

// Add unique ID to every request
app.use((req, res, next) => {
  req.id = uuidv4();
  next();
});

// Setup middleware
app.use(logger.requests);

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
  const { statusCode = 500, message, level = 'error' } = error;
  const log = `${logger.header(req)} ${statusCode} ${message}`;

  logger[level](log);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
