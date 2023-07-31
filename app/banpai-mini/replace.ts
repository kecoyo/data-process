import path from 'path';
import util from 'util';
import Task from '../common/task';
import fs from '../common/fs-extra';
import { spawn } from '../common/child_process';
import dayjs from 'dayjs';
import jeselvmo from 'jeselvmo';

const SRC_DIR = 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\pages\\';

const PAGES = [
  { key: 'address-book', name: '通讯录' },
  { key: 'mine', name: '我的' },
  { key: 'login', name: '登录' },
  { key: 'complete-profile', name: '补全信息' },
  { key: 'update-profile', name: '修改个人资料' },
  { key: 'search', name: '搜索' },
  { key: 'message-center', name: '消息中心' },
  { key: 'phone-open-settings', name: '手机号开放设置' },
  { key: 'enter-school-approval', name: '入校审批' },
  { key: 'my-class', name: '我的班级' },
  { key: 'my-school', name: '我的学校' },
  { key: 'join-school', name: '加入学校' },
  { key: 'invite-join-school', name: '邀请加入学校' },
  { key: 'class-manage', name: '班级管理' },
  { key: 'class-detail', name: '班级详情' },
  { key: 'change-class', name: '转移班级' },
  { key: 'create-class', name: '创建班级' },
  { key: 'banpai-manage', name: '班牌管理' },
  { key: 'banpai-scan', name: '班牌扫描' },
  { key: 'role-authority', name: '角色权限' },
  { key: 'logoff', name: '退出登录' },
];

/**
 * 删除文件和目录
 */
Task.createTask({
  input: async () => {
    return PAGES;
  },
  concurrency: 1,
  processRow: async (row, i) => {
    const { key, name } = row;
    const filename = 'index.tsx';

    // 源文件
    const srcFile = path.join(SRC_DIR, 'index', filename);
    // 目标文件
    const outFile = path.join(SRC_DIR, key, filename);

    // 复制文件
    fs.cpSync(srcFile, outFile);

    let camelCase = jeselvmo.camelCase(key);
    let pascalCase = jeselvmo.pascalCase(key);
    let kebabCase = jeselvmo.kebabCase(key);

    let content = fs.readFileSync(outFile, 'utf-8');

    // content = content.replace(/name: 'index',/g, `name: '${camelCase}',`);
    // content = content.replace(/indexSlice/g, `${camelCase}Slice`);
    // content = content.replace(/indexState/g, `${camelCase}State`);
    // content = content.replace(/state.index/g, `state.${camelCase}`);
    // content = content.replace(/IndexInfo/g, `${pascalCase}Info`);

    content = content.replace(/lj-index/g, `lj-${kebabCase}`);
    content = content.replace(/index/g, `${camelCase}`);
    content = content.replace(/Index/g, `${pascalCase}`);
    content = content.replace(/首页/g, `${name}`);

    // fix
    content = content.replace(/(\w+).less/g, 'index.less');

    fs.writeFileSync(outFile, content, 'utf-8');

    // row.reducer1 = `import ${camelCase} from '../pages/${basename}/reducer';`;
    // row.reducer2 = `${camelCase},`;

    row.success = true;
  },
});
