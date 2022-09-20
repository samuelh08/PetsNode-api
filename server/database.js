const mongoose = require('mongoose');

const logger = require('./config/logger');

exports.connect = (
  { protocol = 'mongodb', url, username = '', password = '' },
  options = {}
) => {
  let dburl = '';

  // required auth
  if (username && password) {
    dburl = `${protocol}://${username}:${password}@${url}`;
  } else {
    dburl = `${protocol}://${url}`;
  }

  mongoose.connect(dburl, {
    ...options,
  });

  mongoose.connection.on('open', () => {
    logger.info('Database connected');
  });

  mongoose.connection.on('close', () => {
    logger.info('Database disconnected');
  });

  mongoose.connection.on('error', () => {
    logger.info(`Database connection error: `);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Database connection disconnected through app termination');
      process.exit(0);
    });
  });
};

exports.disconnect = () => {
  mongoose.connection.close(() => {
    logger.info('Database disconnected');
  });
};
