import fs from 'fs-extra';
import Papa from 'papaparse';
import path from 'path';

const result = Papa.parse(fs.readFileSync(path.join(__dirname, 'normal.csv'), 'utf-8'), {});
console.log('🚀 ~ file: test-papa.ts:5 ~ result:', result);
