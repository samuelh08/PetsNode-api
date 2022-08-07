const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');

function stripFinalNewline(input) {
  const LF = typeof input === 'string' ? '\n' : '\n'.charCodeAt();
  const CR = typeof input === 'string' ? '\r' : '\r'.charCodeAt();

  if (input[input.length - 1] === LF) {
    // eslint-disable-next-line no-param-reassign
    input = input.slice(0, -1);
  }

  if (input[input.length - 1] === CR) {
    // eslint-disable-next-line no-param-reassign
    input = input.slice(0, -1);
  }

  return input;
}

// Setup logger
const logger = createLogger({
  format: format.simple(),
  transports: [new transports.Console()],
});

// Setup requests logger
morgan.token('id', (req) => req.id);

const requestFormat = ':remoteaddr [:date[iso]] :id "method : url" :status';
const requests = morgan(requestFormat, {
  stream: {
    write: (message) => {
      // Remove all line breaks
      const log = stripFinalNewline(message);
      return logger.info(log);
    },
  },
});

// Attach to logger object
logger.requests = requests;

// Format as request logger and attch to logger object
logger.header = (req) => {
  const date = new Date().toISOString();
  return `${req.ip} [${date}] ${req.id} "${req.method} ${req.originalUrl}"`;
};

module.exports = logger;
