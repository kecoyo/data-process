import path from 'path';
import fs from 'fs';
import { EOL } from 'os';
// eslint-disable-next-line import/no-extraneous-dependencies
import csv from 'fast-csv';

// file
const csvfile = path.resolve(__dirname, 'snake_case_users.csv');

function writeFile() {
  const stream = csv.format(); // { headers: true }
  stream.pipe(fs.createWriteStream(csvfile, 'utf-8'));

  stream.write(['a', 'b']);

  for (let i = 0; i < 100; i++) {
    stream.write(['a' + i, 'b' + i]);
    // stream.write(json);
  }

  stream.end();
}

function readFile() {
  fs.createReadStream(csvfile, 'utf-8')
    .pipe(csv.parse({ headers: true }))
    .on('data', row => {
      console.log(row);
    })
    .on('error', error => console.error(error))
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));
}

// writeFile();
readFile();
