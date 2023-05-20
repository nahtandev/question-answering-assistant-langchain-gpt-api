/**
 * File name: document.controller.js
 * Description: This file contains all docment services.
 * Author(s): nathandev
 * Creation date: 14/05/2023
 * Last modified date: 15/05/2023
 */

const {
  getAllDocsFromFolder,
  loadAndSplitDocument,
  vectorizeDocument,
  getVectorizedDocument,
} = require('../helpers/document.helper');
const { logger } = require('../utils/logger');
const { timeStamp } = require('../utils/date_time');
const Document = require('../models/document.model');

const initDocs = async () => {
  // Get all docs saved from folder. // If any docs is'nt saved on folder, verify database. // If database contain nothing, return an error stop server
  // Check if each docs is saved on database. // If a doc is saved on db, check if it sync; otherwise, update data // If docs is'nt saved on db, save this and sync
  //   Get docs from folder and database
  try {
    const folderDocs = await getAllDocsFromFolder();
    const dbDocs = await Document.getAllDocuments();
    let docsToSync = [];

    // If there is at least one document in the folder
    if (folderDocs.length) {
      // Read each retrieved document
      folderDocs.forEach((doc) => {
        // Check if doc is sync on db
        const isSync = dbDocs.find(
          (dbDoc) => doc.fileName === dbDoc.document_title,
        );

        if (!isSync) {
          docsToSync.push({
            doc: doc,
            isNewFile: true,
          });
        } else {
          // If doc is sync, compare metadata to check if the contents of the recovered file in the folder would have changed.
          isSync.document_last_size !== doc.fileSize &&
            docsToSync.push({
              doc: doc,
              isNewFile: false,
            });
        }
      });
    } else if (!dbDocs.length) {
      throw new Error(
        'No document to be sync. Try to add new document into folder',
      );
    }

    //Load, Split and Sync Document on Database and Vector DB
    docsToSync.forEach(async (doc) => {
      const splittedDoc = await loadAndSplitDocument(doc.doc.path);

      // eslint-disable-next-line no-unused-vars
      const vectorizeDoc = await vectorizeDocument(splittedDoc);

      // If docs is been sync succeful, add or update data on database
      if (doc.isNewFile) {
        console.log('New file');
        // eslint-disable-next-line no-unused-vars
        const newDocument = await Document.createNewDocument({
          title: doc.doc.fileName,
          path: doc.doc.path,
          lastSize: doc.doc.fileSize,
          lastUpdate: doc.doc.lastUpate,
          lastSyncAt: timeStamp(),
        });
      } else {
        // eslint-disable-next-line no-unused-vars
        const updateDocument = Document.updateDocument({
          id: dbDocs.find((dbDoc) => dbDoc.document_title === doc.doc.fileName)
            .document_id,
          lastUpdate: doc.doc.lastUpate,
          lastSize: doc.doc.fileSize,
          lastSyncAt: timeStamp(),
        });
      }

      console.info(`[${doc.doc.fileName}] is sync succeful`);
    });

    // If all docs is sync succeful connect apps to vectore store
    const vectoreStore = await getVectorizedDocument();
    console.info('Connection to vectore store initialized succeful');
    return vectoreStore;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  initDocs,
};
