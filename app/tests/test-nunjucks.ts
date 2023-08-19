import nunjucks from 'nunjucks';
import path from 'path';

nunjucks.configure(path.join(__dirname, 'views'), { autoescape: true });

const result = nunjucks.renderString('Hello {{ username }}', { username: 'James' });
console.log(result);

// const res = nunjucks.render('index.html', { foo: 'bar' });
// console.log('🚀 ~ file: test-nunjucks.ts:9 ~ res:', res);

nunjucks.render('index.html', { foo: 'bar' }, (err, res) => {
  console.log('🚀 ~ file: test-nunjucks.ts:13 ~ nunjucks.render ~ res:', res);
});
