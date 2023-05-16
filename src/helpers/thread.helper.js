/**
 * File name: thread.helper.js
 * Description: This file contains all thread helpers.
 * Author(s): nathandev
 * Creation date: 16/05/2023
 * Last modified date: 16/05/2023
 */

const generateSessionID = () => Math.random().toString(16).slice(2);

module.exports = {
  generateSessionID,
};
