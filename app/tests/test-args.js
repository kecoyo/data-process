const util = require('util');

const options = {
  foo: { type: 'boolean', short: 'f' },
  bar: { type: 'string' },
};
const { values, positionals, tokens } = util.parseArgs({ options, tokens: true });
console.log('values:', values);
console.log('positionals:', positionals);
console.log('tokens:', tokens);
