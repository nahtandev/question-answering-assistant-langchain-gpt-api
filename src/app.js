/**
 * File name: app.js
 * Description: Configures and starts the server
 * Author(s): Nathan Dev
 * Creation date: 11/05/2023
 * Last modified date: 11/05/2023
 */

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { corsConfig } = require('./configs');
const i18next = require('i18next');
const i18nextHttpMiddleware = require('i18next-http-middleware');
const i18nextBackend = require('i18next-fs-backend');
const errorHandler = require('./middlewares/error.middleware');
const thread = require('./routes/thread.route');

/** Configure server **/
const app = express();

/** Configure translation with i18next**/
i18next
  .use(i18nextBackend)
  .use(i18nextHttpMiddleware.LanguageDetector)
  .init({
    lng: 'fr',
    fallbackLng: 'en',
    preload: ['en', 'fr'],
    ns: ['translation'],
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
    },
  });

/** Configure Middleware **/

// Get the user's preferred language from the request
app.use(i18nextHttpMiddleware.handle(i18next));

// Enable parsing of JSON data in HTTP request bodies
app.use(express.json());

//Enable parsing of URL-encoded form data with the extended option set to true
app.use(express.urlencoded({ extended: true }));

// Enable CORS for the Express application with the specified configuration options
app.use(cors(corsConfig));

// Enable parsing of cookies in HTTP requests
app.use(cookieParser());

/** Routes **/

// Thread Route
app.use('/thread', thread);

// Error Middleware
app.use(errorHandler);

module.exports = app;
