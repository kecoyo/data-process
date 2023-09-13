import { fileMd5 } from '@/common/crypto';
import { createCsvTask } from '@/common/csv-task';
import path from 'path';

const workDir = 'D:\\app_icons\\';

/**
 * 云平台应用图标更新
 */
createCsvTask({
  input: path.join(__dirname, './update_app_img.csv'),
  concurrency: 1,
  processRow: async (row, i) => {
    // const file = path.join(workDir, row.AppImg);
    // const extName = row.AppImg.substring(row.AppImg.lastIndexOf('.'));

    // const exists = fs.existsSync(file);
    // row.status = exists ? 1 : 0;
    // if (!exists) {
    //   row.AppImg = 'default.png';
    // }
    // if (exists) {
    //   row.fileMd5 = fileMd5(file) + extName;
    //   const newFile = path.join(workDir, row.fileMd5);

    //   fs.renameSync(file, newFile);
    // }

    row.AppImg = 'https://fileimosscdn.lejiaolexue.com/eduyun/app_icons/' + row.fileMd5;
  },
});
