require('dotenv').config('');

const config = {
  server: {
    port: process.env.PORT,
  },
  database: {
    protocol: process.env.DATABASE_PROTOCOL,
    url: process.env.DATABASE_URL,
    username: process.env.DATABASE_PASSWORD,
  },
};

module.exports = config;
