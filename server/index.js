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
  const message = 'Route not found';
  const statusCode = 404;

  logger.warn(message);

  res.status(statusCode);
  res.json({
    message,
  });
});

// Error handler
app.use((error, req, res, next) => {
  const { statusCode = 500, message } = error;

  logger.error(message);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
