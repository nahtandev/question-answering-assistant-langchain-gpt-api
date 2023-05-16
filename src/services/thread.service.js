/**
 * File name: thread.controller.js
 * Description: This file contains all thread services.
 * Author(s): nathandev
 * Creation date: 14/05/2023
 * Last modified date: 17/05/2023
 */

const { initDocs } = require('../services/document.service');

// Initiliaze documents after server is started and get vectore store
// eslint-disable-next-line no-unused-vars
let vectoreStore;
(async () => {
  vectoreStore = await initDocs();
})();

const createNewThread = async () => {
  
};

module.exports = {
  createNewThread,
};
