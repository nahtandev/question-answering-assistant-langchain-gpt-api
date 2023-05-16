/**
 * File name: document.model.js
 * Description: This file is data model for a document in this project.
 * Author(s): nathandev
 * Creation date: 14/05/2023
 * Last modified date: 17/05/2023
 */

const prisma = require('../db');

class Docuement {
  static createNewDocument = async ({
    title,
    path,
    lastUpdate,
    lastSize,
    lastSyncAt,
  }) => {
    try {
      const newDocument = await prisma.documents.create({
        data: {
          document_title: title,
          document_last_update: lastUpdate,
          document_path: path,
          document_last_size: lastSize,
          last_sync_at: lastSyncAt,
        },
      });
      return newDocument;
    } catch (error) {
      throw new Error(error);
    }
  };

  static updateDocument = async ({ id, lastUpdate, lastSize, lastSyncAt }) => {
    try {
      const update = await prisma.documents.update({
        where: {
          document_id: id,
        },
        data: {
          document_last_update: lastUpdate,
          document_last_size: lastSize,
          last_sync_at: lastSyncAt,
        },
      });
      return update;
    } catch (error) {
      throw new Error(error);
    }
  };

  static getDocumentByName = async (name) => {
    try {
      const document = await prisma.documents.findFirst({
        where: {
          document_title: name,
        },
      });
      return document;
    } catch (error) {
      throw new Error(error);
    }
  };

  static getAllDocuments = async () => {
    try {
      const documents = await prisma.documents.findMany({});
      return documents;
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = Docuement;
