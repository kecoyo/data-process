import { createTask } from '@/common/task';
import { createFile } from '@/common/template-file';
import path from 'path';

createTask({
  input: async () => {
    return [
      // {
      //   srcFile: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\apis\\classApi.ts',
      //   destFile: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\apis\\schoolApi.ts',
      //   specialRules: [['班级', '学校']],
      // },
      {
        srcFile: 'D:\\ljshell\\banpai\\hardwareWeb\\src\\apis\\vendor.ts',
        destFile: 'D:\\ljshell\\banpai\\hardwareWeb\\src\\apis\\publish.ts',
        specialRules: [['厂商', '节目发布']],
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
    // const srcName = srcFileName.replace('Api.ts', '');
    // const destName = destFileName.replace('Api.ts', '');
    const srcName = srcFileName.replace('.ts', '');
    const destName = destFileName.replace('.ts', '');

    // 创建文件
    createFile(srcDir, destDir, srcFileName, srcName, destName, row.specialRules);
  },
});
