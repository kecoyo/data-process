import { log } from '@/common/log';
import pinyin from 'pinyin';

log('result:', pinyin('中心')); // [ [ 'zhōng' ], [ 'xīn' ] ]

log(
  'result:',
  pinyin('中心', {
    heteronym: true, // 启用多音字模式
  }),
); // [ [ 'zhōng', 'zhòng' ], [ 'xīn' ] ]
