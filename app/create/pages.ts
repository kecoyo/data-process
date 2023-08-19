import { readdirp } from '@/common/fs-extra';
import { createTask } from '@/common/task';
import { createFile } from '@/common/template-file';
import path from 'path';

createTask({
  input: async () => {
    return [
      // {
      //   srcDir: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\pages\\banpai-manage',
      //   destDir: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\pages\\web-view',
      //   specialRules: [['班牌管理', '内嵌网页']],
      // },
      {
        srcDir: 'D:\\ljshell\\banpai\\hardwareMini\\src\\pages\\class-detail',
        destDir: 'D:\\ljshell\\banpai\\hardwareMini\\src\\pages\\school-detail',
        specialRules: [['班级详情', '学校详情']],
      },
    ];
  },
  concurrency: 1,
  processRow: async (row, i) => {
    const fileList = await readdirp(row.srcDir, { fileFilter: '*.*' });

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
