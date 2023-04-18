const path = require('path');
const fsExtra = require('../../common/fs-extra');

const content = fsExtra.readFileSync(path.join(__dirname, './txt2csv.txt'), 'utf-8');

let lines = content.split('\n').filter(line => line.trim());

let rows = [];
for (let i = 0; i < lines.length / 2; i++) {
  let row = {
    zh_name: lines[i * 2],
    en_name: lines[i * 2 + 1],
  };
  console.log('🚀 ~ row:', row);
  rows.push(row);
}

fsExtra.writeCsvSync(path.join(__dirname, './add_collection.csv'), rows, {
  headers: true,
});

console.log('OK');
