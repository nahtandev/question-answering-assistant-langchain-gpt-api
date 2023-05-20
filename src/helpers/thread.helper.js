/**
 * File name: thread.helper.js
 * Description: This file contains all thread helpers.
 * Author(s): nathandev
 * Creation date: 16/05/2023
 * Last modified date: 16/05/2023
 */

const generateSessionID = () => Math.random().toString(16).slice(2);

const formatThreadData = (data) => {
  let parsedData = {
    threadId: data.thread_id,
    threadHistory: data.thread_history,
    messages: [],
  };

  // Read message array and format each row
  data.messages.forEach((message) => {
    parsedData.messages.push({
      rang: message.rang,
      text: message.text,
      role: message.role,
    });
  });

  return parsedData;
};

module.exports = {
  generateSessionID,
  formatThreadData,
};
