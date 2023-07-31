import { Danmaku, utils } from 'zaifumo';
import { test_execa } from 'zaifumo/lib/utils';

let md5 = utils.md5str('123456');
console.log('🚀 ~ file: test-zaifumo.js:6 ~ md5:', md5);

test_execa().then(res => {
  console.log('🚀 ~ file: test-zaifumo.js:8 ~ aaa ~ res:', res);
});
