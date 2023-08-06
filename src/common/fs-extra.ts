import fs from 'fs-extra';
import readdir, { EntryInfo, ReaddirpOptions } from 'readdirp';

/**
 * 目录文件查找
 *
 * @param root 指定一个根目录
 * @param options
 * @returns
 */
export function readdirp(root: string, options?: ReaddirpOptions): Promise<EntryInfo[]> {
  return readdir.promise(root, options);
}

/**
 * 获取文件大小，返回文件大小
 *
 * @param file 文件路径
 * @returns
 */
export function getFileSize(file: string) {
  const stats = fs.statSync(file);
  return stats.size;
}
