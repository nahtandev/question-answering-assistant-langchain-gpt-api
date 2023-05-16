/**
 * File name: index.js
 * Description: Main file that contain all application configuration
 * Author(s): nathandev
 * Creation date: 11/05/2023
 * Last modified date: 11/05/2023
 */

// Upload env variable
require('dotenv').config();

const appConfig = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.LISTEN_PORT || 3000,
  appName: process.env.APP_NAME,
  hostName: process.env.HOST_NAME,
};

const corsConfig = {
  origin: JSON.parse(process.env.ALLOW_LIST),
  credential: true,
};

const errorConfig = {
  defaultCode: 'INTERNAL_SERVER_ERROR',
  defaultStatus: 500,
  defaultMessage:
    'Internal server error. An internal server error has occurred.',
};

const pinoConfig = {
  logLevel: process.env.PINO_LOG_LEVEL || 'info',
};

const databaseConfig = {
  prismaUrl: process.env.DATABASE_URL,
};

const myscaleConfig = {
  host: process.env.MYSCALE_HOST,
  username: process.env.MYSCALE_USERNAME,
  password: process.env.MYSCALE_PASSWORD,
  port: process.env.MYSCALE_PORT,
  database: process.env.MYSCALE_DATABASE,
  table: process.env.MYSCALE_TABLE,
};

module.exports = {
  appConfig,
  corsConfig,
  errorConfig,
  pinoConfig,
  databaseConfig,
  myscaleConfig,
};
