import fs from 'fs-extra';
import _ from 'lodash';
import path from 'path';
import sections from './get-sections.json';

const template = `// 该文件由 API文档 自动生成，请勿手动修改！
import request from './request';
import fs from 'fs-extra';

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
  /**
   * 创建班级
   */
  createClass: async (data: {
    id: number; //
    relation: {
      userId: number; // 孩子userId
      relation: number; // 关系
    }[]; // 关系列表
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
function getApiParamNote(note) {
  return `${note ? ' // ' + note : ''}`;
}
function getApiParamRequire(require) {
  return require ? '' : '?';
}
function getApiParamSpaces(level) {
  return _.range(level)
    .map((item) => '  ')
    .join('');
}
function getApiParamArrayType(param, level) {
  return `{\n${param.children.map((child) => getApiParam(child, level + 1)).join('\n')}\n${getApiParamSpaces(level)}}[]`;
}
function getApiParam(param, level) {
  return `${getApiParamSpaces(level)}${param.name}${getApiParamRequire(param.require)}: ${param.type === 'array' ? getApiParamArrayType(param, level) : param.type};${getApiParamNote(param.note)}`;
}
function getApiFuncWithParams(api) {
  return `
  /**
   * ${api.name}
   * @description${api.note ? ' ' + api.note : ''}
   * @param data
   * @returns
   */
  ${api.method}: async (data: {\n${api.params.map((param) => getApiParam(param, 2)).join('\n')}
  }) => {
    return request.post('${api.path}', data);
  },
`;
}
function getApiFuncWithNoParams(api) {
  return `
  /**
   * ${api.name}
   * @description${api.note ? ' ' + api.note : ''}
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
const ${apiName} = {${section.apis.map((api) => getApiFunc(api)).join('')}};`;
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
  fs.writeFileSync(destFile, content, 'utf-8');
  console.log(destFile, 'OK');
}

console.log('OK');
