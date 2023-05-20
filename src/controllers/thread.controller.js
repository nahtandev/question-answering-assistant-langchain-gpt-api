/**
 * File name: thread.controller.js
 * Description: This file contains Express controllers that act as intermediaries between HTTP requests and application logic.
 * Author(s): nathandev
 * Creation date: 14/05/2023
 * Last modified date: 17/05/2023
 */

const {
  createNewThread,
  addNewMessage,
} = require('../services/thread.service');
const { logger } = require('../utils/logger');

// eslint-disable-next-line no-unused-vars
const newThread = async (req, res, next) => {
  try {
    const question = req.body.question;
    const newThread = await createNewThread(question);
    res
      .cookie('session_id', newThread.sessionID, { httpOnly: true })
      .status(201)
      .json({
        success: true,
        status: 201,
        message: 'Thread created succeful',
        data: newThread.data,
      });
  } catch (error) {
    logger.error(error);
    next({ status: 500, code: 'INTERNAL_SERVER_ERROR', error: error });
  }
};

const getThread = async (req, res, next) => {};

const newMessage = async (req, res, next) => {
  try {
    const sessionID = req.cookies.session_id;
    const userQuestion = req.body.question;
    const addMesage = await addNewMessage(sessionID, userQuestion);
    res.status(200).json({
      success: true,
      status: 200,
      message: [...addMesage.messages].pop().text,
      data: addMesage,
    });
  } catch (error) {
    logger.error(error);
    next({ status: 500, code: 'INTERNAL_SERVER_ERROR', error: error });
  }
};

const deleteThread = async (req, res, next) => {};

module.exports = {
  newThread,
  getThread,
  newMessage,
  deleteThread,
};
