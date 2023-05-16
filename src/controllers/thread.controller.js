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
  try {
    const newThread = await createNewThread();
    res.cookie('session_id', newThread.session_id).status(201).json({
      success: true,
      status: 201,
      message: 'Thread created succeful',
      data: {},
    });
  } catch (error) {
    next({ status: 500, code: 'INTERNAL_SERVER_ERROR', error: error });
  }
};


module.exports = {
  newThread,
};
