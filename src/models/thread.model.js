/**
 * File name: thread.model.js
 * Description: This file is data model for a thread in this project.
 * Author(s): nathandev
 * Creation date: 17/05/2023
 * Last modified date: 17/05/2023
 */

const prisma = require('../db');

class Thread {
  static createNewThread = async ({
    createdAt,
    isActive,
    sessionID,
    threadHistory,
  }) => {
    try {
      const newThread = await prisma.thread.create({
        data: {
          created_at: createdAt,
          is_active: isActive,
          session_id: sessionID,
          thread_history: threadHistory,
        },
      });
      return newThread;
    } catch (error) {
      throw new Error('Error to create a new thread');
    }
  };

  static updateThread = async ({ threadID, isActive, threadHistory }) => {
    try {
      const updateThread = await prisma.thread.update({
        where: {
          thread_id: threadID,
        },
        data: {
          is_active: isActive,
          thread_history: threadHistory,
        },
        select: {
          thread_id: true,
          session_id: true,
          created_at: true,
          thread_history: true,
          messages: true,
          is_active: true,
        },
      });
      return updateThread;
    } catch (error) {
      throw new Error(error);
    }
  };

  static getThreadBySessionID = async (sessionID) => {
    try {
      const thread = await prisma.thread.findFirst({
        where: {
          session_id: sessionID,
        },
        select: {
          thread_id: true,
          session_id: true,
          created_at: true,
          thread_history: true,
          messages: true,
          is_active: true,
        },
      });
      return thread;
    } catch (error) {
      throw new Error(error);
    }
  };

  static getThreadById = async (threadId) => {
    try {
      const thread = await prisma.thread.findUnique({
        where: {
          thread_id: threadId,
        },
        select: {
          session_id: true,
          created_at: true,
          thread_history: true,
          messages: true,
          is_active: true,
        },
      });
      return thread;
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = Thread;
