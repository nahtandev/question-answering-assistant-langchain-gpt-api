// Return current data and hours in unix timestamp format
const timeStamp = () => Math.floor(Date.now() / 1000);

// Convert a timestamp date to human format
const humanDateFormat = (timeStamp) =>
  new Date(timeStamp * 1000).toLocaleString('fr-BJ');

const getDateFromTimestamp = (timeStamp) =>
  new Date(timeStamp * 1000).toLocaleDateString('fr-BJ');

const getTimeFromTimestamp = (timeStamp) =>
  new Date(timeStamp * 1000).toLocaleTimeString('fr-BJ');

const getTimeStampFromDate = (date = new Date()) =>
  Math.floor(date.getTime() / 1000);

module.exports = {
  timeStamp,
  humanDateFormat,
  getDateFromTimestamp,
  getTimeFromTimestamp,
  getTimeStampFromDate
};
