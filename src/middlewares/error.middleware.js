/**
 * File name: error.middleware.js
 * Description: This file contain a middleware that catch any error in application
 * Author(s): nathandev
 * Creation date: 11/05/2023
 * Last modified date: 12/05/2023
 */

const pino = require('pino');
const { errorConfig } = require('../configs');

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

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let response = { success: false };

  const errorCode = err.code || errorConfig.defaultCode;

  const errorMessage =
    req.t(`errors.httpRequest.${errorCode}`) || errorConfig.defaultMessage;

  // Get headers, body from request
  logger.error({
    err: err,
    req: {
      headers: req.headers,
      body: req.body,
    },
  });

  // If body data send is'nt valid JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    response = {
      status: err.status,
      error: {
        code: 'BAD_REQUEST',
        message: req.t(`errors.httpRequest.BAD_REQUEST`),
        errors: [
          {
            field: 'body',
            message: req.t(`errors.invalidTypeData.JSON`),
          },
        ],
      },
    };
  } else {
    response = {
      status: err.status || errorConfig.defaultStatus,
      error: {
        code: errorCode,
        message: errorMessage,
        errors: err.errors || [],
      },
    };
  }

  //   Response JSON with error message
  res.status(response.status).json(response);
};

module.exports = errorHandler;