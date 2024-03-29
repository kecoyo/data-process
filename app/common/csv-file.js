const fs = require('fs');
const universalify = require('universalify');
const csv = require('fast-csv');
// const { convertToSyncFunction } = require('converter-to-sync');

async function _readCsv(file, options = { headers: true }) {
  let list = await new Promise((resolve, reject) => {
    let rows = [];
    csv
      .parseStream(fs.createReadStream(file), options)
      .on('error', error => reject(error))
      .on('data', row => rows.push(row))
      .on('end', () => resolve(rows));
  });

  return list;
}

const readCsv = universalify.fromPromise(_readCsv);

// const readCsvSync = convertToSyncFunction(_readCsv);

async function _writeCsv(file, rows, options = { headers: true }) {
  return await new Promise((resolve, reject) => {
    csv
      .writeToStream(fs.createWriteStream(file), rows, options)
      .on('error', err => reject(err))
      .on('finish', () => resolve());
  });
}

const writeCsv = universalify.fromPromise(_writeCsv);

// const writeCsvSync = convertToSyncFunction(_writeCsv);

module.exports = {
  readCsv,
  // readCsvSync,
  writeCsv,
  // writeCsvSync,
};
