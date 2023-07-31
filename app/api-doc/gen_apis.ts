/* eslint-disable quotes */
import path from 'path';
import cheerio from 'cheerio';
import fsExtra from '../common/fs-extra';
import sections from './section.json';

const template = `// 该文件由 API文档 自动生成，请勿手动修改！
import request from './request';

/**
 * 班级接口
 */
const classApi = {
  /**
   * 获取班级列表
   */
  getClassList: async () => {
    return request.post('/api/class/getClassList');
  },
  /**
   * 获取班级详情
   */
  getClassDetail: async (data: {
    id: number; //
  }) => {
    return request.post('/api/class/getClassDetail', data);
  },
};

export default classApi;
`;

function getImport() {
  return `// 该文件由 API文档 自动生成，请勿手动修改！
import request from './request';`;
}
function getExport(apiName) {
  return `

export default ${apiName};
`;
}
function getApiParam(param, i) {
  return `
    ${param.name}: ${param.type}; // ${param.note}`;
}
function getApiFuncWithParams(api) {
  return `
  /**
   * ${api.name}
   * @description ${api.note}
   * @param data
   * @returns
   */
  ${api.method}: async (data: {${api.params.map((param, i) => getApiParam(param, i)).join('')}
  }) => {
    return request.post('${api.path}', data);
  },
`;
}
function getApiFuncWithNoParams(api) {
  return `
  /**
   * ${api.name}
   * @description ${api.note}
   * @returns
   */
  ${api.method}: async () => {
    return request.post('${api.path}');
  },
`;
}
function getApiFunc(api) {
  if (api.params.length === 0) {
    return getApiFuncWithNoParams(api);
  }
  return getApiFuncWithParams(api);
}
function getApiObj(section, apiName) {
  let str = `

/**
 * ${section.name}
 */
const ${apiName} = {${section.apis.map(api => getApiFunc(api)).join('')}};`;
  return str;
}

// 开始生成文件

for (let i = 0; i < sections.length; i++) {
  const section = sections[i];
  const apiName = section.path + 'Api';

  let content = getImport();
  content += getApiObj(section, apiName);
  content += getExport(apiName);

  let destFile = path.join(__dirname, 'apis', `${apiName}.ts`);
  fsExtra.writeFileSync(destFile, content, 'utf-8');
  console.log(destFile, 'OK');
}

console.log('OK');
