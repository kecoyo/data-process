const fs = require('fs-extra');
const arrayFile = require('./array-file');
const csvFile = require('./csv-file');

module.exports = {
  ...fs,
  ...arrayFile,
  ...csvFile,
};
