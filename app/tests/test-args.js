const util = require('util');

const options = {
  color: { type: 'boolean' },
  'no-color': { type: 'boolean' },
  logfile: { type: 'string' },
  'no-logfile': { type: 'boolean' },
};
const { values, tokens } = util.parseArgs({ options, tokens: true, strict: false });

// Reprocess the option tokens and overwrite the returned values.
tokens
  .filter(token => token.kind === 'option')
  .forEach(token => {
    if (token.name.startsWith('no-')) {
      // Store foo:false for --no-foo
      const positiveName = token.name.slice(3);
      values[positiveName] = false;
      delete values[token.name];
    } else {
      // Resave value so last one wins if both --foo and --no-foo.
      values[token.name] = token.value || true;
    }
  });

const color = values.color;
const logfile = values.logfile || 'default.log';

console.log({ logfile, color });
