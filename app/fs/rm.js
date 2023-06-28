const path = require('path');
const util = require('util');
const Task = require('../common/task');
const fs = require('../common/fs-extra');
const { spawn } = require('../common/child_process');
const dayjs = require('dayjs');

const options = {
  'src-dir': { type: 'string', default: 'e:\\我的相册\\来自：vivo X9（妈）' },
  'file-filter': { type: 'string', default: '*\\(1\\).(jpg|mp4)' },
};
const { values } = util.parseArgs({ options });
console.log('values:', JSON.stringify(values));

/**
 * 删除文件和目录
 */
Task.createTask({
  input: async () => {
    const list = await fs.readdirp(values['src-dir'], { fileFilter: values['file-filter'] });
    return list.map(entry => ({ srcFile: entry.fullPath }));
  },
  concurrency: 1,
  processRow: async (row, i) => {
    const srcFile = row.srcFile;
    const srcFileName = path.basename(srcFile);
    const srcDir = path.dirname(srcFile);
    const srcExtName = path.extname(srcFile);
    const srcName = srcFileName.replace(path.extname(srcFile), '');

    // 删除文件和目录
    fs.rmSync(srcFile);

    row.success = true;
  },
});
