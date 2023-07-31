import jeselvmo from 'jeselvmo';
import path from 'path';
import fsExtra from './fs-extra';

/**
 * 替换内容
 * @param {*} content 源文本
 * @param {*} srcName 源名称
 * @param {*} destName 目标名称
 * @param {*} specialRules 额外的特殊替换规则，会优先执行
 * @returns 目标文本
 */
function replaceContent(content, srcName, destName, specialRules) {
  // 要替换的数据
  const rules = [
    ...specialRules, // 特殊替换、中文注释
    [jeselvmo.pascalCase(srcName), jeselvmo.pascalCase(destName)], // 'FooBar'
    [jeselvmo.camelCase(srcName), jeselvmo.camelCase(destName)], // 'fooBar'
    [jeselvmo.kebabCase(srcName), jeselvmo.kebabCase(destName)], // 'foo-bar'
    [jeselvmo.snakeCase(srcName), jeselvmo.snakeCase(destName)], // 'foo_bar'
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
function createFile(srcDir, destDir, filePath, srcName, destName, specialRules) {
  // 源文件
  const srcFilePath = filePath;
  const srcFile = path.join(srcDir, srcFilePath);

  // 目标文件，路径也要替换
  const destFilePath = replaceContent(filePath, srcName, destName, specialRules);
  const destFile = path.join(destDir, destFilePath);

  // 拷贝文件
  fsExtra.cpSync(srcFile, destFile);

  // 读文件
  let content = fsExtra.readFileSync(destFile, 'utf-8');
  // 文件内容，内容需要替换
  content = replaceContent(content, srcName, destName, specialRules);
  // 写文件
  fsExtra.writeFileSync(destFile, content, 'utf-8');
}

export default createFile;
