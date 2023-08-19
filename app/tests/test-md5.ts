import crypto from 'crypto';
import fs from 'fs-extra';
import md5 from 'md5';
import SparkMD5 from 'spark-md5';

const file = 'C:\\Users\\Administrator\\Downloads\\首页.png';
// const file = 'E:\\头像\\3dad695f40864ed385331a4d87816a51.jpeg';
// const file = 'C:\\Users\\Administrator\\Downloads\\新建 文本文档.txt';

fs.readFile(file, function (err, buf) {
  console.log(md5(buf));
});

fs.readFile(file, function (err, data) {
  if (err) return;
  let md5Value = crypto.createHash('md5').update(data).digest('hex');
  console.log(md5Value);
});

const sparker = new SparkMD5();

for (let i = 0; i < 10; i++) {
  sparker.append(String(i));
}
const md5str = sparker.end();
console.log('🚀 md5str:', md5str);
