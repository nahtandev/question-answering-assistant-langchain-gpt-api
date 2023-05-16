/**
 * File name: thread.controller.js
 * Description: This file contains Express controllers that act as intermediaries between HTTP requests and application logic.
 * Author(s): nathandev
 * Creation date: 14/05/2023
 * Last modified date: 17/05/2023
 */

const { createNewThread } = require('../services/thread.service');

// eslint-disable-next-line no-unused-vars
const newThread = async (req, res, next) => {
    const newThread = await createNewThread();
    res.send(newThread);
};

module.exports = {
  newThread,
};
