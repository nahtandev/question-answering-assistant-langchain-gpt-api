/**
 * File name: server.js
 * Description: Main server file
 * Author(s): nathandev
 * Creation date: 11/05/2023
 * Last modified date: 12/05/2023
 */

const app = require('./app');
const config = require('../src/configs').appConfig;


// Running Server
app.listen(parseInt(config.port), config.hostName, () => {
  console.info(`${config.appName} is listening at ${config.hostName}:${config.port}`);
});
