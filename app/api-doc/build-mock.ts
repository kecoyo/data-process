/* eslint-disable quotes */
import path from 'path';
import cheerio from 'cheerio';
import fsExtra from '../common/fs-extra';
import sections from './section.json';

const template = `// 该文件由 API文档 自动生成，请勿手动修改！
import Mock from 'mockjs';

export default {
  // logoffUser
  'POST /api/login/logoffUser': Mock.mock({
    result: 0,
    data: true,
  }),
};
`;

function getImport() {
  return `// 该文件由 API文档 自动生成，请勿手动修改！
import Mock from 'mockjs';`;
}
function getMockFunc(api) {
  return `
  // ${api.name}
  'POST ${api.path}': Mock.mock({
    result: 0,
    data: true,
  }),`;
}
function getMockObj(section, apiName) {
  return `

/**
 * ${section.name}
 */
export default {${section.apis.map(api => getMockFunc(api)).join('')}
};`;
}

// 开始生成文件

for (let i = 0; i < sections.length; i++) {
  const section = sections[i];
  const apiName = section.path + 'Api';

  let content = getImport();
  content += getMockObj(section, apiName);

  fsExtra.writeFileSync(path.join(__dirname, 'mock', `${apiName}.ts`), content, 'utf-8');
}

console.log('OK');
