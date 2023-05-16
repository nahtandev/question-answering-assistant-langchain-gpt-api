/**
 * File name: logger.js
 * Description: Manage logs
 * Author(s): nathandev
 * Creation date: 12/05/2023
 * Last modified date: 14/05/2023
 */

const pino = require('pino');

const console = pino({});

// Configure Pino Logger
const logger = pino({
  level: 'error',
  timestamp: true,
  redact: ['req.headers.authorization'],
  prettifier: true,

  //   Save error into following file: logs/error.log
  //   End process
  transport: {
    targets: [
      { level: 'error', target: 'pino-pretty' },
      {
        level: 'error',
        target: 'pino/file',
        options: { destination: 'logs/error.log', sync: false },
      },
    ],
  },
});

module.exports = {
  logger,
  console,
};
