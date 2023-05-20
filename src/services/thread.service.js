/**
 * File name: thread.controller.js
 * Description: This file contains all thread services.
 * Author(s): nathandev
 * Creation date: 14/05/2023
 * Last modified date: 17/05/2023
 */

const { initDocs } = require('../services/document.service');
const Thread = require('../models/thread.model');
const Message = require('../models/message.model');
const { timeStamp } = require('../utils/date_time');
const {
  generateSessionID,
  formatThreadData,
  getLastMessageRank,
} = require('../helpers/thread.helper');
const { OpenAI } = require('langchain/llms/openai');
const { ConversationalRetrievalQAChain } = require('langchain/chains');

// Initiliaze documents after server is started and get vectore store
// eslint-disable-next-line no-unused-vars
let vectoreStore, chain;
const model = new OpenAI({ temperature: 0.9 });
(async () => {
  vectoreStore = await initDocs();

  chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectoreStore.asRetriever(),
  );
})();

const createNewThread = async (firstQuestion) => {
  try {
    // Ask first question
    const response = await chain.call({
      question: firstQuestion,
      chat_history: [],
    });

    // Create a chat history and save into a new thread
    const createdAt = timeStamp();
    const sessionID = generateSessionID();
    const newThread = await Thread.createNewThread({
      createdAt: timeStamp(),
      isActive: true,
      sessionID: sessionID,
    });

    // Save message
    const newUserMessage = await Message.addNewMessage({
      threadId: newThread.thread_id,
      role: 'user',
      text: firstQuestion,
      createdAt: createdAt,
      rang: 1,
    });

    const newBotMessage = await Message.addNewMessage({
      threadId: newThread.thread_id,
      role: 'bot',
      text: response.text,
      createdAt: createdAt,
      rang: 2,
    });

    // update thread history
    const newThreadHistory = `${newUserMessage.text}:  ${newBotMessage.text}`;
    const updateThread = await Thread.updateThread({
      threadID: newThread.thread_id,
      threadHistory: newThreadHistory,
    });
    return { data: formatThreadData(updateThread), sessionID: sessionID };
  } catch (error) {
    throw new Error(error);
  }
};

const addNewMessage = async (sessionID, question) => {
  // Get current thread with session id
  const thread = await Thread.getThreadBySessionID(sessionID);
  const threadHistory = thread.thread_history;
  const lastMessageRank = getLastMessageRank(thread.messages);
  const createdAt = timeStamp();
  const response = await chain.call({ question, chat_history: threadHistory });

  // Save message into database
  // Save message
  const newUserMessage = await Message.addNewMessage({
    threadId: thread.thread_id,
    role: 'user',
    text: question,
    createdAt: createdAt,
    rang: lastMessageRank + 1,
  });

  const newBotMessage = await Message.addNewMessage({
    threadId: thread.thread_id,
    role: 'bot',
    text: response.text,
    createdAt: createdAt,
    rang: lastMessageRank + 2,
  });

  // Update thread history
  const newThreadHistory = `${newUserMessage.text}:  ${newBotMessage.text}`;
  const updateThread = await Thread.updateThread({
    threadID: thread.thread_id,
    threadHistory: newThreadHistory,
  });
  return formatThreadData(updateThread);
};

module.exports = {
  createNewThread,
  addNewMessage,
};
