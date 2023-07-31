/* eslint-disable quotes */
import path from 'path';
import cheerio from 'cheerio';
import fsExtra from '../common/fs-extra';

const html = fsExtra.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
const $ = cheerio.load(html);

const sections = [];
$('section.css-19xjxe.e13ihmr61').each((i, elSection) => {
  console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
  const section = {};

  const sectionName = $('h1', elSection).text().trim();
  console.log('sectionName:', sectionName);
  section.name = sectionName;

  const apis = [];
  $('div.css-1xvlnhu.e13ihmr62', elSection).each((j, elApi) => {
    console.log('----------------------------------');
    const api = {};

    const apiName = $('span.css-wjdogd.e13ihmr611', elApi).text().trim();
    console.log('--apiName:', apiName);
    api.name = apiName;

    const apiNote = $('div.css-oguvfc.e1ec38fl0 > p', elApi).text().trim();
    console.log('--apiNote:', apiNote);
    api.note = apiNote;

    let apiPath = $('span.css-i9gxme.e13ihmr616', elApi).text().trim();
    apiPath = apiPath.replace('/classService', '');
    console.log('--apiPath:', apiPath);
    api.path = apiPath;

    let apiPaths = apiPath.replace('/api', '').split('/');
    let sectionPath = apiPaths[1];
    let apiMethod = apiPaths[2];

    if (!section.path) {
      console.log('--sectionPath:', sectionPath);
      section.path = sectionPath;
    }

    console.log('--apiMethod:', apiMethod);
    api.method = apiMethod;

    console.log('--apiParams:');
    const params = [];
    $('ul.css-1wsccn1.e13ihmr68 > li', elApi).each((k, elParam) => {
      const paramName = $('.css-1nsvx3p', elParam).text().trim();
      const paramType = $('.css-93cao6', elParam).text().trim();
      const paramRequire = $('.css-1aol6gr', elParam).text().trim();
      const paramNote = $('.css-1lbu0n', elParam).text().trim();
      const param = {
        name: paramName,
        type: paramType,
        require: paramRequire,
        note: paramNote,
      };
      if (paramName !== 'token') {
        params.push(param);
      }
    });
    api.params = params;

    apis.push(api);
  });
  section.apis = apis;

  sections.push(section);
});

fsExtra.writeFileSync(path.join(__dirname, 'section.json'), JSON.stringify(sections, null, '  '), 'utf-8');
console.log('OK');
