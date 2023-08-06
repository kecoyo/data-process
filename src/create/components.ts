import path from 'path';
import createFile from '../common/template-file';
import fsExtra from '../common/fs-extra';
import Task from '../common/task';

Task.createTask({
  input: async () => {
    return [
      // {
      //   srcDir: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\components\\teacher-select-picker',
      //   destDir: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\components\\change-class-modal',
      //   specialRules: [['滚动视图', '表单项']],
      // },
      // {
      //   srcDir: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\components\\avatar',
      //   destDir: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\components\\icon',
      //   specialRules: [['头像', '图标']],
      // },
      {
        srcDir: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\pages\\my-school\\components\\quit-school-modal',
        destDir: 'D:\\ljshell\\banpai\\banpai-mini-teacher\\src\\pages\\my-school\\components\\send-code-modal',
        specialRules: [['滚动视图', '表单项']],
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
