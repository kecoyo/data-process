import { readdirp } from '@/common/fs-extra';
import { createTask } from '@/common/task';
import { createFile } from '@/common/template-file';
import path from 'path';

createTask({
  input: async () => {
    return [
      // {
      //   srcDir: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\components\\teacher-select-picker',
      //   destDir: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\components\\change-class-modal',
      //   specialRules: [['滚动视图', '表单项']],
      // },
      // {
      //   srcDir: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\components\\list-item',
      //   destDir: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\components\\new-msg-list',
      //   specialRules: [['输入框', '输入框']],
      // },
      {
        srcDir: 'D:\\ljshell\\banpai\\hardwareMini\\src\\components\\list-item',
        destDir: 'D:\\ljshell\\banpai\\hardwareMini\\src\\components\\picture-upload',
        specialRules: [['输入框', '输入框']],
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
