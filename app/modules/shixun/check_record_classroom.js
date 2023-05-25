const path = require('path');
const axios = require('axios');
const shixunApi = require('../../apis/shixunApi');
const { m3u8ToMp4 } = require('../../common/ffmpeg');
const config = require('../../common/config');
const fsExtra = require('../../common/fs-extra');
const OssClient = require('../../common/oss-client');
const MySQLTask = require('../../common/mysql-task');

// 命令行参数
const argv = process.argv.slice(2);
const pageSize = argv[0] || 1000;
const pageNum = argv[1] || 1;

// OSS客户端
const ossClient = new OssClient({ ...config.ossclient, bucket: 'file-im' });
// 用阿里内网域名
const internal = config.get('ossclient.internal');

// log文件输出
const logFile = path.join(__dirname, './check_record_classroom.log');
fsExtra.removeSync(logFile);
fsExtra.ensureFileSync(logFile);

/**
 * 检查听评课上报mp4是否存在
 */
MySQLTask.createTask({
  input: async mysql => {
    return await mysql.query(`
      select c.commentary_id, c.record_classroom->>'$.oss.ossFullPath' as mp4url, c.record_classroom_file->>'$.oss.ossFullPath' as mp4url2
      from commentary_course c
      where c.theme_id = 10042 and c.county in (510703,511321,511323,511325,511381) and c.status = 200
            and (ifnull(c.record_classroom,'') != '' and ifnull(c.record_classroom_file,'') != '')
      order by c.commentary_id limit ${(pageNum - 1) * pageSize}, ${pageSize}
    `);
  },
  concurrency: 1,
  processRow: async (row, i) => {
    try {
      row.status = 'success';
    } catch (err) {
      row.status = err.message;
      throw err;
    }
  },
});
