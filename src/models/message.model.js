/**
 * File name: message.model.js
 * Description: This file is data model for thread message in this project.
 * Author(s): nathandev
 * Creation date: 20/05/2023
 * Last modified date: 20/05/2023
 */

const prisma = require('../db');

class Message {
  static addNewMessage = async ({ threadId, role, text, createdAt, rang }) => {
    try {
      const newMessage = prisma.messages.create({
        data: {
          chat_id: threadId,
          text: text,
          created_at: createdAt,
          role: role,
          rang: rang,
        },
      });
      return newMessage;
    } catch (error) {
      throw new Error('Error to create a new message');
    }
  };
}



module.exports = Message;
