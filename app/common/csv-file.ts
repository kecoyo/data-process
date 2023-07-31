import csv from 'fast-csv';
import fs from 'fs';
import universalify from 'universalify';

async function _readCsv(file, options = { headers: true }) {
  let list = await new Promise((resolve, reject) => {
    let rows: any[] = [];
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
      .on('finish', () => resolve(true));
  });
}

const writeCsv = universalify.fromPromise(_writeCsv);

// const writeCsvSync = convertToSyncFunction(_writeCsv);

export default {
  readCsv,
  // readCsvSync,
  writeCsv,
  // writeCsvSync,
};
