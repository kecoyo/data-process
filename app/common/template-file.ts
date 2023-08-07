import fs from 'fs-extra';
import path from 'path';
import { camelCase, kebabCase, pascalCase, snakeCase } from './change-case';

/**
 * 替换内容
 * @param {*} content 源文本
 * @param {*} srcName 源名称
 * @param {*} destName 目标名称
 * @param {*} specialRules 额外的特殊替换规则，会优先执行
 * @returns 目标文本
 */
export function replaceContent(content: string, srcName: string, destName: string, specialRules: string[][]) {
  // 要替换的数据
  const rules = [
    ...specialRules, // 特殊替换、中文注释
    [pascalCase(srcName), pascalCase(destName)], // 'FooBar'
    [camelCase(srcName), camelCase(destName)], // 'fooBar'
    [kebabCase(srcName), kebabCase(destName)], // 'foo-bar'
    [snakeCase(srcName), snakeCase(destName)], // 'foo_bar'
  ];

  // 文本替换
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    content = content.replace(new RegExp(rule[0], 'g'), rule[1]);
  }

  return content;
}

/**
 * 创建文件
 * @param {*} srcDir 源目录
 * @param {*} destDir 目标目录
 * @param {*} filePath 相对路径
 * @param {*} srcName 源名称
 * @param {*} destName 目标名称
 * @param {*} specialRules 额外的特殊替换规则，会优先执行
 */
export function createFile(srcDir: string, destDir: string, filePath: string, srcName: string, destName: string, specialRules: string[][]) {
  // 源文件
  const srcFilePath = filePath;
  const srcFile = path.join(srcDir, srcFilePath);

  // 目标文件，路径也要替换
  const destFilePath = replaceContent(filePath, srcName, destName, specialRules);
  const destFile = path.join(destDir, destFilePath);

  // 拷贝文件
  fs.cpSync(srcFile, destFile);

  // 读文件
  let content = fs.readFileSync(destFile, 'utf-8');
  // 文件内容，内容需要替换
  content = replaceContent(content, srcName, destName, specialRules);
  // 写文件
  fs.writeFileSync(destFile, content, 'utf-8');
}
