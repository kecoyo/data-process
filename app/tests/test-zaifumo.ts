import { md5str, testExeca } from 'zaifumo';

let md5 = md5str('123456');
console.log('🚀 ~ file: test-zaifumo.js:6 ~ md5:', md5);

testExeca().then(res => {
  console.log('🚀 ~ file: test-zaifumo.js:8 ~ aaa ~ res:', res);
});
