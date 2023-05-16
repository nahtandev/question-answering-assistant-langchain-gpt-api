/**
 * File name: document.middleware.js
 * Description: This file contains Express middleware that initialize documents
 * Author(s): nathandev
 * Creation date: 17/05/2023
 * Last modified date: 17/05/2023
 */

const { initDocs } = require('../services/document.service');

const initializeDocuments = () => async (req, res, next) => {
  console.info("Docs load started succeful");
  const vectoreStore = await initDocs();
  req.vectoreStore = vectoreStore;
  console.log(req.vectoreStore);
  next();
};

module.exports = {
  initializeDocuments,
};
