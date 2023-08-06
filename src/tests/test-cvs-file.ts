import { readCsv, writeCsv } from '@/common/csv-file';
import path from 'path';

readCsv(path.join(__dirname, '../network/download-file.csv')).then((rows) => {
  console.log('🚀 ~ file: csv-file.ts:54 ~ readCsv ~ rows:', rows);
  writeCsv(path.join(__dirname, './download-file.csv'), rows);
});
