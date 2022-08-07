const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to the API',
  });
});

// No route found handler
app.use((req, res, next) => {
  res.status(404);
  res.json({
    message: 'Error. route not found',
  });
});

// Error handler
app.use((error, req, res, next) => {
  const { statusCode = 500, message } = error;

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
