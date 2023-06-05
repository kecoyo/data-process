const path = require('path');
const fsExtra = require('../common/fs-extra');

/**
 * 生成“livp转jpg”数据源
 */

const rows = [];
const rootDir = 'D:\\livp';

async function main() {
  // eslint-disable-next-line no-restricted-syntax
  for await (const entry of fsExtra.readdirp(rootDir, { fileFilter: '*.livp' })) {
    const { fullPath, basename } = entry;
    const row = {};
    row.fullPath = fullPath;
    row.basename = basename;
    rows.push(row);
    console.log(row);
  }

  fsExtra.writeCsv(path.join(__dirname, './livp2jpg.csv'), rows);
  console.log('OK');
}

main();
