/**
 * File name: thread.controller.js
 * Description: This file contains all document helpers.
 * Author(s): nathandev
 * Creation date: 14/05/2023
 * Last modified date: 15/05/2023
 */

const fs = require('fs');
const path = require('path');
const { TextLoader } = require('langchain/document_loaders/fs/text');
const { CharacterTextSplitter } = require('langchain/text_splitter');
const { MyScaleStore } = require('langchain/vectorstores/myscale');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const { myscaleConfig } = require('../configs');
const { getTimeStampFromDate } = require('../utils/date_time');

const getAllDocsFromFolder = () =>
  // eslint-disable-next-line no-undef
  new Promise((resolve, reject) => {
    const docs = [];
    const folderPath = 'documents';

    //   Read folder and get all contain
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
      }

      // Read each contain
      else
        files.forEach((file) => {
          const filePath = path
            .normalize(path.join(__dirname, '../../', folderPath, file))
            .replace(/\\/g, '\\\\'); // This line is important because, windows system and json format

          // eslint-disable-next-line security/detect-non-literal-fs-filename
          const fileStats = fs.statSync(filePath);

          // And Check if a contains  file extension is .txt
          if (fileStats.isFile() && path.extname(filePath) === '.txt') {
            docs.push({
              fileName: path.basename(filePath),
              path: filePath,
              fileSize: fileStats.size,
              stats: fileStats,
              lastUpate: getTimeStampFromDate(fileStats.mtime),
            });
          }
        });

      // Return docs array
      resolve(docs);
    });
  });

const loadAndSplitDocument = async (documentPath) => {
  try {
    const loader = new TextLoader(documentPath);
    const docs = await loader.load();

    const splitter = new CharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 0,
      separator: '\r\n',
    });

    const docsSplit = await splitter.splitDocuments(docs);
    return docsSplit;
  } catch (error) {
    throw new Error(error);
  }
};

const vectorizeDocument = async (splittedDoc) => {
  try {
    const vectoreStore = await MyScaleStore.fromDocuments(
      splittedDoc,
      new OpenAIEmbeddings(),
      {
        host: myscaleConfig.host,
        port: myscaleConfig.port,
        username: myscaleConfig.username,
        password: myscaleConfig.password,
      },
    );
    return vectoreStore;
  } catch (error) {
    throw new Error(error);
  }
};

const getVectorizedDocument = async () => {
  try {
    const vectoreStore = await MyScaleStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      {
        host: myscaleConfig.host,
        port: myscaleConfig.port,
        username: myscaleConfig.username,
        password: myscaleConfig.password,
        database: myscaleConfig.database,
        table: myscaleConfig.table,
      },
    );
    return vectoreStore;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllDocsFromFolder,
  loadAndSplitDocument,
  vectorizeDocument,
  getVectorizedDocument,
};
