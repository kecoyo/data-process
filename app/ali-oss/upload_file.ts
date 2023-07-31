import path from 'path';
import util from 'util';
import Task from '../common/task';
import fs from '../common/fs-extra';
import OssClient from '../common/oss-client';
import config from '../common/config';

const options = {
  'src-dir': { type: 'string', default: 'C:\\Users\\Administrator\\Downloads\\uploads' },
  'file-filter': { type: 'string', default: '*.*' },
  'oss-bucket': { type: 'string', default: 'file-im' },
  'oss-prefix': { type: 'string', default: 'eduyun/rest/' },
};
const { values } = util.parseArgs({ options });
console.log('values:', JSON.stringify(values));

const ossClient = new OssClient({ ...config.ossclient, bucket: values['oss-bucket'] });

/**
 * 删除文件和目录
 */
Task.createTask({
  input: async () => {
    const list = await fs.readdirp(values['src-dir'], { fileFilter: values['file-filter'] });
    return list.map(item => ({
      // path: item.path,
      // basename: item.basename,
      fullPath: item.fullPath,
    }));
  },
  concurrency: 1,
  processRow: async (row, i) => {
    const srcFile = row.fullPath;
    const srcFileName = path.basename(srcFile);
    const srcDir = path.dirname(srcFile);
    const srcExtName = path.extname(srcFile).toLowerCase();
    const srcName = srcFileName.replace(path.extname(srcFile), '');

    // 生成MD5
    const md5 = fs.md5(srcFile);

    // oss name
    const name = `${values['oss-prefix']}${md5}${srcExtName}`;
    row.name = name;

    const status = await ossClient.uploadFile(name, srcFile);
    row.status = status;
  },
});
