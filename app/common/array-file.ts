import fs from 'fs-extra';
import universalify from 'universalify';

const ENTER = '\n';
const SPACE = ' ';

function stringify(array, { EOL = ENTER, space = SPACE, finalEOL = false } = {}) {
  const EOF = finalEOL ? EOL : '';
  array = array.map(item => item.join(space));
  return array.join(EOL) + EOF;
}

function stripBom(content) {
  // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
  if (Buffer.isBuffer(content)) content = content.toString('utf8');
  return content.replace(/^\uFEFF/, '');
}

async function _readArray(file, options = {}) {
  if (typeof options === 'string') {
    options = { encoding: options };
  }

  const shouldThrow = 'throws' in options ? options.throws : true;
  const space: string = ('space' in options ? options.space : SPACE) as string;

  let content: string = await universalify.fromCallback(fs.readFile)(file, options);

  content = stripBom(content);

  try {
    let lines = content.split(ENTER);
    let arr: string[][] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i] as string;
      if (!line) continue;
      arr.push(line.split(space));
    }

    return arr;
  } catch (err: any) {
    if (shouldThrow) {
      err.message = `${file}: ${err.message}`;
      throw err;
    } else {
      return null;
    }
  }
}

const readArray = universalify.fromPromise(_readArray);

function readArraySync(file, options = {}) {
  if (typeof options === 'string') {
    options = { encoding: options };
  }

  const shouldThrow = 'throws' in options ? options.throws : true;
  const space = ('space' in options ? options.space : SPACE) as string;

  try {
    let content = fs.readFileSync(file, options);

    content = stripBom(content);

    let lines = (content as unknown as string).split(ENTER);
    let arr: string[][] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;
      arr.push(line.split(space));
    }

    return arr;
  } catch (err: any) {
    if (shouldThrow) {
      err.message = `${file}: ${err.message}`;
      throw err;
    } else {
      return null;
    }
  }
}

async function _writeArray(file, array, options = {}) {
  const str = stringify(array, options);
  await universalify.fromCallback(fs.writeFile)(file, str, options);
}

const writeArray = universalify.fromPromise(_writeArray);

function writeArraySync(file, array, options = {}) {
  const str = stringify(array, options);
  fs.writeFileSync(file, str, options);
}

export default {
  readArray,
  readArraySync,
  writeArray,
  writeArraySync,
};
