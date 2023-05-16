/**
 * File name: thread.route.js
 * Description: This file is route that manage all chat request
 * Author(s): nathandev
 * Creation date: 12/05/2023
 * Last modified date: 12/05/2023
 */

const express = require('express');
const { newThread } = require('../controllers/thread.controller');

const thread = express.Router();

//Route to create new Chat session
thread.post('/', newThread);

module.exports = thread;
