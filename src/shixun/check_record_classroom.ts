import path from 'path';
import axios from 'axios';
import shixunApi from '../apis/shixunApi';
import config from '../common/config';
import fsExtra from '../common/fs-extra';
import OssClient from '../common/oss-client';
import MysqlTask from '../common/mysql-task';
// eslint-disable-next-line import/no-extraneous-dependencies
import csv from '@fast-csv/format';

// 命令行参数
const argv = process.argv.slice(2);
const pageSize = argv[0] || 1000;
const pageNum = argv[1] || 1;

// OSS客户端
const ossClient = new OssClient({ ...config.ossclient, bucket: 'file-im' });
// 用阿里内网域名
const internal = config.get('ossclient.internal');

// 创建一个可以写入的Csv流
const csvStream = csv.format({ headers: true });
csvStream.pipe(fsExtra.createWriteStream(path.join(__dirname, './check_record_classroom.csv'), { encoding: 'utf8' }));

/**
 * 检查听评课上报mp4是否存在
 */
MysqlTask.createTask({
  input: async mysql => {
    return await mysql.query(`
      select c.commentary_id, c.record_classroom->>'$.oss.ossFullPath' as mp4url
      from commentary_course c
      where c.theme_id = 10042 and c.county in (510703,511321,511323,511325,511381) and c.status = 200
            and (ifnull(c.record_classroom,'') != '' and ifnull(c.record_classroom_file,'') != '')
      order by c.commentary_id limit ${(pageNum - 1) * pageSize}, ${pageSize}
    `);
  },
  // concurrency: 1,
  processRow: async (row, i) => {
    try {
      let res = await axios.head(row.mp4url);
      row.status = res.status; // 200
      csvStream.write(row);
    } catch (err) {
      row.status = err.response.status; // 404
      csvStream.write(row);
      throw err;
    }
  },
  onCompleted: async ({ list }) => {
    // 结束写入
    csvStream.end();
  },
});
