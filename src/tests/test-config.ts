// process.env.NODE_CONFIG_ENV = 'qa';
// process.env.NODE_ENV = 'production';
import config from 'config';

console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV);
console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
console.log('NODE_CONFIG_ENV: ' + config.util.getEnv('NODE_CONFIG_ENV'));
console.log('HOSTNAME: ' + config.util.getEnv('HOSTNAME'));

const hasProp = config.has('Customer.dbConfig');
console.log('Customer.dbConfig:', hasProp);

const accessKeySecret = config.get('ossclient.accessKeySecret');
console.log('ossclient.accessKeySecret:', accessKeySecret);

const testMysql = config.get('test-mysql');
console.log('test-mysql:', testMysql);
