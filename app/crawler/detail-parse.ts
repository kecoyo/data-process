import { downloadFile } from '@/common/request';
import cheerio from 'cheerio';
import fs from 'fs-extra';
import path from 'path';

const html = fs.readFileSync(path.join(__dirname, 'detail.html'), 'utf-8');
const $ = cheerio.load(html);

$('.content___3sBMG').each((i, el_content) => {
  console.log('---------------------------------');
  $('.dxy-image-img', el_content).each((j, el_img) => {
    const src = $(el_img).attr('src');
    console.log(src);

    if (src) {
      const url = src;
      const fileName = src.substring(src.lastIndexOf('/') + 1) + '.jpg';
      downloadFile(url, path.join(__dirname, 'detail_' + i, fileName));
      const url2 = url.replace('thumbnail', 'original');
      const fileName2 = fileName.replace('thumbnail', 'original');
      downloadFile(url2, path.join(__dirname, 'detail_' + i, fileName2));
    }
  });
});

console.log('OK');
