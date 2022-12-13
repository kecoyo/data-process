const fs = require('fs');
const universalify = require('universalify');
const csv = require('fast-csv');

async function _readCsv(file, options) {
  let list = await new Promise((resolve, reject) => {
    let rows = [];
    csv
      .parseStream(fs.createReadStream(file), options)
      .on('error', (error) => reject(error))
      .on('data', (row) => rows.push(row))
      .on('end', () => resolve(rows));
  });

  return list;
}

const readCsv = universalify.fromPromise(_readCsv);

async function _writeCsv(file, rows, options = {}) {
  await new Promise((resolve, reject) => {
    csv
      .writeToStream(fs.createWriteStream(file), rows, options)
      .on('error', (err) => reject(err))
      .on('finish', () => resolve());
  });
}

const writeCsv = universalify.fromPromise(_writeCsv);

module.exports = {
  readCsv,
  writeCsv,
};
