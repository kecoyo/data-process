const config = require('../../config');
const RedisClient = require('../common/redis-client');

// host: 'r-2zef4elumkrz6psumq.redis.rds.aliyuncs.com',
// port: 6379,
// password: 'exam:exam123!@#',
// db: 1,

const redisClient = new RedisClient(config.redis);

async function main() {
  try {
    // const count = await redisClient.push('commentary_list', 111);
    // console.log('🚀 ~ main ~ count', count);

    const value = await redisClient.pop('commentary_list');
    console.log('🚀 ~ main ~ value', value);

    // redisClient.disconnect();
  } catch (err) {
    console.log('🚀 ~ main ~ err', err);
  }
}

main();
