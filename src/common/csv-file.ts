import { FormatterOptionsArgs, ParserOptionsArgs, parseStream, writeToStream } from 'fast-csv';
import fs from 'fs';
import _ from 'lodash';

export type ReadCsvOptions = {} & ParserOptionsArgs;

/**
 * 读取csv文件
 * @param file 要读取的文件
 * @param options
 * @returns 返回一个object[]
 */
export async function readCsv<T = any>(file: string, options?: ReadCsvOptions): Promise<T[]> {
  return await new Promise((resolve, reject) => {
    options = _.defaultsDeep({}, options, {
      headers: true,
    });
    let rows: T[] = [];
    parseStream(fs.createReadStream(file, 'utf-8'), options)
      .on('error', (error) => reject(error))
      .on('data', (row: T) => rows.push(row))
      .on('end', () => resolve(rows));
  });
}

// export const readCsv = universalify.fromPromise(_readCsv);
// const readCsvSync = convertToSyncFunction(_readCsv);

export type WriteCsvOptions = {} & FormatterOptionsArgs<any, any>;

/**
 * 将数据写入csv文件
 * @param file 要写入的csv文件
 * @param rows 要写入的数据
 * @param options
 * @returns
 */
export async function writeCsv<T>(file: string, rows: T[], options?: WriteCsvOptions): Promise<void> {
  return await new Promise((resolve, reject) => {
    options = _.defaultsDeep({}, options, {
      headers: true,
    });
    writeToStream(fs.createWriteStream(file, 'utf-8'), rows, options)
      .on('error', (err) => reject(err))
      .on('finish', () => resolve());
  });
}

// export const writeCsv = universalify.fromPromise(_writeCsv);
// const writeCsvSync = convertToSyncFunction(_writeCsv);
