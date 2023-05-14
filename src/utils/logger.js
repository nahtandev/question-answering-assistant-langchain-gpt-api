/**
 * File name: logger.js
 * Description: Manage logs
 * Author(s): nathandev
 * Creation date: 12/05/2023
 * Last modified date: 12/05/2023
 */

const pino = require('pino');

const console = pino({});

module.exports = console;
