// process.env.NODE_CONFIG_ENV = 'qa';
// process.env.NODE_ENV = 'production';

// eslint-disable-next-line import/no-extraneous-dependencies
let config = require('config');

console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV);
console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
console.log('NODE_CONFIG_ENV: ' + config.util.getEnv('NODE_CONFIG_ENV'));
console.log('HOSTNAME: ' + config.util.getEnv('HOSTNAME'));

const dbConfig = config.get('Customer.dbConfig');
console.log('Customer.dbConfig:', dbConfig);
