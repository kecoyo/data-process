import fs from '../common/fs-extra';
import md5 from 'md5';
import crypto from 'crypto';

const file = 'E:\\头像\\3dad695f40864ed385331a4d87816a51.jpeg';
// const file = 'C:\\Users\\Administrator\\Downloads\\新建 文本文档.txt';

fs.readFile(file, function (err, buf) {
  console.log(md5(buf));
});

fs.readFile(file, function (err, data) {
  if (err) return;
  let md5Value = crypto.createHash('md5').update(data).digest('hex');
  console.log(md5Value);
  let md5Value2 = crypto.createHash('md5').update(data, 'utf8').digest('hex');
  console.log(md5Value2);
});
