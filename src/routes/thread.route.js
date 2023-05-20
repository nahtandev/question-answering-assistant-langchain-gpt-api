/**
 * File name: thread.route.js
 * Description: This file is route that manage all chat request
 * Author(s): nathandev
 * Creation date: 12/05/2023
 * Last modified date: 12/05/2023
 */

const express = require('express');
const {
  newThread,
  getThread,
  newMessage,
  deleteThread,
} = require('../controllers/thread.controller');

const thread = express.Router();

//Route to create new Chat session
thread.post('/', newThread);

// Route to get a thread and message
thread.get('/', getThread);

// Route to post a new message
thread.post('/message', newMessage);

// Route to delete thread
thread.delete('/', deleteThread);

module.exports = thread;
