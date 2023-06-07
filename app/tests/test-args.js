const util = require('util');

const options = {
  foo: { type: 'boolean', short: 'f' },
  bar: { type: 'string' },
};
const { values, tokens } = util.parseArgs({ options, tokens: true });
console.log('values:', values);
console.log('tokens:', tokens);
