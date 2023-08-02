import fs from 'fs-extra';
import readdir, { EntryInfo, ReaddirpOptions } from 'readdirp';
import arrayFile from './array-file';
import csvFile from './csv-file';

type FsType = typeof fs;
type FsExtraType = {
  /**
   * 目录文件查找
   */
  readdirp: (root: string, options?: ReaddirpOptions) => Promise<EntryInfo[]>;

  /**
   * 获取文件大小，返回文件大小
   *
   * @param filePath 文件路径
   * @returns
   */
  getFileSize: (filePath: string) => number;
} & FsType;

const fsExtra: FsExtraType = {
  ...fs,
  ...arrayFile,
  ...csvFile,

  readdirp: readdir.promise,

  /**
   * 获取文件大小，返回文件大小
   *
   * @param filePath 文件路径
   * @returns
   */
  getFileSize(filePath: string) {
    const stats = fs.statSync(filePath);
    return stats.size;
  },
};

export default fsExtra;
