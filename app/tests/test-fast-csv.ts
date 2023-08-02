import { format, parse } from 'fast-csv';
import fs from 'fs';
import path from 'path';

// file
const csvfile = path.resolve(__dirname, 'snake_case_users.csv');

function writeFile() {
  const stream = format(); // { headers: true }
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
    .pipe(parse({ headers: true }))
    .on('data', (row) => {
      console.log(row);
    })
    .on('error', (error) => console.error(error))
    .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
}

// writeFile();
readFile();
