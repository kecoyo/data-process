const path = require('path');
const shixunApi = require('../../common/shixun_api');
const { Sequelize } = require('sequelize');
const spawn = require('child_process').spawn;
const OssClient = require('../../common/oss-client');
const fsExtra = require('../../common/fs-extra');
const config = require('../../config');

const WORK_DIR = '/root/shixun_mp4';
const SHIXUN_DIR = 'shixun/';

const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
  host: config.mysql.host, // 数据库地址, 默认本机
  port: config.mysql.port,
  dialect: 'mysql',
  pool: {
    // 连接池设置
    max: 5, // 最大连接数
    min: 0, // 最小连接数
    idle: 10000,
  },
});

const client = new OssClient(config.ossclient);

async function queryData(count = 5, index = 0) {
  const sql = `select c.commentary_id, c.record_classroom from shixun.commentary_course c,shixun.commentary_project p
    where c.commentary_id=p.commentary_id and p.project_id='26' and c.theme_id=10042
    and c.status = 200 and c.record_classroom_file is null and c.commentary_id%${count} = ${index}`;
  const [rows] = await sequelize.query(sql);
  return rows;
}

async function updateRecordClassroomFile(commentary_id, record_classroom_file) {
  const sql = `update commentary_course set record_classroom_file = '${record_classroom_file}' where commentary_id = ${commentary_id}`;
  const [rows, fields] = await sequelize.query(sql);
  return rows;
}

function m3u8ToMp4(src, dest) {
  return new Promise((resolve, reject) => {
    // ffmpeg -i "https://videobjcdn.lejiaolexue.com/ljmts/c7182b58568fcce721c875f7fef61f027d7ecf28.m3u8" -vcodec copy -acodec copy c7182b58568fcce721c875f7fef61f027d7ecf28.mp4
    const ffmpeg = spawn('ffmpeg', ['-i', src, '-vcodec', 'copy', '-acodec', 'copy', '-y', dest], {
      windowsHide: false,
    });
    ffmpeg.stderr.on('data', function (data) {
      console.log(data.toString());
    });
    ffmpeg.stderr.on('end', function () {
      console.log('file has been converted succesfully');
      resolve();
    });
  });
}

async function processRow(row) {
  try {
    if (row.record_classroom) {
      row.record_classroom = JSON.parse(row.record_classroom);

      const ossFileName = row.record_classroom.oss.ossFileName;

      const video_id = ossFileName.substring(0, ossFileName.indexOf('.'));
      console.log('🚀 ~ get m3u8 url:', video_id);
      const results = await shixunApi.videoCheck(video_id);

      let m3u8 = results[0].uri || '';
      if (!m3u8) throw new Error('m3u8 not found.');

      m3u8 = m3u8.replace('http://videobjcdn.lejiaolexue.com', 'https://file-video.oss-cn-beijing.aliyuncs.com');

      // m3u8 to mp4
      console.log('🚀 ~ m3u8 to mp4:', m3u8);
      await m3u8ToMp4(m3u8, path.join(WORK_DIR, ossFileName));

      // upload to oss
      const ossRelativePath = SHIXUN_DIR + ossFileName;
      const localFile = path.join(WORK_DIR, ossFileName);
      console.log('🚀 ~ upload to oss:', ossRelativePath);
      const ret = await client.put(ossRelativePath, localFile, {
        timeout: 30 * 60 * 1000,
      });
      if (ret.res.statusCode !== 200) throw new Error(ret.res.statusMessage);

      // 更新数据库字段
      row.record_classroom_file = row.record_classroom;
      row.record_classroom_file.oss.ossRelativePath = ossRelativePath;
      row.record_classroom_file.oss.ossFullPath = `https://fileimosscdn.lejiaolexue.com/${ossRelativePath}`;
      console.log('🚀 ~ updateRecordClassroomFile:', row.commentary_id);
      await updateRecordClassroomFile(row.commentary_id, JSON.stringify(row.record_classroom_file));

      // 删除生成的视频文件
      if (fsExtra.existsSync(localFile)) {
        fsExtra.unlinkSync(localFile);
      }

      console.log('🚀 ~ ok');
    }
  } catch (err) {
    console.log('🚀 ~ main ~ err', err);
  }
}

async function main() {
  const argv = process.argv.slice(2);
  try {
    const count = parseInt(argv[0]) || 5;
    const index = parseInt(argv[1]) || 0;
    const rows = await queryData(count, index);

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      await processRow(row);
    }

    console.log('🚀 ~ main ~ rows', rows.length);
  } catch (err) {
    console.log('🚀 ~ main ~ err', err);
  }
}

main();

// 510000       510700  510703  四川省绵阳市涪城区
// 510000       511300  511323  四川省南充市蓬安县
// 510000       511300  511325  四川省南充市西充县
// 510000       511300  511321  四川省南充市南部县
// 510000       511300  511381  四川省南充市阆中市
