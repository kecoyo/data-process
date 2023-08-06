import path from 'path';
import { Task } from 'zaifumo';
import createFile from '../common/template-file';
import fsExtra from '../common/fs-extra';

Task.createTask({
  input: async () => {
    return [
      {
        srcDir: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\pages\\address-book',
        destDir: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\pages\\authority-manage1111',
        specialRules: [['通讯录', '权限管理']],
      },
    ];
  },
  concurrency: 1,
  processRow: async (row, i) => {
    const fileList = await fsExtra.readdirp(row.srcDir, { fileFilter: '*.*' });

    for (let i = 0; i < fileList.length; i++) {
      const fileEntry = fileList[i];

      // 用目录名作为关键词查找替换，源目录 ==> 目标目录名
      const srcName = path.basename(row.srcDir);
      const destName = path.basename(row.destDir);

      // 创建文件
      createFile(row.srcDir, row.destDir, fileEntry.path, srcName, destName, row.specialRules);
    }
  },
});
