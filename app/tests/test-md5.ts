import crypto from 'crypto';
import fs from 'fs-extra';
import md5 from 'md5';
import SparkMD5 from 'spark-md5';

// const file = 'C:\\Users\\Administrator\\Downloads\\首页.png';
// const file = 'E:\\头像\\3dad695f40864ed385331a4d87816a51.jpeg';
// const file = 'C:\\Users\\Administrator\\Downloads\\新建 文本文档.txt';
// const file = 'D:\\我的笔记.txt';
const file = 'E:\\乱七八糟\\DSCN2472.JPG';

fs.readFile(file, function (err, data) {
  const md5str = md5(data);
  console.log('md5', md5str);
});

fs.readFile(file, function (err, data) {
  if (err) return;
  let md5str = crypto.createHash('md5').update(data).digest('hex');
  console.log('crypto:', md5str);
});

fs.readFile(file, function (err, data) {
  const sparker = new SparkMD5.ArrayBuffer();
  sparker.append(data);
  const md5str = sparker.end(false);
  console.log('SparkMD5:', md5str);
});
