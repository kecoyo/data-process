import path from 'path';
import createFile from '../common/createFile';
import Task from '../common/task';

Task.createTask({
  input: async () => {
    return [
      {
        srcFile: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\apis\\classApi.ts',
        destFile: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\apis\\schoolApi.ts',
        specialRules: [['班级', '学校']],
      },
    ];
  },
  concurrency: 1,
  processRow: async (row, i) => {
    // 源文件
    const srcDir = path.dirname(row.srcFile);
    const srcFileName = path.basename(row.srcFile);

    // 目标文件
    const destDir = path.dirname(row.destFile);
    const destFileName = path.basename(row.destFile);

    // 提取关键词
    const srcName = srcFileName.replace('Api.ts', '');
    const destName = destFileName.replace('Api.ts', '');

    // 创建文件
    createFile(srcDir, destDir, srcFileName, srcName, destName, row.specialRules);
  },
});
