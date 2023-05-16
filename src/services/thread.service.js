/**
 * File name: thread.controller.js
 * Description: This file contains all thread services.
 * Author(s): nathandev
 * Creation date: 14/05/2023
 * Last modified date: 17/05/2023
 */

const { initDocs } = require('../services/document.service');
const Thread = require('../models/thread.model');
const { timeStamp } = require('../utils/date_time');
const { generateSessionID } = require('../helpers/thread.helper');


// Initiliaze documents after server is started and get vectore store
// eslint-disable-next-line no-unused-vars
let vectoreStore;
(async () => {
  vectoreStore = await initDocs();
})();

const createNewThread = async () => {
  try {
    const newThread = await Thread.createNewThread({
      createdAt: timeStamp(),
      isActive: true,
      sessionID: generateSessionID(),
    });
    return newThread;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createNewThread,
};
